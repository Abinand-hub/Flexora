import { useEffect, useState } from "react";
import { apiGet } from "../api";
import { f$, fPct, fNum } from "../format";

export function Tools({apiKey,isDemo,go}){
  const[rows,setRows]=useState([]);
  const[err,setErr]=useState("");
  const[loading,setLoading]=useState(!isDemo&&!!apiKey);
  useEffect(()=>{
    if(isDemo||!apiKey){setRows([]);setLoading(false);return;}
    setLoading(true);
    apiGet("/api/tools",apiKey).then(async r=>{
      if(!r.ok)throw new Error("Couldn't load tools");
      const j=await r.json();
      setRows(j.tools||[]);
    }).catch(e=>setErr(e.message)).finally(()=>setLoading(false));
  },[apiKey,isDemo]);
  if(isDemo)return <p style={{color:"var(--gray4)"}}>Sign in with an API key to see tool intelligence.</p>;
  if(err)return <p style={{color:"var(--red)"}}>{err}</p>;
  if(loading)return <p style={{color:"var(--gray4)"}}>Loading...</p>;
  if(!rows.length)return <p style={{color:"var(--gray4)"}}>No tools registered yet.</p>;
  return(
    <div style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:10,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr",padding:"11px 20px",background:"var(--gray1)"}}>
        {["Tool","Calls","Failure rate","Failed cost","Retry waste","Status"].map(h=><p key={h} style={{fontSize:11,color:"var(--gray4)"}}>{h}</p>)}
      </div>
      {rows.map(t=>(
        <button key={t.id} type="button" onClick={()=>go&&go("tool",t.id)} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr",padding:"14px 20px",border:"none",borderBottom:"1px solid var(--gray2)",alignItems:"center",width:"100%",textAlign:"left",background:"transparent",cursor:go?"pointer":"default"}}>
          <p style={{fontSize:13,fontWeight:600,fontFamily:"DM Mono,monospace"}}>{t.name}</p>
          <p style={{fontSize:12}}>{fNum(t.calls)}</p>
          <p style={{fontSize:12,color:parseFloat(t.failure_rate)>10?"var(--red)":"var(--gray5)"}}>{fPct(t.failure_rate)}</p>
          <p style={{fontSize:13,fontWeight:600,color:"var(--red)"}}>{f$(t.failed_cost)}</p>
          <p style={{fontSize:12,color:"var(--amber)"}}>{f$(t.retry_cost)}</p>
          <p style={{fontSize:12,color:t.availability==="down"?"var(--red)":t.still_failing?"var(--amber)":"var(--green)"}}>{t.availability==="down"?"down":t.still_failing?"still failing":"ok"}{t.recurring_failed?` · ${fNum(t.recurring_failed)}`:""}</p>
        </button>
      ))}
    </div>
  );
}
