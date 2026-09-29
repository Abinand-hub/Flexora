import { useEffect, useState } from "react";
import { apiGet } from "../api";
import { f$, fPct, fNum } from "../format";

export function Workflows({apiKey,isDemo,go}){
  const[rows,setRows]=useState([]);
  const[err,setErr]=useState("");
  const[loading,setLoading]=useState(!isDemo&&!!apiKey);
  useEffect(()=>{
    if(isDemo||!apiKey){setRows([]);setLoading(false);return;}
    setLoading(true);
    apiGet("/api/workflows",apiKey).then(async r=>{
      if(!r.ok)throw new Error("Couldn't load workflows");
      const j=await r.json();
      setRows(j.workflows||[]);
    }).catch(e=>setErr(e.message)).finally(()=>setLoading(false));
  },[apiKey,isDemo]);
  if(isDemo)return <p style={{color:"var(--gray4)"}}>Sign in with an API key to see real workflows. Demo mode is leak-lens only.</p>;
  if(err)return <p style={{color:"var(--red)"}}>{err}</p>;
  if(loading)return <p style={{color:"var(--gray4)"}}>Loading...</p>;
  if(!rows.length)return <p style={{color:"var(--gray4)"}}>No workflows yet. Wrap calls with fluxera.workflow() or run node db/seed-intelligence.js</p>;
  return(
    <div style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:10,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr auto auto",padding:"11px 20px",background:"var(--gray1)",alignItems:"center",gap:8}}>
        {["Workflow","Executions","Failure rate","Failed cost","Retry waste"].map(h=><p key={h} style={{fontSize:11,color:"var(--gray4)"}}>{h}</p>)}
        <p style={{fontSize:11,color:"var(--gray4)"}}>24h</p>
        <p style={{fontSize:11,color:"var(--gray4)"}}>Checkups</p>
      </div>
      {rows.map(w=>(
        <div key={w.id} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr auto auto",padding:"14px 20px",borderBottom:"1px solid var(--gray2)",alignItems:"center",gap:8}}>
          <p style={{fontSize:13,fontWeight:600,fontFamily:"DM Mono,monospace"}}>{w.name}</p>
          <p style={{fontSize:12}}>{fNum(w.executions)}</p>
          <p style={{fontSize:12,color:parseFloat(w.failure_rate)>0?"var(--red)":"var(--gray5)"}}>{fPct(w.failure_rate)}</p>
          <p style={{fontSize:13,fontWeight:600,color:"var(--red)"}}>{f$(w.failed_cost)}</p>
          <p style={{fontSize:12,color:"var(--amber)"}}>{f$(w.retry_cost)}</p>
          <p style={{fontSize:11,color:w.still_failing?"var(--red)":"var(--gray4)"}}>{fNum(w.recurring_failed)}{w.still_failing?" · still failing":""}</p>
          <button onClick={()=>go("history",w.name)} style={{padding:"5px 10px",border:"1px solid var(--gray2)",borderRadius:6,background:"var(--white)",fontSize:11,cursor:"pointer",whiteSpace:"nowrap"}}>History</button>
        </div>
      ))}
    </div>
  );
}
