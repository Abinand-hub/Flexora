import { useState } from "react";
import { f$, fNum, fMs } from "../format";
import { Dot } from "../components/ui";

export function Logs({data}){
  const[filter,setFilter]=useState("all");
  const[wf,setWf]=useState("");
  const all=data.logs||[];
  const workflows=[...new Set(all.map(l=>l.workflow).filter(Boolean))];
  const rows=all.filter(l=>{
    if(filter!=="all"&&l.status!==filter)return false;
    if(wf&&l.workflow!==wf&&l.endpoint!==wf)return false;
    return true;
  }).slice(0,200);
  return(
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
        {["all","fail","success"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{padding:"5px 14px",background:filter===f?"var(--white)":"transparent",border:"1px solid "+(filter===f?"var(--gray2)":"transparent"),borderRadius:6,fontSize:12,cursor:"pointer"}}>{f}</button>
        ))}
        {workflows.length>0&&(
          <select value={wf} onChange={e=>setWf(e.target.value)} style={{marginLeft:8,padding:"5px 8px",border:"1px solid var(--gray2)",borderRadius:6,fontSize:12}}>
            <option value="">All workflows/tools</option>
            {workflows.map(w=><option key={w} value={w}>{w}</option>)}
          </select>
        )}
        <p style={{marginLeft:"auto",fontSize:12,color:"var(--gray4)",fontFamily:"DM Mono,monospace"}}>{fNum(rows.length)} rows</p>
      </div>
      <div style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:10,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"1.5fr 1.5fr .8fr .8fr .8fr",padding:"10px 20px",background:"var(--gray1)"}}>
          {["Request ID","Endpoint","Status","Latency","Cost"].map(h=><p key={h} style={{fontSize:11,color:"var(--gray4)"}}>{h}</p>)}
        </div>
        <div style={{maxHeight:500,overflowY:"auto"}}>
          {rows.length===0?<p style={{padding:32,textAlign:"center",color:"var(--gray3)"}}>No logs yet.</p>:rows.map((log,i)=>(
            <div key={log.id+i} style={{display:"grid",gridTemplateColumns:"1.5fr 1.5fr .8fr .8fr .8fr",padding:"10px 20px",borderBottom:"1px solid var(--gray2)",alignItems:"center"}}>
              <p style={{fontSize:11,fontFamily:"DM Mono,monospace",color:"var(--gray3)"}}>{log.id}</p>
              <p style={{fontSize:11,fontFamily:"DM Mono,monospace"}}>{log.endpoint}</p>
              <div style={{display:"flex",alignItems:"center",gap:5}}><Dot color={log.status==="fail"?"var(--red)":"var(--green)"} /><span style={{fontSize:11,color:log.status==="fail"?"var(--red)":"var(--green)"}}>{log.status}</span></div>
              <p style={{fontSize:11,fontFamily:"DM Mono,monospace"}}>{fMs(log.latency)}</p>
              <p style={{fontSize:11,fontFamily:"DM Mono,monospace",color:log.status==="fail"?"var(--red)":"var(--gray3)"}}>{log.status==="fail"?"-"+f$(log.price):"—"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
