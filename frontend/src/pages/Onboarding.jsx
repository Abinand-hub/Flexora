import { useState } from "react";
import { API_BASE, apiPost } from "../api";

const field={width:"100%",padding:"10px 12px",border:"1px solid var(--gray2)",borderRadius:8,fontSize:13,background:"var(--white)",color:"var(--ink)"};

export function Onboarding({onLogin,go}){
  const[email,setEmail]=useState("");
  const[company,setCompany]=useState("");
  const[loading,setLoading]=useState(false);
  const[err,setErr]=useState("");
  const[minted,setMinted]=useState(null);
  const[copied,setCopied]=useState(false);

  async function submit(e){
    e.preventDefault();setErr("");
    if(!email.includes("@")){setErr("Enter a valid email.");return;}
    if(!company.trim()){setErr("Enter an institute name.");return;}
    setLoading(true);
    try{
      const r=await apiPost("/api/signup",null,{email,company:company.trim()});
      const j=await r.json().catch(()=>({}));
      if(r.status===409)throw new Error(j.error||"This email already has an institute. Sign in with your fx_ key.");
      if(!r.ok)throw new Error(j.error||"Couldn't create the institute.");
      const key=j.customer.api_key;
      const session={email:j.customer.email,company:j.customer.company,apiKey:key,isDemo:false};
      onLogin(session);
      setMinted({key,node:j.sdk_config?.node,python:j.sdk_config?.python,company:j.customer.company});
    }catch(e){
      setErr(e instanceof TypeError?"Couldn't reach "+API_BASE:e.message);
    }
    setLoading(false);
  }

  async function copy(){
    if(!minted?.key)return;
    try{await navigator.clipboard.writeText(minted.key);setCopied(true);setTimeout(()=>setCopied(false),2000);}catch{/* ignore */}
  }

  if(minted){
    return(
      <div style={{maxWidth:560,margin:"0 auto",padding:"48px 24px"}}>
        <h1 style={{fontSize:24,fontWeight:600,marginBottom:6}}>Your institute is ready</h1>
        <p style={{fontSize:13,color:"var(--gray4)",marginBottom:24}}>{minted.company} has one Fluxera key. This key is login and SDK auth. Copy it — if you lose it and this browser session, you cannot recover it in-app.</p>
        <p style={{fontSize:12,fontWeight:500,color:"var(--gray5)",marginBottom:6}}>API key</p>
        <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
          <input readOnly value={minted.key} style={{...field,flex:1,minWidth:200,fontFamily:"DM Mono,monospace"}} />
          <button type="button" onClick={copy} style={{padding:"10px 14px",border:"1px solid var(--gray2)",borderRadius:8,background:"var(--white)",fontSize:12,cursor:"pointer"}}>{copied?"Copied":"Copy"}</button>
        </div>
        <p style={{fontSize:12,fontWeight:500,color:"var(--gray5)",marginBottom:6}}>Wrap your APIs</p>
        <p style={{fontSize:12,color:"var(--gray4)",marginBottom:10}}>Tools and workflows show up when this client sends events. Do not paste vendor keys here.</p>
        <pre style={{background:"var(--ink)",color:"rgba(255,255,255,.85)",padding:16,borderRadius:10,fontSize:12,fontFamily:"DM Mono,monospace",lineHeight:1.7,overflowX:"auto",marginBottom:12}}>{minted.node}</pre>
        <pre style={{background:"var(--ink)",color:"rgba(255,255,255,.85)",padding:16,borderRadius:10,fontSize:12,fontFamily:"DM Mono,monospace",lineHeight:1.7,overflowX:"auto",marginBottom:24}}>{minted.python}</pre>
        <button type="button" onClick={()=>go("overview")} style={{padding:"10px 18px",background:"var(--ink)",color:"#fff",border:"none",borderRadius:8,fontSize:13,cursor:"pointer"}}>Open dashboard →</button>
      </div>
    );
  }

  return(
    <div style={{minHeight:"calc(100vh - 57px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{width:"100%",maxWidth:380}}>
        <h1 style={{fontSize:24,fontWeight:600,marginBottom:6}}>Create an institute</h1>
        <p style={{fontSize:13,color:"var(--gray4)",marginBottom:28}}>One Fluxera key per institute. You will use it to sign in and to send events from the SDK.</p>
        <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:16}}>
          <div>
            <label style={{display:"block",fontSize:12,fontWeight:500,color:"var(--gray5)",marginBottom:6}}>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@institute.edu" style={field} />
          </div>
          <div>
            <label style={{display:"block",fontSize:12,fontWeight:500,color:"var(--gray5)",marginBottom:6}}>Institute name</label>
            <input type="text" value={company} onChange={e=>setCompany(e.target.value)} placeholder="Acme University" style={field} />
          </div>
          {err&&<p style={{fontSize:12,color:"var(--red)",padding:"8px 12px",background:"var(--red-bg)",border:"1px solid var(--red-border)",borderRadius:6}}>{err}</p>}
          <button type="submit" disabled={loading} style={{padding:"10px",background:"var(--ink)",color:"#fff",border:"none",borderRadius:8,fontSize:13,cursor:"pointer"}}>{loading?"Creating…":"Create institute →"}</button>
        </form>
      </div>
    </div>
  );
}
