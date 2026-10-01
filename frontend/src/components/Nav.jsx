import { useIsMobile } from "../format";

export function Nav({route,go,hasSession,onViewDemo,onSignIn,onSignUp}){
  const links=[{id:"what",label:"What it is"},{id:"how",label:"How it works"},{id:"why",label:"Why it matters"}];
  const isMobile=useIsMobile();
  const btn={padding:isMobile?"7px 12px":"7px 14px",borderRadius:7,fontSize:12,fontWeight:500,cursor:"pointer",whiteSpace:"nowrap",border:"1px solid var(--gray2)",background:"var(--white)",color:"var(--ink)"};
  return(
    <header style={{position:"sticky",top:0,zIndex:50,background:"rgba(250,250,250,.85)",backdropFilter:"blur(10px)",borderBottom:"1px solid var(--gray2)"}}>
      <div style={{maxWidth:1080,margin:"0 auto",padding:isMobile?"12px 16px":"14px 28px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={()=>go("what")} style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer"}}>
          <div style={{width:26,height:26,background:"var(--ink)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{color:"var(--red)",fontSize:10,fontWeight:600,fontFamily:"DM Mono,monospace"}}>fx</span>
          </div>
          {!isMobile&&<span style={{fontSize:13,fontWeight:600,color:"var(--ink)",letterSpacing:"-.01em"}}>Fluxera</span>}
        </button>
        <nav style={{display:"flex",alignItems:"center",gap:4,flexWrap:"wrap",justifyContent:"flex-end"}}>
          {!isMobile&&links.map(l=>(
            <button key={l.id} onClick={()=>go(l.id)} style={{padding:"6px 12px",background:route===l.id?"var(--gray1)":"transparent",border:"none",borderRadius:6,color:route===l.id?"var(--ink)":"var(--gray4)",fontSize:12,fontWeight:route===l.id?500:400,cursor:"pointer"}}>{l.label}</button>
          ))}
          {hasSession
            ?<button onClick={()=>go("overview")} style={{...btn,marginLeft:isMobile?0:6,background:"var(--ink)",color:"var(--white)",border:"none"}}>Open dashboard</button>
            :<>
              <button onClick={onSignIn} style={btn}>Sign in</button>
              <button onClick={onViewDemo} style={btn}>View demo</button>
              <button onClick={onSignUp} style={{...btn,background:"var(--ink)",color:"var(--white)",border:"none"}}>Sign up</button>
            </>}
        </nav>
      </div>
    </header>
  );
}
