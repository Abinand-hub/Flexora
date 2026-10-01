import { useEffect, useState } from "react";
import { apiGet } from "../api";
import { f$, fMs } from "../format";
import { Dot } from "../components/ui";

export function groupByWorkflow(rows){
  const map=new Map();
  for(const r of rows||[]){
    const k=r.workflow_name||"unknown";
    if(!map.has(k))map.set(k,[]);
    map.get(k).push(r);
  }
  return [...map.entries()];
}

function checkupLine(e){
  if(e.status==="success")return "Clean run";
  const step=e.failed_step||"unknown step";
  const err=e.error_type?` · ${e.error_type}`:"";
  const rec=e.recovery_action?` → ${String(e.recovery_action).replace(/_/g," ")}`:"";
  return `${step}${err}${rec}`;
}

export function Executions({apiKey,isDemo,go,workflow="",grouped=false}){
  const[rows,setRows]=useState([]);
  const[err,setErr]=useState("");
  const[status,setStatus]=useState("");
  const[loading,setLoading]=useState(!isDemo&&!!apiKey);
  useEffect(()=>{
    if(isDemo||!apiKey){setRows([]);setLoading(false);return;}
    setLoading(true);setErr("");
    const p=new URLSearchParams();
    if(status)p.set("status",status);
    if(workflow)p.set("workflow",workflow);
    const q=p.toString()?`?${p}`:"";
    apiGet("/api/executions"+q,apiKey).then(async r=>{
      if(!r.ok)throw new Error("Couldn't load executions");
      const j=await r.json();
      setRows(j.executions||[]);
    }).catch(e=>setErr(e.message)).finally(()=>setLoading(false));
  },[apiKey,isDemo,status,workflow]);
  if(isDemo)return <p style={{color:"var(--gray4)"}}>{grouped?"Sign in with an API key to see checkup history.":"Sign in with an API key to inspect real executions."}</p>;
  if(err)return <p style={{color:"var(--red)"}}>{err}</p>;
  if(loading)return <p style={{color:"var(--gray4)"}}>Loading...</p>;
  const groups=grouped?groupByWorkflow(rows):[["",rows]];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
        {["","success","partial","failed"].map(s=>(
          <button key={s||"all"} onClick={()=>setStatus(s)} style={{padding:"5px 12px",border:"1px solid var(--gray2)",borderRadius:6,background:status===s?"var(--gray1)":"var(--white)",color:"var(--ink)",fontSize:12,cursor:"pointer"}}>{s||"all"}</button>
        ))}
        {workflow&&<button onClick={()=>go("history")} style={{padding:"5px 12px",border:"1px solid var(--gray2)",borderRadius:6,background:"var(--white)",color:"var(--ink)",fontSize:12,cursor:"pointer"}}>All workflows</button>}
      </div>
      {!rows.length?<p style={{color:"var(--gray4)"}}>{grouped?"No checkups yet. Run a workflow or node db/seed-intelligence.js":"No executions. Run node db/seed-intelligence.js"}</p>:
      groups.map(([name,list])=>(
        <div key={name||"flat"}>
          {grouped&&<p style={{fontSize:13,fontWeight:600,fontFamily:"DM Mono,monospace",marginBottom:8}}>{name} <span style={{fontWeight:400,color:"var(--gray4)",fontFamily:"Inter,sans-serif"}}>{list.length} {list.length===1?"checkup":"checkups"}</span></p>}
          <div style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:10,overflow:"hidden"}}>
            {list.map(e=>(
              <button key={e.id} onClick={()=>go("execution",e.id)} style={{width:"100%",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,padding:"14px 20px",border:"none",borderBottom:"1px solid var(--gray2)",background:"transparent",cursor:"pointer"}}>
                <div style={{minWidth:0}}>
                  {!grouped&&<p style={{fontSize:13,fontWeight:600,fontFamily:"DM Mono,monospace"}}>{e.workflow_name}</p>}
                  <p style={{fontSize:grouped?13:11,fontWeight:grouped?500:400,color:grouped?"var(--ink)":"var(--gray3)"}}>{new Date(e.started_at).toLocaleString()}</p>
                  {grouped&&<p style={{fontSize:12,color:e.status==="success"?"var(--gray4)":"var(--gray5)",marginTop:2}}>{checkupLine(e)}</p>}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:14,flexShrink:0}}>
                  <span style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"var(--ink)"}}><Dot color={e.status==="success"?"var(--green)":e.status==="partial"?"var(--amber)":"var(--red)"} />{e.status}</span>
                  {!grouped&&<span style={{fontSize:12,color:"var(--gray5)"}}>{fMs(e.duration_ms)}</span>}
                  <span style={{fontSize:13,fontWeight:600,color:parseFloat(e.failed_cost)>0?"var(--red)":"var(--gray4)",minWidth:52,textAlign:"right"}}>{f$(e.failed_cost)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
