import { fMs, f$ } from "../format";
import { Dot } from "./ui";

export function Tree({steps=[], leaves=[], failedId, bottleneckId}){
  const byStep={};
  for(const l of leaves){
    const k=l.step_id||"_";
    if(!byStep[k])byStep[k]=[];
    byStep[k].push(l);
  }

  const ordered=[...steps].sort((a,b)=>new Date(a.started_at||0)-new Date(b.started_at||0));
  const ids=new Set(ordered.map(s=>s.id));
  const children=new Map();
  const roots=[];
  for(const st of ordered){
    if(st.parent_step_id && ids.has(st.parent_step_id)){
      if(!children.has(st.parent_step_id))children.set(st.parent_step_id,[]);
      children.get(st.parent_step_id).push(st);
    }else{
      roots.push(st);
    }
  }

  function Node({st, depth}){
    const cascade=st.status==="cascade";
    const failed=st.status==="fail"||st.id===failedId;
    const bottleneck=st.id===bottleneckId;
    const border=failed?"var(--red-border)":cascade?"var(--amber-border)":bottleneck?"var(--amber-border)":"var(--gray2)";
    const bg=failed?"var(--red-bg)":cascade?"var(--amber-bg)":"var(--white)";
    const color=failed?"var(--red)":cascade?"var(--amber)":"var(--green)";
    return(
      <>
        <div style={{marginLeft:depth?depth*16:0,border:"1px solid "+border,borderRadius:10,padding:"14px 16px",background:bg}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Dot color={color} />
              <span style={{fontSize:13,fontWeight:600,fontFamily:"DM Mono,monospace"}}>{st.name}</span>
              {cascade&&<span style={{fontSize:10,color:"var(--amber)"}}>cascade</span>}
              {bottleneck&&<span style={{fontSize:10,color:"var(--amber)"}}>bottleneck</span>}
            </div>
            <span style={{fontSize:12,color:failed?"var(--red)":"var(--gray4)"}}>{fMs(st.duration_ms)} · {f$(st.failed_cost||0)}</span>
          </div>
          {(byStep[st.id]||[]).map(l=>(
            <p key={l.id} style={{fontSize:11,fontFamily:"DM Mono,monospace",color:l.status==="fail"?"var(--red)":"var(--gray4)",padding:"4px 0 4px 14px"}}>
              {l.endpoint} · {l.status}{l.attempt>1?` · retry ${l.attempt}`:""}{l.error_type?` · ${l.error_type}`:""} · {f$(l.price)}
            </p>
          ))}
        </div>
        {(children.get(st.id)||[]).map(ch=><Node key={ch.id} st={ch} depth={depth+1} />)}
      </>
    );
  }

  return(
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {roots.map(st=><Node key={st.id} st={st} depth={0} />)}
    </div>
  );
}
