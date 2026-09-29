import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../api";
import { f$, fMs } from "../format";
import { Tree } from "../components/Tree";
import { RecoveryCard } from "../components/RecoveryCard";

export function ExecutionDetail({apiKey,executionId,go}){
  const[pack,setPack]=useState(null);
  const[err,setErr]=useState("");
  const[saving,setSaving]=useState(false);

  function load(){
    if(!apiKey||!executionId)return;
    apiGet("/api/executions/"+executionId,apiKey).then(async r=>{
      if(!r.ok)throw new Error("Couldn't load execution");
      setPack(await r.json());
    }).catch(e=>setErr(e.message));
  }

  useEffect(()=>{load();},[apiKey,executionId]);

  async function recover(){
    setSaving(true);setErr("");
    try{
      const r=await apiPost("/api/executions/"+executionId+"/recover",apiKey,{});
      const j=await r.json().catch(()=>({}));
      if(!r.ok)throw new Error(j.error||"Couldn't recover");
      await load();
    }catch(e){setErr(e.message);}
    setSaving(false);
  }

  if(!pack && err)return <p style={{color:"var(--red)"}}>{err}</p>;
  if(!pack)return <p style={{color:"var(--gray4)"}}>Loading...</p>;
  const d=pack.diagnosis||{};
  const e=pack.execution||{};
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <button onClick={()=>go("executions")} style={{alignSelf:"flex-start",background:"none",border:"none",color:"var(--gray4)",cursor:"pointer",fontSize:12}}>← Executions</button>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Card k="What failed?" v={d.what_failed?`${d.what_failed.type}: ${d.what_failed.name}`:"Nothing"} red={!!d.what_failed} />
        <Card k="Why?" v={d.why?.error_type?`${d.why.error_type}${d.why.retries_fired?" · retries fired":""}${d.why.child_tool_timeout?" · tool timeout":""}`:"—"} />
        <Card k="What did it affect?" v={affectLine(d.affected, e)} />
        <Card k="How much did it cost?" v={`${f$(d.cost?.failed)} failed · ${f$(d.cost?.retry_wasted)} retry waste`} red />
      </div>
      {err&&<p style={{fontSize:12,color:"var(--red)"}}>{err}</p>}
      <p style={{fontSize:12,color:"var(--gray4)"}}>{e.status} · {fMs(e.duration_ms)} · started {e.started_at?new Date(e.started_at).toLocaleString():"—"}{d.bottleneck?` · bottleneck ${d.bottleneck.name}`:""}</p>
      <Tree steps={pack.steps||[]} leaves={pack.leaves||[]} failedId={d.what_failed?.id} bottleneckId={d.bottleneck?.id} />
      <RecoveryCard diagnosis={d} recovery={pack.recovery} onRecover={recover} recovering={saving} />
    </div>
  );
}

function affectLine(affected, execution){
  const a=affected||{};
  const bits=[`${a.workflow||execution.workflow_name||"—"} · ${a.executions||1} execution`];
  if(a.users_affected!=null)bits.push(`~${a.users_affected} users est.`);
  if(a.revenue_at_risk!=null)bits.push(`${f$(a.revenue_at_risk)} at risk`);
  return bits.join(" · ");
}

function Card({k,v,red}){
  return(
    <div style={{background:"var(--white)",border:"1px solid "+(red?"var(--red-border)":"var(--gray2)"),borderRadius:10,padding:18}}>
      <p style={{fontSize:10,fontFamily:"DM Mono,monospace",color:"var(--gray4)",letterSpacing:".06em",marginBottom:8}}>{k}</p>
      <p style={{fontSize:15,fontWeight:600,color:red?"var(--red)":"var(--ink)"}}>{v}</p>
    </div>
  );
}
