import { useIsMobile } from "../format";
import { Pill, Dot } from "./ui";

export function ProductShell({children,page,go,company,isDemo,live,setLive,period,setPeriod,onLogout}){
  const nav=[
    {id:"overview",label:"Overview"},
    {id:"workflows",label:"Workflows"},
    {id:"tools",label:"Tools"},
    {id:"executions",label:"Executions"},
    {id:"logs",label:"Logs"},
    {id:"settings",label:"Settings"},
  ];
  const isMobile=useIsMobile();
  const title=nav.find(n=>n.id===page)?.label || (page==="execution"?"Execution":page==="history"?"History":page==="tool"?"Tool":page);
  const showHistory=page!=="settings";
  return(
    <div style={{display:"flex",flexDirection:isMobile?"column":"row",minHeight:"calc(100vh - 57px)",background:"var(--bg)"}}>
      <aside style={isMobile
        ?{width:"100%",background:"var(--white)",borderBottom:"1px solid var(--gray2)",display:"flex",flexDirection:"column"}
        :{width:200,background:"var(--white)",borderRight:"1px solid var(--gray2)",display:"flex",flexDirection:"column",flexShrink:0}}>
        {!isMobile&&(
          <div style={{padding:"16px 20px 14px",borderBottom:"1px solid var(--gray2)"}}>
            <p style={{fontSize:10,fontWeight:500,color:"var(--gray3)",letterSpacing:".06em",marginBottom:2}}>WORKSPACE</p>
            <p style={{fontSize:12,fontWeight:500,color:"var(--ink)",textTransform:"capitalize",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{company}</p>
            {isDemo&&<span style={{display:"inline-block",marginTop:4}}><Pill>DEMO</Pill></span>}
          </div>
        )}
        <nav style={isMobile
          ?{padding:"8px 10px",display:"flex",gap:4,overflowX:"auto"}
          :{padding:"10px",flex:1}}>
          {nav.map(n=>{
            const on=page===n.id||(page==="execution"&&n.id==="executions")||(page==="tool"&&n.id==="tools");
            return(
            <button key={n.id} onClick={()=>go(n.id)} style={{width:isMobile?"auto":"100%",whiteSpace:"nowrap",display:"flex",alignItems:"center",padding:"8px 10px",background:on?"var(--gray1)":"transparent",border:"none",borderRadius:6,color:on?"var(--ink)":"var(--gray4)",fontSize:12,fontWeight:on?500:400,cursor:"pointer",marginBottom:isMobile?0:1,textAlign:"left"}}>{n.label}</button>
            );
          })}
        </nav>
        <div style={isMobile
          ?{padding:"8px 10px",borderTop:"1px solid var(--gray2)",display:"flex",gap:8,overflowX:"auto"}
          :{padding:"14px 20px",borderTop:"1px solid var(--gray2)",display:"flex",flexDirection:"column",gap:8}}>
          {isDemo&&(
            <button onClick={()=>setLive(!live)} style={{display:"flex",alignItems:"center",gap:7,padding:"7px 10px",background:live?"var(--red-bg)":"var(--gray1)",border:"1px solid "+(live?"var(--red-border)":"var(--gray2)"),borderRadius:6,fontSize:11,color:live?"var(--red)":"var(--gray4)",cursor:"pointer",fontFamily:"DM Mono,monospace",letterSpacing:".05em",whiteSpace:"nowrap"}}>
              <Dot active={live} color={live?"var(--red)":"var(--gray3)"} />{live?"SIMULATING":"STATIC"}
            </button>
          )}
          <button onClick={onLogout} style={{padding:"7px 10px",background:"transparent",border:"1px solid var(--gray2)",borderRadius:6,color:"var(--gray4)",fontSize:11,cursor:"pointer",textAlign:"left",whiteSpace:"nowrap"}}>Sign out</button>
        </div>
      </aside>
      <main style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
        <div style={{padding:isMobile?"10px 14px":"12px 28px",borderBottom:"1px solid var(--gray2)",display:"flex",flexDirection:isMobile?"column":"row",gap:isMobile?8:0,alignItems:isMobile?"stretch":"center",justifyContent:"space-between",background:"var(--white)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:14,fontWeight:600,letterSpacing:"-.01em"}}>{title}</span>
            {live&&isDemo&&<div style={{display:"flex",alignItems:"center",gap:5,fontSize:10,fontFamily:"DM Mono,monospace",color:"var(--red)",padding:"2px 8px",background:"var(--red-bg)",border:"1px solid var(--red-border)",borderRadius:20}}><Dot active color="var(--red)" />SIMULATED</div>}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            {showHistory&&(
              <button onClick={()=>go("history")} style={{padding:"5px 12px",border:"1px solid "+(page==="history"?"var(--ink)":"var(--gray2)"),borderRadius:6,background:page==="history"?"var(--gray1)":"var(--white)",color:"var(--ink)",fontSize:12,fontWeight:page==="history"?500:400,cursor:"pointer"}}>History</button>
            )}
            {["overview","logs"].includes(page)&&(
              <div style={{display:"flex",border:"1px solid var(--gray2)",borderRadius:7,overflow:"hidden",alignSelf:isMobile?"flex-start":"auto"}}>
                {["24h","7d","30d"].map(p=>(
                  <button key={p} onClick={()=>setPeriod(p)} style={{padding:"5px 14px",background:period===p?"var(--gray1)":"var(--white)",border:"none",borderRight:p!=="30d"?"1px solid var(--gray2)":"none",color:period===p?"var(--ink)":"var(--gray4)",fontSize:12,fontWeight:period===p?500:400,cursor:"pointer"}}>{p}</button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div style={{flex:1,padding:isMobile?"16px 14px 24px":"28px 28px 40px",overflowX:"auto"}}>{children}</div>
      </main>
    </div>
  );
}
