import { useState, useEffect, useCallback } from "react";

const API_BASE = "https://fluxera-backend-production.up.railway.app";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}

:root{
  --bg:#fafafa;
  --white:#ffffff;
  --gray1:#f4f4f5;
  --gray2:#e8e8ec;
  --gray3:#c8c8d0;
  --gray4:#88889a;
  --gray5:#444450;
  --ink:#0c0c10;
  --red:#d42020;
  --red-bg:#fef2f2;
  --red-border:#fcd4d4;
  --amber:#b45800;
  --amber-bg:#fffbeb;
  --amber-border:#fde9a0;
  --green:#0f6e40;
  --green-bg:#f0fdf6;
  --green-border:#a8e8c4;
}

html,body{height:100%;background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;font-size:14px;line-height:1.5;-webkit-font-smoothing:antialiased;}
*{font-family:'Inter',sans-serif;}
input,button{font-family:'Inter',sans-serif;}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-thumb{background:var(--gray2);}
a{color:inherit;text-decoration:none;}

@keyframes up{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
@keyframes up24{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
@keyframes in{from{opacity:0;}to{opacity:1;}}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:.3;}}
`;

const f$ = n => "$" + Math.abs(parseFloat(n)||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
const fPct = n => (parseFloat(n)||0).toFixed(1)+"%";
const fNum = n => (parseInt(n)||0).toLocaleString();
const fMs = n => n>999?(n/1000).toFixed(1)+"s":(n||0)+"ms";

function mock() {
  const eps=[{n:"/v1/chat/completions",w:.38,p:.06},{n:"/v1/completions",w:.28,p:.04},{n:"/v1/embeddings",w:.18,p:.01},{n:"/v1/images/generate",w:.10,p:.08},{n:"/v1/audio/transcribe",w:.06,p:.03}];
  const errs=["timeout","rate_limit","server_error","context_length"];
  const logs=[];
  for(let i=0;i<800;i++){
    let acc=0,ep=eps[0];const r=Math.random();
    for(const e of eps){acc+=e.w;if(r<=acc){ep=e;break;}}
    const fail=Math.random()<.17;
    logs.push({id:"req_"+Math.random().toString(36).slice(2,9),endpoint:ep.n,status:fail?"fail":"success",latency:fail?Math.round(900+Math.random()*5100):Math.round(60+Math.random()*340),price:ep.p*(0.85+Math.random()*.3),error:fail?errs[Math.floor(Math.random()*4)]:null,ts:new Date(Date.now()-Math.random()*86400000)});
  }
  const failed=logs.filter(l=>l.status==="fail");
  const totalLost=failed.reduce((s,l)=>s+l.price,0);
  const byEp={};
  for(const l of logs){
    if(!byEp[l.endpoint])byEp[l.endpoint]={total:0,failed:0,lost:0,lats:[]};
    byEp[l.endpoint].total++;byEp[l.endpoint].lats.push(l.latency);
    if(l.status==="fail"){byEp[l.endpoint].failed++;byEp[l.endpoint].lost+=l.price;}
  }
  const endpoints=Object.entries(byEp).map(([name,s])=>({name,total:s.total,failed:s.failed,rate:(s.failed/s.total)*100,lost:s.lost,avgLatency:Math.round(s.lats.reduce((a,b)=>a+b,0)/s.lats.length)})).sort((a,b)=>b.lost-a.lost);
  return{logs:logs.sort((a,b)=>b.ts-a.ts),totalLost,totalFailed:failed.length,totalRequests:800,failRate:(failed.length/800)*100,avgLatency:Math.round(logs.reduce((s,l)=>s+l.latency,0)/logs.length),endpoints,spark:Array.from({length:30},(_,i)=>({day:i+1,lost:totalLost*(0.5+Math.random()*.9)})),isDemo:true};
}

function Dot({active=false,color="var(--red)"}){
  return <span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:color,flexShrink:0,animation:active?"blink 1.4s infinite":"none"}} />;
}
function Pill({children,color="var(--gray4)"}){
  return <span style={{fontSize:10,fontFamily:"DM Mono,monospace",color,letterSpacing:".08em",padding:"2px 8px",border:"1px solid var(--gray2)",borderRadius:20,background:"var(--white)"}}>{children}</span>;
}
function BarLine({value,max,color="var(--red)"}){
  const w=Math.min((value/(max||1))*100,100);
  return <div style={{height:2,background:"var(--gray2)",borderRadius:1,overflow:"hidden",marginTop:6}}><div style={{width:w+"%",height:"100%",background:color,transition:"width .7s ease"}} /></div>;
}

function Nav({route,go,hasSession}){
  const links=[{id:"what",label:"What it is"},{id:"how",label:"How it works"},{id:"why",label:"Why it matters"}];
  return(
    <header style={{position:"sticky",top:0,zIndex:50,background:"rgba(250,250,250,.85)",backdropFilter:"blur(10px)",borderBottom:"1px solid var(--gray2)"}}>
      <div style={{maxWidth:1080,margin:"0 auto",padding:"14px 28px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={()=>go("what")} style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer"}}>
          <div style={{width:26,height:26,background:"var(--ink)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{color:"var(--red)",fontSize:10,fontWeight:600,fontFamily:"DM Mono,monospace"}}>fx</span>
          </div>
          <span style={{fontSize:13,fontWeight:600,color:"var(--ink)",letterSpacing:"-.01em"}}>Fluxera</span>
        </button>
        <nav style={{display:"flex",alignItems:"center",gap:4}}>
          {links.map(l=>(
            <button key={l.id} onClick={()=>go(l.id)} style={{padding:"6px 12px",background:route===l.id?"var(--gray1)":"transparent",border:"none",borderRadius:6,color:route===l.id?"var(--ink)":"var(--gray4)",fontSize:12,fontWeight:route===l.id?500:400,cursor:"pointer"}}>{l.label}</button>
          ))}
          <button onClick={()=>go("overview")} style={{marginLeft:6,padding:"7px 16px",background:"var(--ink)",border:"none",borderRadius:7,color:"var(--white)",fontSize:12,fontWeight:500,cursor:"pointer"}}>
            {hasSession?"Open dashboard":"View demo →"}
          </button>
        </nav>
      </div>
    </header>
  );
}

function WhatPage({go}){
  const [demo] = useState(() => mock());
  return(
    <div style={{maxWidth:1080,margin:"0 auto",padding:"64px 28px 100px"}}>
      <div style={{maxWidth:640,marginBottom:64,animation:"up24 .5s ease"}}>
        <Pill color="var(--red)">REVENUE LEAK DETECTOR</Pill>
        <h1 style={{fontSize:44,fontWeight:600,letterSpacing:"-.03em",lineHeight:1.1,margin:"18px 0 18px"}}>Every failed API call<br/>costs you twice.</h1>
        <p style={{fontSize:16,color:"var(--gray5)",lineHeight:1.6,marginBottom:28}}>Fluxera watches every API call your product makes, turns the failures into a real dollar number, and tells you exactly what to fix first, before another day of silent loss goes by.</p>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>go("overview")} style={{padding:"11px 22px",background:"var(--ink)",color:"var(--white)",border:"none",borderRadius:8,fontSize:13,fontWeight:500,cursor:"pointer"}}>See a live example →</button>
          <button onClick={()=>go("how")} style={{padding:"11px 22px",background:"var(--white)",color:"var(--ink)",border:"1px solid var(--gray2)",borderRadius:8,fontSize:13,fontWeight:500,cursor:"pointer"}}>How it works</button>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12,animation:"up24 .6s ease .1s both"}}>
        <div style={{background:"var(--white)",border:"1px solid var(--red-border)",borderRadius:12,padding:"26px",boxShadow:"0 1px 2px rgba(212,32,32,.04)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:"var(--red)"}} />
            <p style={{fontSize:11,fontWeight:500,color:"var(--red)",letterSpacing:".08em",fontFamily:"DM Mono,monospace"}}>API REVENUE LOST</p>
          </div>
          <div style={{fontSize:46,fontWeight:600,color:"var(--red)",letterSpacing:"-.03em",lineHeight:1}}>{f$(demo.totalLost)}</div>
          <p style={{fontSize:12,color:"var(--gray4)",marginTop:9}}>{fNum(demo.totalFailed)} failed requests, last 24h</p>
        </div>
        <div style={{background:"var(--white)",border:"1px solid var(--amber-border)",borderRadius:12,padding:"26px",boxShadow:"0 1px 2px rgba(180,88,0,.04)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:"var(--amber)"}} />
            <p style={{fontSize:11,fontWeight:500,color:"var(--amber)",letterSpacing:".08em",fontFamily:"DM Mono,monospace"}}>EST. BUSINESS LOSS</p>
          </div>
          <div style={{fontSize:46,fontWeight:600,color:"var(--amber)",letterSpacing:"-.03em",lineHeight:1}}>{f$(demo.totalLost*4.2)}</div>
          <p style={{fontSize:12,color:"var(--gray4)",marginTop:9}}>40% abandonment rate applied</p>
        </div>
        <div style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:12,padding:"26px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:"var(--gray4)"}} />
            <p style={{fontSize:11,fontWeight:500,color:"var(--gray5)",letterSpacing:".08em",fontFamily:"DM Mono,monospace"}}>USERS AFFECTED</p>
          </div>
          <div style={{fontSize:46,fontWeight:600,color:"var(--ink)",letterSpacing:"-.03em",lineHeight:1}}>~{fNum(Math.round(demo.totalFailed*.4))}</div>
          <p style={{fontSize:12,color:"var(--gray4)",marginTop:9}}>hit an error in the last 24h</p>
        </div>
        <div style={{background:"var(--green-bg)",border:"1px solid var(--green-border)",borderRadius:12,padding:"26px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:"var(--green)"}} />
            <p style={{fontSize:11,fontWeight:500,color:"var(--green)",letterSpacing:".08em",fontFamily:"DM Mono,monospace"}}>FIX — RECOVERABLE</p>
          </div>
          <div style={{fontSize:46,fontWeight:600,color:"var(--green)",letterSpacing:"-.03em",lineHeight:1}}>{f$(demo.totalLost*.65)}<span style={{fontSize:16,fontWeight:400}}>/day</span></div>
          <p style={{fontSize:12,color:"var(--green)",marginTop:9,opacity:.8}}>retry logic on top endpoint</p>
        </div>
      </div>
      <p style={{fontSize:11,color:"var(--gray3)",marginBottom:64,fontFamily:"DM Mono,monospace"}}>↑ interactive preview, powered by simulated data</p>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24,marginBottom:64}}>
        {[
          {t:"Detect",d:"Every API call your product makes is tracked — success, failure, latency, cost — with one line of code."},
          {t:"Translate",d:"Failures become dollars. Not error rates. Not uptime percentages. The number your CEO actually cares about."},
          {t:"Fix",d:"Every report tells you which endpoint is bleeding the most, and the specific fix to try first."},
        ].map((c,i)=>(
          <div key={c.t} style={{animation:`up .4s ease ${i*.1}s both`}}>
            <p style={{fontSize:11,fontFamily:"DM Mono,monospace",color:"var(--gray3)",marginBottom:8}}>{String(i+1).padStart(2,"0")}</p>
            <p style={{fontSize:16,fontWeight:600,marginBottom:8}}>{c.t}</p>
            <p style={{fontSize:13,color:"var(--gray4)",lineHeight:1.6}}>{c.d}</p>
          </div>
        ))}
      </div>

      <div style={{background:"var(--ink)",borderRadius:16,padding:"40px 44px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:20}}>
        <div>
          <p style={{fontSize:20,fontWeight:600,color:"var(--white)",marginBottom:6}}>See what it looks like with real data.</p>
          <p style={{fontSize:13,color:"var(--gray3)"}}>10 minutes to install. Free to try.</p>
        </div>
        <button onClick={()=>go("overview")} style={{padding:"12px 24px",background:"var(--red)",color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:500,cursor:"pointer",whiteSpace:"nowrap"}}>Open live demo →</button>
      </div>
    </div>
  );
}

function HowPage({go}){
  const steps=[
    {t:"Wrap one function",d:"Install the SDK. Wrap the API calls you want tracked — one line around each call.",code:"const fluxera = require('@fluxera/sdk')('fx_your_key')\n\nconst result = await fluxera.track(\n  () => your_api_call(),\n  { endpoint: '/v1/chat', price: 0.04 }\n)"},
    {t:"Every call is logged",d:"Success, failure, latency, and cost are recorded automatically. Nothing changes about how your API behaves.",code:'{\n  "endpoint": "/v1/chat",\n  "status": "fail",\n  "latency_ms": 4200,\n  "price": 0.04,\n  "error_type": "timeout"\n}'},
    {t:"Failures become dollars",d:"failed_requests × avg_price. That's the whole formula. No black box.",code:"api_loss = failed_requests × avg_price\nbusiness_loss ≈ api_loss × abandonment_multiplier\n\nExample:\n140 failures × $0.05 = $6.58 lost"},
  ];
  return(
    <div style={{maxWidth:1080,margin:"0 auto",padding:"64px 28px 100px"}}>
      <div style={{maxWidth:600,marginBottom:56,animation:"up24 .5s ease"}}>
        <Pill>THE MECHANICS</Pill>
        <h1 style={{fontSize:38,fontWeight:600,letterSpacing:"-.03em",lineHeight:1.15,margin:"16px 0 16px"}}>Three steps. No black box.</h1>
        <p style={{fontSize:15,color:"var(--gray5)",lineHeight:1.6}}>You should be able to see exactly how every number on your dashboard was calculated. Here's the whole mechanism.</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:1,background:"var(--gray2)",borderRadius:12,overflow:"hidden",border:"1px solid var(--gray2)"}}>
        {steps.map((s,i)=>(
          <div key={s.t} style={{background:"var(--white)",padding:"32px",display:"grid",gridTemplateColumns:"200px 1fr",gap:32,animation:`up .4s ease ${i*.08}s both`}}>
            <div>
              <p style={{fontSize:11,fontFamily:"DM Mono,monospace",color:"var(--gray3)",marginBottom:10}}>STEP {i+1}</p>
              <p style={{fontSize:17,fontWeight:600,marginBottom:8}}>{s.t}</p>
              <p style={{fontSize:13,color:"var(--gray4)",lineHeight:1.6}}>{s.d}</p>
            </div>
            <pre style={{background:"var(--ink)",color:"rgba(255,255,255,.85)",padding:"18px 20px",borderRadius:10,fontSize:12,fontFamily:"DM Mono,monospace",lineHeight:1.8,overflowX:"auto",whiteSpace:"pre-wrap",margin:0}}>{s.code}</pre>
          </div>
        ))}
      </div>
      <div style={{marginTop:56,display:"flex",justifyContent:"center"}}>
        <button onClick={()=>go("why")} style={{padding:"11px 24px",background:"var(--ink)",color:"var(--white)",border:"none",borderRadius:8,fontSize:13,fontWeight:500,cursor:"pointer"}}>Why this matters to you →</button>
      </div>
    </div>
  );
}

function WhyPage({go}){
  const rows=[
    {q:"You track uptime, not dollars.",a:"99.2% uptime sounds fine. But 0.8% of a million calls a month, at $0.04 each, is real money leaving quietly."},
    {q:"You only see the API bill.",a:"The bill shows what you spent. It doesn't show what you spent on calls that failed — or the users who left after hitting one."},
    {q:"Nobody's watching this daily.",a:"One email every morning. One number. You don't have to build a dashboard habit — it comes to you."},
  ];
  return(
    <div style={{maxWidth:1080,margin:"0 auto",padding:"64px 28px 100px"}}>
      <div style={{maxWidth:600,marginBottom:56,animation:"up24 .5s ease"}}>
        <Pill color="var(--amber)">FOR FOUNDERS SHIPPING FAST</Pill>
        <h1 style={{fontSize:38,fontWeight:600,letterSpacing:"-.03em",lineHeight:1.15,margin:"16px 0 16px"}}>You're probably already losing money on this.</h1>
        <p style={{fontSize:15,color:"var(--gray5)",lineHeight:1.6}}>Most founders find out about their real failure rate the hard way — a user complains, or an investor asks a question they can't answer.</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:48}}>
        {rows.map((r,i)=>(
          <div key={r.q} style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:10,padding:"22px 26px",animation:`up .4s ease ${i*.08}s both`}}>
            <p style={{fontSize:15,fontWeight:600,marginBottom:6}}>{r.q}</p>
            <p style={{fontSize:13,color:"var(--gray4)",lineHeight:1.6}}>{r.a}</p>
          </div>
        ))}
      </div>
      <div style={{background:"var(--amber-bg)",border:"1px solid var(--amber-border)",borderRadius:12,padding:"28px 32px",marginBottom:56}}>
        <p style={{fontSize:11,fontFamily:"DM Mono,monospace",color:"var(--amber)",letterSpacing:".06em",marginBottom:14}}>REAL REPORT, WEEK ONE</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}}>
          {[{k:"API loss",v:"$2,340/day"},{k:"Failure rate",v:"18.3%"},{k:"Top endpoint",v:"/v1/chat"},{k:"Est. impact",v:"$9,828/day"}].map(s=>(
            <div key={s.k}>
              <p style={{fontSize:10,color:"var(--amber)",opacity:.7,marginBottom:4}}>{s.k}</p>
              <p style={{fontSize:18,fontWeight:600,color:"var(--amber)",fontFamily:"DM Mono,monospace"}}>{s.v}</p>
            </div>
          ))}
        </div>
        <p style={{fontSize:12,color:"var(--amber)",marginTop:18,opacity:.85}}>They found this in their first email. Fixed the top endpoint in two hours.</p>
      </div>
      <div style={{textAlign:"center"}}>
        <button onClick={()=>go("overview")} style={{padding:"12px 28px",background:"var(--red)",color:"#fff",border:"none",borderRadius:8,fontSize:14,fontWeight:500,cursor:"pointer"}}>Find your number →</button>
      </div>
    </div>
  );
}

function Login({onLogin}){
  const [email,setEmail]=useState("");
  const [key,setKey]=useState("");
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");

  async function submit(e){
    e.preventDefault();setErr("");
    if(!email.includes("@")){setErr("Enter a valid email.");return;}
    if(key&&!key.startsWith("fx_")){setErr("API key must start with fx_");return;}
    setLoading(true);
    if(!key){setTimeout(()=>{onLogin({email,company:"Demo",apiKey:"",isDemo:true});setLoading(false);},600);return;}
    try{
      const r=await fetch(`${API_BASE}/api/customers/me`,{headers:{Authorization:`Bearer ${key}`}});
      if(!r.ok)throw 0;
      const c=await r.json();
      onLogin({email:c.email,company:c.company||email,apiKey:key,isDemo:false});
    }catch{setErr("Invalid API key. Try again.");}
    setLoading(false);
  }

  return(
    <div style={{minHeight:"calc(100vh - 57px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{width:"100%",maxWidth:380,animation:"up .4s ease"}}>
        <h1 style={{fontSize:24,fontWeight:600,letterSpacing:"-.02em",marginBottom:6}}>Sign in</h1>
        <p style={{fontSize:13,color:"var(--gray4)",marginBottom:28}}>See what your API failures are costing you — in dollars.</p>
        <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:16}}>
          {[{l:"Email",t:"email",ph:"you@company.com",v:email,s:setEmail},{l:"API Key",t:"text",ph:"fx_...  (leave blank for demo)",v:key,s:setKey}].map(f=>(
            <div key={f.l}>
              <label style={{display:"block",fontSize:12,fontWeight:500,color:"var(--gray5)",marginBottom:6}}>{f.l}</label>
              <input type={f.t} placeholder={f.ph} value={f.v} onChange={e=>f.s(e.target.value)}
                style={{width:"100%",padding:"9px 12px",border:"1px solid var(--gray2)",borderRadius:8,fontSize:13,color:"var(--ink)",background:"var(--white)",outline:"none"}}
                onFocus={e=>e.target.style.borderColor="var(--ink)"}
                onBlur={e=>e.target.style.borderColor="var(--gray2)"} />
            </div>
          ))}
          {err&&<p style={{fontSize:12,color:"var(--red)",padding:"8px 12px",background:"var(--red-bg)",border:"1px solid var(--red-border)",borderRadius:6}}>{err}</p>}
          <button type="submit" disabled={loading} style={{padding:"10px",background:"var(--ink)",color:"var(--white)",border:"none",borderRadius:8,fontSize:13,fontWeight:500,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,opacity:loading?.6:1}}>
            {loading?<><span style={{width:12,height:12,border:"1.5px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .7s linear infinite",display:"inline-block"}} />Signing in...</>:"Sign in →"}
          </button>
        </form>
        <p style={{marginTop:20,fontSize:12,color:"var(--gray3)",textAlign:"center"}}>Leave API key blank to explore demo data.</p>
      </div>
    </div>
  );
}

function ProductShell({children,page,go,company,isDemo,live,setLive,period,setPeriod,onLogout}){
  const nav=[{id:"overview",label:"Overview"},{id:"endpoints",label:"Endpoints"},{id:"logs",label:"Logs"},{id:"settings",label:"Settings"}];
  return(
    <div style={{display:"flex",minHeight:"calc(100vh - 57px)",background:"var(--bg)"}}>
      <aside style={{width:200,background:"var(--white)",borderRight:"1px solid var(--gray2)",display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{padding:"16px 20px 14px",borderBottom:"1px solid var(--gray2)"}}>
          <p style={{fontSize:10,fontWeight:500,color:"var(--gray3)",letterSpacing:".06em",marginBottom:2}}>WORKSPACE</p>
          <p style={{fontSize:12,fontWeight:500,color:"var(--ink)",textTransform:"capitalize",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{company}</p>
          {isDemo&&<span style={{display:"inline-block",marginTop:4}}><Pill>DEMO</Pill></span>}
        </div>
        <nav style={{padding:"10px",flex:1}}>
          {nav.map(n=>(
            <button key={n.id} onClick={()=>go(n.id)} style={{width:"100%",display:"flex",alignItems:"center",padding:"8px 10px",background:page===n.id?"var(--gray1)":"transparent",border:"none",borderRadius:6,color:page===n.id?"var(--ink)":"var(--gray4)",fontSize:12,fontWeight:page===n.id?500:400,cursor:"pointer",marginBottom:1,textAlign:"left"}}>{n.label}</button>
          ))}
        </nav>
        <div style={{padding:"14px 20px",borderTop:"1px solid var(--gray2)",display:"flex",flexDirection:"column",gap:8}}>
          <button onClick={()=>setLive(!live)} style={{display:"flex",alignItems:"center",gap:7,padding:"7px 10px",background:live?"var(--red-bg)":"var(--gray1)",border:"1px solid "+(live?"var(--red-border)":"var(--gray2)"),borderRadius:6,fontSize:11,color:live?"var(--red)":"var(--gray4)",cursor:"pointer",fontFamily:"DM Mono,monospace",letterSpacing:".05em"}}>
            <Dot active={live} color={live?"var(--red)":"var(--gray3)"} />{live?"STREAMING":"STATIC"}
          </button>
          <button onClick={onLogout} style={{padding:"7px 10px",background:"transparent",border:"1px solid var(--gray2)",borderRadius:6,color:"var(--gray4)",fontSize:11,cursor:"pointer",textAlign:"left"}}>Sign out</button>
        </div>
      </aside>
      <main style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
        <div style={{padding:"12px 28px",borderBottom:"1px solid var(--gray2)",display:"flex",alignItems:"center",justifyContent:"space-between",background:"var(--white)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:14,fontWeight:600,letterSpacing:"-.01em"}}>{nav.find(n=>n.id===page)?.label}</span>
            {live&&<div style={{display:"flex",alignItems:"center",gap:5,fontSize:10,fontFamily:"DM Mono,monospace",color:"var(--red)",padding:"2px 8px",background:"var(--red-bg)",border:"1px solid var(--red-border)",borderRadius:20}}><Dot active color="var(--red)" />LIVE</div>}
          </div>
          <div style={{display:"flex",border:"1px solid var(--gray2)",borderRadius:7,overflow:"hidden"}}>
            {["24h","7d","30d"].map(p=>(
              <button key={p} onClick={()=>setPeriod(p)} style={{padding:"5px 14px",background:period===p?"var(--gray1)":"var(--white)",border:"none",borderRight:p!=="30d"?"1px solid var(--gray2)":"none",color:period===p?"var(--ink)":"var(--gray4)",fontSize:12,fontWeight:period===p?500:400,cursor:"pointer"}}>{p}</button>
            ))}
          </div>
        </div>
        <div style={{flex:1,padding:"28px 28px 40px"}}>{children}</div>
      </main>
    </div>
  );
}

function Overview({data}){
  const{totalLost,totalFailed,totalRequests,failRate,avgLatency,endpoints,spark}=data;
  const bizLoss=totalLost*4.2;
  const maxLost=endpoints[0]?.lost||1;
  return(
    <div style={{display:"flex",flexDirection:"column",gap:24,animation:"up .3s ease"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div style={{background:"var(--white)",border:"1px solid var(--red-border)",borderRadius:12,padding:"32px 32px 28px",boxShadow:"0 1px 2px rgba(212,32,32,.04)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:"var(--red)"}} />
            <p style={{fontSize:11,fontWeight:500,color:"var(--red)",letterSpacing:".08em",fontFamily:"DM Mono,monospace"}}>API REVENUE LOST · LAST 24H</p>
          </div>
          <div style={{fontSize:64,fontWeight:600,color:"var(--red)",letterSpacing:"-.04em",lineHeight:1,marginBottom:4}}>{f$(totalLost)}</div>
          <div style={{height:2,width:48,background:"var(--red)",marginBottom:16,borderRadius:1}} />
          <p style={{fontSize:12,color:"var(--gray4)"}}><span style={{fontFamily:"DM Mono,monospace",color:"var(--ink)",fontWeight:500}}>{fNum(totalFailed)}</span> failed requests at <span style={{fontFamily:"DM Mono,monospace",color:"var(--ink)",fontWeight:500}}>{totalFailed>0?f$(totalLost/totalFailed):"—"}</span> avg</p>
          <p style={{fontSize:11,color:"var(--gray3)",marginTop:10,paddingTop:10,borderTop:"1px solid var(--gray2)"}}>Direct cost — what you paid for calls that failed.</p>
        </div>
        <div style={{background:"var(--white)",border:"1px solid var(--amber-border)",borderRadius:12,padding:"32px 32px 28px",boxShadow:"0 1px 2px rgba(180,88,0,.04)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:"var(--amber)"}} />
            <p style={{fontSize:11,fontWeight:500,color:"var(--amber)",letterSpacing:".08em",fontFamily:"DM Mono,monospace"}}>EST. BUSINESS LOSS · LAST 24H</p>
          </div>
          <div style={{fontSize:64,fontWeight:600,color:"var(--amber)",letterSpacing:"-.04em",lineHeight:1,marginBottom:4}}>{f$(bizLoss)}</div>
          <div style={{height:2,width:48,background:"var(--amber)",marginBottom:16,borderRadius:1}} />
          <p style={{fontSize:12,color:"var(--gray4)"}}><span style={{fontFamily:"DM Mono,monospace",color:"var(--ink)",fontWeight:500}}>~{fNum(Math.round(totalFailed*.4))}</span> users affected · <span style={{fontFamily:"DM Mono,monospace",color:"var(--ink)",fontWeight:500}}>40%</span> abandonment rate</p>
          <p style={{fontSize:11,color:"var(--gray3)",marginTop:10,paddingTop:10,borderTop:"1px solid var(--gray2)"}}>Indirect cost — customers who left after hitting an error.</p>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
        {[
          {label:"Failure Rate",value:fPct(failRate),color:failRate>20?"var(--red)":failRate>10?"var(--amber)":"var(--green)"},
          {label:"Avg Latency",value:fMs(avgLatency),color:"var(--ink)"},
          {label:"Total Requests",value:fNum(totalRequests),color:"var(--ink)"},
          {label:"Monthly Projection",value:f$(totalLost*30),color:"var(--red)"},
        ].map(s=>(
          <div key={s.label} style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:10,padding:"16px 18px"}}>
            <p style={{fontSize:10,fontWeight:500,color:"var(--gray4)",letterSpacing:".06em",fontFamily:"DM Mono,monospace",marginBottom:10}}>{s.label.toUpperCase()}</p>
            <p style={{fontSize:22,fontWeight:600,color:s.color,letterSpacing:"-.02em"}}>{s.value}</p>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:12}}>
        <div style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:10,padding:"20px 22px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:18}}>
            <div>
              <p style={{fontSize:10,fontWeight:500,color:"var(--gray4)",letterSpacing:".06em",fontFamily:"DM Mono,monospace",marginBottom:4}}>30-DAY TREND</p>
              <p style={{fontSize:18,fontWeight:600,letterSpacing:"-.02em"}}>{f$(totalLost*30)} <span style={{fontSize:12,fontWeight:400,color:"var(--gray4)"}}>projected this month</span></p>
            </div>
            <p style={{fontSize:12,color:"var(--gray4)"}}>Today: <span style={{fontWeight:600,color:"var(--red)"}}>{f$(totalLost)}</span></p>
          </div>
          <div style={{display:"flex",alignItems:"flex-end",gap:3,height:64}}>
            {spark.map((d,i)=>{
              const max=Math.max(...spark.map(s=>s.lost),1);
              const h=Math.max((d.lost/max)*64,2);
              const today=i===spark.length-1;
              return <div key={i} title={`Day ${d.day}: ${f$(d.lost)}`} style={{flex:1,height:h,background:today?"var(--red)":"var(--gray2)",borderRadius:"2px 2px 0 0",opacity:today?1:0.4+(i/spark.length)*.5,cursor:"pointer"}} />;
            })}
          </div>
        </div>
        <div style={{background:"var(--green-bg)",border:"1px solid var(--green-border)",borderRadius:10,padding:"20px 22px",display:"flex",flexDirection:"column",gap:14}}>
          <div>
            <p style={{fontSize:10,fontWeight:500,color:"var(--green)",letterSpacing:".06em",fontFamily:"DM Mono,monospace",marginBottom:4}}>RECOVERY PLAN</p>
            <p style={{fontSize:24,fontWeight:600,color:"var(--green)",letterSpacing:"-.02em"}}>{f$(totalLost*.65)}<span style={{fontSize:12,fontWeight:400,marginLeft:4}}>/day recoverable</span></p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,paddingTop:12,borderTop:"1px solid var(--green-border)"}}>
            {[
              {a:"Retry logic on "+(endpoints[0]?.name||"top endpoint"),v:(endpoints[0]?.lost||0)*.65,tag:"1s / 2s / 4s backoff, 3 attempts"},
              {a:"Circuit breaker on "+(endpoints[1]?.name||"2nd endpoint"),v:(endpoints[1]?.lost||0)*.5,tag:"fails fast, protects downstream"},
              {a:"Request queue + rate limit handling",v:(endpoints[2]?.lost||0)*.4,tag:"smooths burst traffic"},
            ].map((f,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                <div>
                  <p style={{fontSize:12,color:"var(--green)",lineHeight:1.4,fontWeight:500}}>{f.a}</p>
                  <p style={{fontSize:10,color:"var(--green)",opacity:.7}}>{f.tag}</p>
                </div>
                <p style={{fontSize:13,fontWeight:600,color:"var(--green)",fontFamily:"DM Mono,monospace",whiteSpace:"nowrap"}}>+{f$(f.v)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:10,overflow:"hidden"}}>
        <div style={{padding:"14px 20px",borderBottom:"1px solid var(--gray2)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <p style={{fontSize:12,fontWeight:600}}>Leaking Endpoints</p>
          <Pill>LAST 24H</Pill>
        </div>
        {endpoints.slice(0,5).map((ep,i)=>(
          <div key={ep.name} style={{padding:"13px 20px",borderBottom:i<4?"1px solid var(--gray2)":"none",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:12,alignItems:"center"}}
            onMouseEnter={e=>e.currentTarget.style.background="var(--gray1)"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                {i===0&&<Dot active color="var(--red)" />}
                <span style={{fontSize:12,fontFamily:"DM Mono,monospace"}}>{ep.name}</span>
              </div>
              <BarLine value={ep.lost} max={maxLost} color={i===0?"var(--red)":"var(--gray3)"} />
            </div>
            <p style={{fontSize:12,color:"var(--gray5)",fontFamily:"DM Mono,monospace"}}>{fNum(ep.failed)} failed</p>
            <p style={{fontSize:12,fontFamily:"DM Mono,monospace",color:ep.rate>20?"var(--red)":"var(--amber)",fontWeight:500}}>{fPct(ep.rate)}</p>
            <p style={{fontSize:15,fontWeight:600,color:"var(--red)",textAlign:"right"}}>{f$(ep.lost)}</p>
          </div>
        ))}
        <div style={{padding:"12px 20px",borderTop:"1px solid var(--gray2)",background:"var(--gray1)",display:"flex",gap:32}}>
          {[{k:"formula",v:"failures × avg_price"},{k:"api_loss",v:f$(totalLost),red:true},{k:"business_est",v:f$(bizLoss),amber:true}].map(r=>(
            <div key={r.k}>
              <p style={{fontSize:10,color:"var(--gray3)",fontFamily:"DM Mono,monospace",marginBottom:2}}>{r.k}</p>
              <p style={{fontSize:12,fontFamily:"DM Mono,monospace",fontWeight:500,color:r.red?"var(--red)":r.amber?"var(--amber)":"var(--gray5)"}}>{r.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Endpoints({data}){
  const[sel,setSel]=useState(null);
  const{endpoints}=data;
  const maxLost=endpoints[0]?.lost||1;
  return(
    <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:16,animation:"up .3s ease"}}>
      <div style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:10,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr",padding:"11px 20px",borderBottom:"1px solid var(--gray2)",background:"var(--gray1)"}}>
          {["Endpoint","Total","Failures","Rate","Lost"].map(h=><p key={h} style={{fontSize:11,fontWeight:500,color:"var(--gray4)"}}>{h}</p>)}
        </div>
        {endpoints.map((ep,i)=>(
          <div key={ep.name} onClick={()=>setSel(sel?.name===ep.name?null:ep)}
            style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr",padding:"14px 20px",borderBottom:i<endpoints.length-1?"1px solid var(--gray2)":"none",cursor:"pointer",background:sel?.name===ep.name?"var(--gray1)":"transparent",alignItems:"center"}}
            onMouseEnter={e=>{if(sel?.name!==ep.name)e.currentTarget.style.background="var(--gray1)";}}
            onMouseLeave={e=>{if(sel?.name!==ep.name)e.currentTarget.style.background="transparent";}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                {i===0&&<Dot active color="var(--red)" />}
                <span style={{fontSize:12,fontFamily:"DM Mono,monospace"}}>{ep.name}</span>
              </div>
              <BarLine value={ep.lost} max={maxLost} color={i===0?"var(--red)":"var(--gray3)"} />
            </div>
            <p style={{fontSize:12,fontFamily:"DM Mono,monospace",color:"var(--gray5)"}}>{fNum(ep.total)}</p>
            <p style={{fontSize:12,fontFamily:"DM Mono,monospace",color:"var(--red)",fontWeight:500}}>{fNum(ep.failed)}</p>
            <p style={{fontSize:12,fontFamily:"DM Mono,monospace",color:ep.rate>20?"var(--red)":"var(--amber)",fontWeight:500}}>{fPct(ep.rate)}</p>
            <p style={{fontSize:14,fontWeight:600,color:"var(--red)",textAlign:"right"}}>{f$(ep.lost)}</p>
          </div>
        ))}
      </div>
      {sel?(
        <div style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:10,padding:"20px",animation:"in .2s ease"}}>
          <p style={{fontSize:10,fontWeight:500,color:"var(--gray3)",fontFamily:"DM Mono,monospace",marginBottom:12}}>ENDPOINT DETAIL</p>
          <p style={{fontSize:12,fontFamily:"DM Mono,monospace",color:"var(--red)",marginBottom:16,wordBreak:"break-all"}}>{sel.name}</p>
          {[{l:"API Loss",v:f$(sel.lost),c:"var(--red)"},{l:"Est. Business Impact",v:f$(sel.lost*4.2),c:"var(--amber)"},{l:"Failed",v:fNum(sel.failed),c:"var(--ink)"},{l:"Total",v:fNum(sel.total),c:"var(--ink)"},{l:"Failure Rate",v:fPct(sel.rate),c:sel.rate>20?"var(--red)":"var(--amber)"},{l:"Avg Latency",v:fMs(sel.avgLatency),c:"var(--ink)"}].map(r=>(
            <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid var(--gray2)"}}>
              <span style={{fontSize:12,color:"var(--gray4)"}}>{r.l}</span>
              <span style={{fontSize:13,fontWeight:600,color:r.c,fontFamily:"DM Mono,monospace"}}>{r.v}</span>
            </div>
          ))}
          <div style={{marginTop:16,padding:"14px",background:"var(--green-bg)",borderRadius:8,border:"1px solid var(--green-border)"}}>
            <p style={{fontSize:10,fontWeight:500,color:"var(--green)",fontFamily:"DM Mono,monospace",marginBottom:6}}>FIX</p>
            <p style={{fontSize:12,color:"var(--green)",lineHeight:1.6}}>Retry with exponential backoff · 1s / 2s / 4s · 3 attempts</p>
            <p style={{fontSize:15,fontWeight:600,color:"var(--green)",marginTop:10,fontFamily:"DM Mono,monospace"}}>{f$(sel.lost*.65)} <span style={{fontSize:11,fontWeight:400}}>recoverable/day</span></p>
          </div>
        </div>
      ):(
        <div style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:10,padding:"32px 24px",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <p style={{fontSize:12,color:"var(--gray3)"}}>Select an endpoint to inspect</p>
        </div>
      )}
    </div>
  );
}

function Logs({data}){
  const[filter,setFilter]=useState("all");
  const rows=(filter==="all"?data.logs:data.logs.filter(l=>l.status===filter)).slice(0,200);
  return(
    <div style={{display:"flex",flexDirection:"column",gap:14,animation:"up .3s ease"}}>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        {["all","fail","success"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{padding:"5px 14px",background:filter===f?"var(--white)":"transparent",border:"1px solid "+(filter===f?"var(--gray2)":"transparent"),borderRadius:6,color:filter===f?"var(--ink)":"var(--gray4)",fontSize:12,fontWeight:filter===f?500:400,cursor:"pointer"}}>{f==="all"?"All":f==="fail"?"Failures":"Successes"}</button>
        ))}
        <p style={{marginLeft:"auto",fontSize:12,color:"var(--gray4)",fontFamily:"DM Mono,monospace"}}>{fNum(rows.length)} rows</p>
      </div>
      <div style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:10,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"1.5fr 1.5fr .8fr .8fr .8fr",padding:"10px 20px",borderBottom:"1px solid var(--gray2)",background:"var(--gray1)"}}>
          {["Request ID","Endpoint","Status","Latency","Cost"].map(h=><p key={h} style={{fontSize:11,fontWeight:500,color:"var(--gray4)"}}>{h}</p>)}
        </div>
        <div style={{maxHeight:500,overflowY:"auto"}}>
          {rows.length===0?<p style={{padding:"32px",textAlign:"center",fontSize:13,color:"var(--gray3)"}}>No logs yet. Install the SDK to start tracking.</p>:rows.map((log,i)=>(
            <div key={log.id+i} style={{display:"grid",gridTemplateColumns:"1.5fr 1.5fr .8fr .8fr .8fr",padding:"10px 20px",borderBottom:"1px solid var(--gray2)",alignItems:"center"}}
              onMouseEnter={e=>e.currentTarget.style.background="var(--gray1)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <p style={{fontSize:11,fontFamily:"DM Mono,monospace",color:"var(--gray3)"}}>{log.id}</p>
              <p style={{fontSize:11,fontFamily:"DM Mono,monospace",color:"var(--gray5)"}}>{log.endpoint}</p>
              <div style={{display:"flex",alignItems:"center",gap:5}}>
                <Dot color={log.status==="fail"?"var(--red)":"var(--green)"} />
                <span style={{fontSize:11,fontFamily:"DM Mono,monospace",color:log.status==="fail"?"var(--red)":"var(--green)",fontWeight:500}}>{log.status}</span>
              </div>
              <p style={{fontSize:11,fontFamily:"DM Mono,monospace",color:log.latency>2000?"var(--amber)":"var(--gray4)"}}>{fMs(log.latency)}</p>
              <p style={{fontSize:11,fontFamily:"DM Mono,monospace",color:log.status==="fail"?"var(--red)":"var(--gray3)",fontWeight:log.status==="fail"?500:400}}>{log.status==="fail"?"-"+f$(log.price):"—"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Settings({apiKey,company,pricePerReq,setPricePerReq,regen}){
  const[copied,setCopied]=useState(false);
  const[copyFailed,setCopyFailed]=useState(false);
  const[price,setPrice]=useState(pricePerReq);
  const[saved,setSaved]=useState(false);
  const[priceErr,setPriceErr]=useState(false);
  async function copy(){
    try{
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);setTimeout(()=>setCopied(false),2000);
    }catch{
      setCopyFailed(true);setTimeout(()=>setCopyFailed(false),2000);
    }
  }
  function save(){
    const p=Number(price);
    if(!Number.isFinite(p)||p<=0){setPriceErr(true);setTimeout(()=>setPriceErr(false),2000);return;}
    setPricePerReq(p);regen();setSaved(true);setTimeout(()=>setSaved(false),2000);
  }
  return(
    <div style={{maxWidth:560,display:"flex",flexDirection:"column",gap:14,animation:"up .3s ease"}}>
      {[
        {title:"API Key",content:<div style={{display:"flex"}}><div style={{flex:1,padding:"9px 12px",background:"var(--gray1)",border:"1px solid var(--gray2)",borderRight:"none",borderRadius:"8px 0 0 8px",fontSize:12,fontFamily:"DM Mono,monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{apiKey||"No key — demo mode"}</div><button onClick={copy} style={{padding:"9px 16px",background:copied?"var(--green-bg)":copyFailed?"var(--red-bg)":"var(--white)",border:"1px solid var(--gray2)",borderRadius:"0 8px 8px 0",color:copied?"var(--green)":copyFailed?"var(--red)":"var(--gray5)",fontSize:12,cursor:"pointer",fontWeight:500}}>{copied?"Copied ✓":copyFailed?"Copy failed":"Copy"}</button></div>},
        {title:"Price Per Request",sub:"Average cost of one API call in USD",content:<div style={{display:"flex"}}><input type="number" value={price} step={.001} min={.001} onChange={e=>setPrice(e.target.value)} style={{flex:1,padding:"9px 12px",background:"var(--gray1)",border:"1px solid "+(priceErr?"var(--red)":"var(--gray2)"),borderRight:"none",borderRadius:"8px 0 0 8px",fontSize:12,fontFamily:"DM Mono,monospace",outline:"none"}} /><button onClick={save} style={{padding:"9px 16px",background:saved?"var(--green-bg)":priceErr?"var(--red-bg)":"var(--ink)",border:"none",borderRadius:"0 8px 8px 0",color:saved?"var(--green)":priceErr?"var(--red)":"var(--white)",fontSize:12,cursor:"pointer",fontWeight:500}}>{saved?"Saved ✓":priceErr?"Invalid price":"Save"}</button></div>},
        {title:"SDK Install",content:<div style={{display:"flex",flexDirection:"column",gap:8}}>{[`npm install @fluxera/sdk`,`const fluxera = require('@fluxera/sdk')('${apiKey||"fx_your_key"}')\n\nconst result = await fluxera.track(\n  () => your_api_call(),\n  { endpoint: '/v1/chat', price: ${price} }\n)`].map((c,i)=><pre key={i} style={{background:"var(--ink)",color:"rgba(255,255,255,.8)",padding:"14px 16px",borderRadius:8,fontSize:12,fontFamily:"DM Mono,monospace",lineHeight:1.8,overflowX:"auto",whiteSpace:"pre-wrap",margin:0}}>{c}</pre>)}</div>},
        {title:"Account",content:<div>{[{k:"Company",v:company},{k:"Plan",v:"Starter · $699/month"},{k:"Daily report",v:"8:00 AM UTC"},{k:"Support",v:"support@fluxeratechnologies.ai"}].map(r=><div key={r.k} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid var(--gray2)"}}><span style={{fontSize:12,color:"var(--gray4)"}}>{r.k}</span><span style={{fontSize:12,fontWeight:500}}>{r.v}</span></div>)}</div>},
      ].map(s=>(
        <div key={s.title} style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:10,padding:"20px 22px"}}>
          <p style={{fontSize:13,fontWeight:600,marginBottom:s.sub?3:14}}>{s.title}</p>
          {s.sub&&<p style={{fontSize:12,color:"var(--gray4)",marginBottom:12}}>{s.sub}</p>}
          {s.content}
        </div>
      ))}
    </div>
  );
}

export default function App(){
  const[route,setRoute]=useState("what");
  const[session,setSession]=useState(null);
  const[period,setPeriod]=useState("24h");
  const[data,setData]=useState(null);
  const[error,setError]=useState(null);
  const[live,setLive]=useState(false);
  const[price,setPrice]=useState(.04);

  const productPages=["overview","endpoints","logs","settings"];
  const isProductPage=productPages.includes(route);

  function go(id){
    setRoute(id);
    window.scrollTo(0,0);
  }

  const regen=useCallback(async()=>{
    if(!session)return;
    setError(null);
    if(session.isDemo||!session.apiKey){setData(mock());return;}
    try{
      const r=await fetch(`${API_BASE}/api/report?period=${period}`,{headers:{Authorization:`Bearer ${session.apiKey}`}});
      if(!r.ok){
        if(r.status===401||r.status===403)throw new Error("Your API key is no longer valid. Please sign in again.");
        if(r.status===429)throw new Error("Rate limited — too many requests. Try again shortly.");
        throw new Error("Fluxera's server hit an error loading your report. Try again shortly.");
      }
      const j=await r.json();
      const eps=(j.endpoints||[]).map(ep=>({name:ep.endpoint,total:ep.total||0,failed:ep.failed||0,rate:parseFloat(ep.failure_rate)||0,lost:parseFloat(ep.revenue_lost)||0,avgLatency:parseInt(ep.avg_fail_latency)||0})).sort((a,b)=>b.lost-a.lost);
      const tl=parseFloat(j.revenue_lost)||0,sm=j.summary||{};
      setData({logs:[],totalLost:tl,totalFailed:parseInt(sm.failed_requests)||0,totalRequests:parseInt(sm.total_requests)||0,failRate:parseFloat(sm.failure_rate)||0,avgLatency:parseInt(sm.avg_latency_ms)||0,endpoints:eps,spark:Array.from({length:30},(_,i)=>({day:i+1,lost:tl*(0.7+Math.random()*.6)})),isDemo:false});
    }catch(e){
      // Real customer data failed to load — never silently substitute fake demo data.
      setData(null);
      setError(e.message||"Connection problem — couldn't reach Fluxera's server.");
    }
  },[session,period]);

  useEffect(()=>{if(session&&isProductPage)regen();},[session,regen,isProductPage]);

  useEffect(()=>{
    if(!live||!session)return;
    const eps=["/v1/chat/completions","/v1/completions","/v1/embeddings"];
    const iv=setInterval(()=>{
      const ep=eps[Math.floor(Math.random()*3)],fail=Math.random()<.17;
      const entry={id:"req_"+Math.random().toString(36).slice(2,9),endpoint:ep,status:fail?"fail":"success",latency:fail?Math.round(900+Math.random()*4000):Math.round(60+Math.random()*300),price:price*(0.85+Math.random()*.3),error:fail?"timeout":null,ts:new Date()};
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
        <Nav route={route} go={route==="overview"?()=>enterDashboard("overview"):go} hasSession={!!session} />

        {route==="what"&&<WhatPage go={enterDashboard} />}
        {route==="how"&&<HowPage go={go} />}
        {route==="why"&&<WhyPage go={enterDashboard} />}

        {isProductPage&&!session&&<Login onLogin={setSession} />}
        {isProductPage&&session&&!data&&error&&(
          <div style={{padding:80,textAlign:"center"}}>
            <p style={{fontSize:14,fontWeight:600,color:"var(--red)",marginBottom:8}}>Unable to load your Fluxera report</p>
            <p style={{fontSize:13,color:"var(--gray4)",marginBottom:20}}>{error}</p>
            <button onClick={regen} style={{padding:"9px 20px",background:"var(--ink)",color:"var(--white)",border:"none",borderRadius:8,fontSize:13,fontWeight:500,cursor:"pointer"}}>Try again</button>
          </div>
        )}
        {isProductPage&&session&&!data&&!error&&<div style={{padding:80,textAlign:"center",color:"var(--gray4)",fontSize:13}}>Loading...</div>}
        {isProductPage&&session&&data&&(
          <ProductShell page={route} go={go} company={session.company} isDemo={session.isDemo} live={live} setLive={setLive} period={period} setPeriod={setPeriod} onLogout={()=>{setSession(null);go("what");}}>
            {route==="overview"&&<Overview data={data} />}
            {route==="endpoints"&&<Endpoints data={data} />}
            {route==="logs"&&<Logs data={data} />}
            {route==="settings"&&<Settings apiKey={session.apiKey} company={session.company} pricePerReq={price} setPricePerReq={setPrice} regen={regen} />}
          </ProductShell>
        )}
      </div>
    </>
  );
}
