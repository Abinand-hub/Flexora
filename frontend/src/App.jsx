import { useState, useEffect, useCallback } from "react";
import { CSS } from "./format";
import { mock } from "./mock";
import { apiGet } from "./api";
import { Nav } from "./components/Nav";
import { ProductShell } from "./components/ProductShell";
import { WhatPage, HowPage, WhyPage, Login } from "./pages/Landing";
import { Onboarding } from "./pages/Onboarding";
import { Overview } from "./pages/Overview";
import { Logs } from "./pages/Logs";
import { Settings } from "./pages/Settings";
import { Workflows } from "./pages/Workflows";
import { Tools } from "./pages/Tools";
import { Executions } from "./pages/Executions";
import { ExecutionDetail } from "./pages/ExecutionDetail";
import { ToolDetail } from "./pages/ToolDetail";

function loadSession(){
  try{
    const raw=localStorage.getItem("fluxera_session");
    return raw?JSON.parse(raw):null;
  }catch{return null;}
}

export default function App(){
  const[route,setRoute]=useState(()=>loadSession()?"overview":"what");
  const[session,setSession]=useState(loadSession);
  const[period,setPeriod]=useState("24h");
  const[data,setData]=useState(null);
  const[error,setError]=useState(null);
  const[live,setLive]=useState(false);
  const[price,setPrice]=useState(.04);
  const[executionId,setExecutionId]=useState(null);
  const[toolId,setToolId]=useState(null);
  const[workflowFilter,setWorkflowFilter]=useState("");

  const productPages=["overview","endpoints","logs","settings","workflows","tools","tool","executions","execution","history"];
  const isProductPage=productPages.includes(route);

  function go(id, extra){
    if(id==="execution")setExecutionId(extra);
    if(id==="tool")setToolId(extra);
    if(id==="history")setWorkflowFilter(typeof extra==="string"?extra:"");
    if(id==="executions")setWorkflowFilter("");
    setRoute(id);
    window.scrollTo(0,0);
  }

  const regen=useCallback(async()=>{
    if(!session)return;
    setError(null);
    if(session.isDemo||!session.apiKey){setData(mock());return;}
    try{
      const r=await apiGet(`/api/report?period=${period}`,session.apiKey);
      if(!r.ok){
        if(r.status===401||r.status===403)throw new Error("Your API key is no longer valid. Please sign in again.");
        throw new Error("Couldn't load your report from the local API.");
      }
      const j=await r.json();
      const eps=(j.endpoints||[]).map(ep=>({name:ep.endpoint,total:ep.total||0,failed:ep.failed||0,rate:parseFloat(ep.failure_rate)||0,lost:parseFloat(ep.revenue_lost)||0,avgLatency:parseInt(ep.avg_fail_latency)||0})).sort((a,b)=>b.lost-a.lost);
      const tl=parseFloat(j.revenue_lost)||0,sm=j.summary||{},bi=j.business_impact||{};
      const spark=(j.trend||[]).map(t=>({day:t.date,lost:parseFloat(t.revenue_lost)||0}));
      const logs=(j.logs||[]).map(l=>({id:l.request_id||l.id,endpoint:l.endpoint,status:l.status,latency:l.latency_ms||0,price:parseFloat(l.price)||0,error:l.error_type,ts:new Date(l.logged_at),workflow:l.workflow_name||l.tool_name||null}));
      setData({
        logs,totalLost:tl,
        totalFailed:parseInt(sm.failed_requests)||0,
        totalRequests:parseInt(sm.total_requests)||0,
        failRate:parseFloat(sm.failure_rate)||0,
        avgLatency:parseInt(sm.avg_latency_ms)||0,
        endpoints:eps,spark,
        impact:{
          configured:!!bi.configured,demo:false,
          abandonmentRate:parseFloat(bi.abandonment_rate)||0,
          avgOrderValue:parseFloat(bi.avg_order_value)||0,
          usersAffected:bi.estimated_users_affected,
          revenueAtRisk:bi.estimated_revenue_at_risk,
          formula:bi.formula,
        },
        isDemo:false,
      });
    }catch(e){
      setData(null);
      setError(e.message||"Couldn't reach the local API.");
    }
  },[session,period]);

  useEffect(()=>{if(session&&isProductPage)regen();},[session,regen,isProductPage]);

  useEffect(()=>{
    try{
      if(session)localStorage.setItem("fluxera_session",JSON.stringify(session));
      else localStorage.removeItem("fluxera_session");
    }catch{/* session just won't persist */}
  },[session]);

  useEffect(()=>{
    if(!live||!session||!session.isDemo)return;
    const iv=setInterval(()=>{
      const fail=Math.random()<.17;
      const entry={id:"req_"+Math.random().toString(36).slice(2,9),endpoint:"/v1/chat/completions",status:fail?"fail":"success",latency:fail?2000:120,price:price,error:fail?"timeout":null,ts:new Date()};
      setData(prev=>{
        if(!prev)return prev;
        const logs=[entry,...prev.logs].slice(0,1000);
        const failed=logs.filter(l=>l.status==="fail");
        return{...prev,logs,totalLost:failed.reduce((s,l)=>s+l.price,0),totalFailed:failed.length};
      });
    },800);
    return()=>clearInterval(iv);
  },[live,session,price]);

  function enterDashboard(id){
    if(!session){setSession({email:"",company:"Demo",apiKey:"",isDemo:true});}
    go(id);
  }

  return(
    <>
      <style>{CSS}</style>
      <div style={{minHeight:"100vh",background:"var(--bg)"}}>
        <Nav
          route={route}
          go={go}
          hasSession={!!session}
          onViewDemo={()=>enterDashboard("overview")}
          onSignIn={()=>go("overview")}
          onSignUp={()=>go("signup")}
        />

        {(route==="what"||route==="features")&&<WhatPage go={go} onDemo={()=>enterDashboard("overview")} onSignUp={()=>go("signup")} />}
        {route==="how"&&<HowPage go={go} />}
        {route==="why"&&<WhyPage go={go} onSignUp={()=>go("signup")} />}
        {route==="signup"&&<Onboarding onLogin={setSession} go={go} />}

        {isProductPage&&!session&&<Login onLogin={setSession} />}
        {isProductPage&&session&&["overview","logs","settings"].includes(route)&&!data&&error&&(
          <div style={{padding:80,textAlign:"center"}}>
            <p style={{fontSize:14,fontWeight:600,color:"var(--red)",marginBottom:8}}>Unable to load your Fluxera report</p>
            <p style={{fontSize:13,color:"var(--gray4)",marginBottom:20}}>{error}</p>
            <button onClick={regen} style={{padding:"9px 20px",background:"var(--ink)",color:"#fff",border:"none",borderRadius:8,fontSize:13,cursor:"pointer"}}>Try again</button>
          </div>
        )}
        {isProductPage&&session&&["overview","logs","settings"].includes(route)&&!data&&!error&&<div style={{padding:80,textAlign:"center",color:"var(--gray4)"}}>Loading...</div>}
        {isProductPage&&session&&(data||["workflows","tools","tool","executions","execution","history"].includes(route))&&(
          <ProductShell page={route} go={go} company={session.company} isDemo={session.isDemo} live={live} setLive={setLive} period={period} setPeriod={setPeriod} onLogout={()=>{setSession(null);setData(null);go("what");}}>
            {route==="overview"&&data&&<Overview data={data} period={period} go={go} />}
            {route==="logs"&&data&&<Logs data={data} />}
            {route==="settings"&&data&&<Settings apiKey={session.apiKey} company={session.company} isDemo={session.isDemo} pricePerReq={price} setPricePerReq={setPrice} impact={data.impact} regen={regen} onApplyKey={setSession} />}
            {route==="workflows"&&<Workflows apiKey={session.apiKey} isDemo={session.isDemo} go={go} />}
            {route==="tools"&&<Tools apiKey={session.apiKey} isDemo={session.isDemo} go={go} />}
            {route==="tool"&&<ToolDetail apiKey={session.apiKey} toolId={toolId} go={go} />}
            {route==="executions"&&<Executions apiKey={session.apiKey} isDemo={session.isDemo} go={go} />}
            {route==="history"&&<Executions apiKey={session.apiKey} isDemo={session.isDemo} go={go} workflow={workflowFilter} grouped />}
            {route==="execution"&&<ExecutionDetail apiKey={session.apiKey} executionId={executionId} go={go} />}
          </ProductShell>
        )}
      </div>
    </>
  );
}
