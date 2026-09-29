export function RecoveryCard({diagnosis, recovery, onRecover, recovering}){
  const rec=diagnosis?.recover;
  if(!rec||rec.action==="none"){
    return <div style={{background:"var(--green-bg)",border:"1px solid var(--green-border)",borderRadius:10,padding:20}}><p style={{fontSize:13,color:"var(--green)"}}>No recovery needed.</p></div>;
  }
  const verified=!!recovery?.verified_at;
  const executed=recovery?.kind==="executed";
  return(
    <div style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:10,padding:20,display:"flex",flexDirection:"column",gap:12}}>
      <p style={{fontSize:10,fontFamily:"DM Mono,monospace",color:"var(--gray4)",letterSpacing:".06em"}}>HOW TO RECOVER</p>
      <p style={{fontSize:16,fontWeight:600,textTransform:"capitalize"}}>{rec.action.replace("_"," ")}</p>
      <p style={{fontSize:13,color:"var(--gray5)",lineHeight:1.5}}>{rec.reason}</p>
      {verified&&<p style={{fontSize:12,color:"var(--green)"}}>Verified — a later run of this workflow succeeded.</p>}
      {!verified&&executed&&<p style={{fontSize:12,color:"var(--amber)"}}>Webhook sent. Still failing until a later success.</p>}
      {onRecover&&!verified&&(
        <button onClick={onRecover} disabled={recovering} style={{alignSelf:"flex-start",padding:"8px 14px",background:"var(--ink)",color:"#fff",border:"none",borderRadius:7,fontSize:12,cursor:recovering?"not-allowed":"pointer"}}>
          {recovering?"Recovering…":"Recover"}
        </button>
      )}
      <p style={{fontSize:11,color:"var(--gray3)"}}>Invokes your recovery webhook. Fluxera does not retry the in-flight request.</p>
    </div>
  );
}
