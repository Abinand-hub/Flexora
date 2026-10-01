export function Dot({active=false,color="var(--red)"}){
  return <span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:color,flexShrink:0,animation:active?"blink 1.4s infinite":"none"}} />;
}
export function Pill({children,color="var(--gray4)"}){
  return <span style={{fontSize:10,fontFamily:"DM Mono,monospace",color,letterSpacing:".08em",padding:"2px 8px",border:"1px solid var(--gray2)",borderRadius:20,background:"var(--white)"}}>{children}</span>;
}
export function BarLine({value,max,color="var(--red)"}){
  const w=Math.min((value/(max||1))*100,100);
  return <div style={{height:2,background:"var(--gray2)",borderRadius:1,overflow:"hidden",marginTop:6}}><div style={{width:w+"%",height:"100%",background:color,transition:"width .7s ease"}} /></div>;
}
