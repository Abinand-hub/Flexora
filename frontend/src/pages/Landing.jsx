import { useState } from "react";
import { useIsMobile, f$, fNum } from "../format";
import { mock } from "../mock";
import { Pill } from "../components/ui";
import { API_BASE, apiGet } from "../api";

export function WhatPage({go,onDemo,onSignUp}){
  const [demo] = useState(() => mock());
  const isMobile=useIsMobile();
  return(
    <div style={{maxWidth:1080,margin:"0 auto",padding:isMobile?"40px 18px 60px":"64px 28px 100px"}}>
      <div style={{maxWidth:640,marginBottom:isMobile?36:64,animation:"up24 .5s ease"}}>
        <Pill color="var(--red)">REVENUE LEAK DETECTOR</Pill>
        <h1 style={{fontSize:isMobile?30:44,fontWeight:600,letterSpacing:"-.03em",lineHeight:1.15,margin:"18px 0 18px"}}>Every failed API call{isMobile?" ":<br/>}costs you twice.</h1>
        <p style={{fontSize:16,color:"var(--gray5)",lineHeight:1.6,marginBottom:28}}>Fluxera watches every API call your product makes, turns the failures into a real dollar number, and tells you exactly what to fix first.</p>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button onClick={()=>onSignUp()} style={{padding:"11px 22px",background:"var(--ink)",color:"var(--white)",border:"none",borderRadius:8,fontSize:13,fontWeight:500,cursor:"pointer"}}>Sign up →</button>
          <button onClick={()=>onDemo()} style={{padding:"11px 22px",background:"var(--white)",color:"var(--ink)",border:"1px solid var(--gray2)",borderRadius:8,fontSize:13,fontWeight:500,cursor:"pointer"}}>View demo</button>
          <button onClick={()=>go("how")} style={{padding:"11px 22px",background:"var(--white)",color:"var(--ink)",border:"1px solid var(--gray2)",borderRadius:8,fontSize:13,fontWeight:500,cursor:"pointer"}}>How it works</button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:12,marginBottom:12}}>
        <div style={{background:"var(--white)",border:"1px solid var(--red-border)",borderRadius:12,padding:"26px"}}>
          <p style={{fontSize:11,fontWeight:500,color:"var(--red)",letterSpacing:".08em",fontFamily:"DM Mono,monospace",marginBottom:12}}>FAILED API COST</p>
          <div style={{fontSize:46,fontWeight:600,color:"var(--red)"}}>{f$(demo.totalLost)}</div>
          <p style={{fontSize:12,color:"var(--gray4)",marginTop:9}}>{fNum(demo.totalFailed)} failed requests, last 24h</p>
        </div>
        <div style={{background:"var(--white)",border:"1px solid var(--amber-border)",borderRadius:12,padding:"26px"}}>
          <p style={{fontSize:11,fontWeight:500,color:"var(--amber)",letterSpacing:".08em",fontFamily:"DM Mono,monospace",marginBottom:12}}>EST. REVENUE AT RISK</p>
          <div style={{fontSize:46,fontWeight:600,color:"var(--amber)"}}>{f$(demo.impact.revenueAtRisk)}</div>
          <p style={{fontSize:12,color:"var(--gray4)",marginTop:9}}>{demo.impact.abandonmentRate}% abandonment · ${demo.impact.avgOrderValue} avg order</p>
        </div>
      </div>
      <p style={{fontSize:11,color:"var(--gray3)",marginBottom:40,fontFamily:"DM Mono,monospace"}}>↑ landing preview uses simulated data. The dashboard uses your API.</p>
    </div>
  );
}

export function HowPage({go}){
  const isMobile=useIsMobile();
  return(
    <div style={{maxWidth:1080,margin:"0 auto",padding:isMobile?"40px 18px 60px":"64px 28px 100px"}}>
      <Pill>THE MECHANICS</Pill>
      <h1 style={{fontSize:38,fontWeight:600,letterSpacing:"-.03em",margin:"16px 0"}}>Workflow → step → tool → API.</h1>
      <p style={{fontSize:15,color:"var(--gray5)",marginBottom:28,maxWidth:600}}>Wrap a workflow. Nested steps and tools inherit context. Failures become dollars, then a recovery recommendation.</p>
      <pre style={{background:"var(--ink)",color:"rgba(255,255,255,.85)",padding:20,borderRadius:10,fontSize:12,fontFamily:"DM Mono,monospace",lineHeight:1.8,overflowX:"auto"}}>{`await fluxera.workflow('checkout', async () => {
  await fluxera.step('charge', async () => {
    await fluxera.tool('stripe', () => stripe.charge(), { price: 0.02, retry: 3 })
  })
})`}</pre>
      <button onClick={()=>go("why")} style={{marginTop:32,padding:"11px 24px",background:"var(--ink)",color:"#fff",border:"none",borderRadius:8,fontSize:13,cursor:"pointer"}}>Why this matters →</button>
    </div>
  );
}

export function WhyPage({go,onSignUp}){
  const isMobile=useIsMobile();
  return(
    <div style={{maxWidth:1080,margin:"0 auto",padding:isMobile?"40px 18px 60px":"64px 28px 100px"}}>
      <Pill color="var(--amber)">FOR FOUNDERS SHIPPING FAST</Pill>
      <h1 style={{fontSize:38,fontWeight:600,letterSpacing:"-.03em",margin:"16px 0"}}>What failed, why, what it cost, how to recover.</h1>
      <p style={{fontSize:15,color:"var(--gray5)",marginBottom:32,maxWidth:600}}>Not another log table. One execution screen that answers the five questions.</p>
      <button onClick={()=>onSignUp()} style={{padding:"12px 28px",background:"var(--red)",color:"#fff",border:"none",borderRadius:8,fontSize:14,cursor:"pointer"}}>Sign up →</button>
    </div>
  );
}

export function Login({onLogin}){
  const [key,setKey]=useState("");
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");

  async function submit(e){
    e.preventDefault();setErr("");
    const k=key.trim();
    if(!k){setErr("Paste your fx_ API key.");return;}
    if(!k.startsWith("fx_")){setErr("API key must start with fx_");return;}
    setLoading(true);
    try{
      const r=await apiGet("/api/customers/me", k);
      if(!r.ok){
        if(r.status===401||r.status===403)throw new Error("Invalid API key. Check it and try again.");
        throw new Error("Sign in failed. Is the local API running?");
      }
      const c=await r.json();
      onLogin({email:c.email,company:c.company||c.email,apiKey:k,isDemo:false});
    }catch(e){
      setErr(e instanceof TypeError?"Couldn't reach "+API_BASE:e.message);
    }
    setLoading(false);
  }

  return(
    <div style={{minHeight:"calc(100vh - 57px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{width:"100%",maxWidth:380}}>
        <h1 style={{fontSize:24,fontWeight:600,marginBottom:6}}>Sign in</h1>
        <p style={{fontSize:13,color:"var(--gray4)",marginBottom:28}}>Paste the institute’s fx_ key. That key is the login. Demo is View demo in the header, not a blank key.</p>
        <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:16}}>
          <div>
            <label style={{display:"block",fontSize:12,fontWeight:500,color:"var(--gray5)",marginBottom:6}}>API key</label>
            <input type="text" placeholder="fx_…" value={key} spellCheck={false} autoComplete="off" onChange={e=>setKey(e.target.value)}
              style={{width:"100%",padding:"9px 12px",border:"1px solid var(--gray2)",borderRadius:8,fontSize:13,background:"var(--white)",fontFamily:"DM Mono,monospace"}} />
          </div>
          {err&&<p style={{fontSize:12,color:"var(--red)",padding:"8px 12px",background:"var(--red-bg)",border:"1px solid var(--red-border)",borderRadius:6}}>{err}</p>}
          <button type="submit" disabled={loading} style={{padding:"10px",background:"var(--ink)",color:"#fff",border:"none",borderRadius:8,fontSize:13,cursor:"pointer"}}>{loading?"Signing in...":"Sign in →"}</button>
        </form>
      </div>
    </div>
  );
}
