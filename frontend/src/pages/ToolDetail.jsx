import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../api";
import { f$, fMs } from "../format";
import { RecoveryCard } from "../components/RecoveryCard";

export function ToolDetail({apiKey,toolId,go}){
  const[pack,setPack]=useState(null);
  const[err,setErr]=useState("");
  const[saving,setSaving]=useState(false);

  function load(){
    if(!apiKey||!toolId)return;
    apiGet("/api/tools/"+toolId,apiKey).then(async r=>{
      if(!r.ok)throw new Error("Couldn't load tool");
      setPack(await r.json());
    }).catch(e=>setErr(e.message));
  }

  useEffect(()=>{load();},[apiKey,toolId]);

  async function recover(){
    const execId=pack?.execution?.id;
    if(!execId){setErr("No failed execution to recover.");return;}
    setSaving(true);setErr("");
    try{
      const r=await apiPost("/api/executions/"+execId+"/recover",apiKey,{});
      const j=await r.json().catch(()=>({}));
      if(!r.ok)throw new Error(j.error||"Couldn't recover");
      await load();
    }catch(e){setErr(e.message);}
    setSaving(false);
  }

  if(err&&!pack)return <p style={{color:"var(--red)"}}>{err}</p>;
  if(!pack)return <p style={{color:"var(--gray4)"}}>Loading...</p>;
  const t=pack.tool||{};
  const d=pack.diagnosis||{};
  const e=pack.execution||{};
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <button onClick={()=>go("tools")} style={{alignSelf:"flex-start",background:"none",border:"none",color:"var(--gray4)",cursor:"pointer",fontSize:12}}>← Tools</button>
      <div style={{display:"flex",alignItems:"baseline",gap:12,flexWrap:"wrap"}}>
        <p style={{fontSize:18,fontWeight:600,fontFamily:"DM Mono,monospace"}}>{t.name}</p>
        <p style={{fontSize:12,color:pack.availability==="down"?"var(--red)":"var(--green)"}}>{pack.availability||"ok"}</p>
      </div>
      {err&&<p style={{fontSize:12,color:"var(--red)"}}>{err}</p>}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Card k="What failed?" v={d.what_failed?`${d.what_failed.type}: ${d.what_failed.name}`:"Nothing recent"} red={!!d.what_failed} />
        <Card k="Why?" v={d.why?.error_type?`${d.why.error_type}${d.why.retries_fired?" · retries fired":""}${d.why.child_tool_timeout?" · tool timeout":""}`:"—"} />
        <Card k="What did it affect?" v={(pack.workflows||[]).map(w=>w.name).join(", ")||"—"} />
        <Card k="How much did it cost?" v={`${f$(pack.stats?.failed_cost)} failed · ${f$(pack.stats?.retry_cost)} retry waste`} red />
      </div>
      {e.id&&<p style={{fontSize:12,color:"var(--gray4)"}}>Latest fail: {e.workflow_name} · {e.status} · {fMs(e.duration_ms)}</p>}
      {e.id&&<button onClick={()=>go("execution",e.id)} style={{alignSelf:"flex-start",padding:"6px 12px",border:"1px solid var(--gray2)",borderRadius:6,background:"var(--white)",fontSize:12,cursor:"pointer"}}>Open execution</button>}
      <RecoveryCard diagnosis={d} recovery={pack.recovery} onRecover={e.id?recover:null} recovering={saving} />
    </div>
  );
}

function Card({k,v,red}){
  return(
    <div style={{background:"var(--white)",border:"1px solid "+(red?"var(--red-border)":"var(--gray2)"),borderRadius:10,padding:18}}>
      <p style={{fontSize:10,fontFamily:"DM Mono,monospace",color:"var(--gray4)",letterSpacing:".06em",marginBottom:8}}>{k}</p>
      <p style={{fontSize:15,fontWeight:600,color:red?"var(--red)":"var(--ink)"}}>{v}</p>
    </div>
  );
}
