import { f$, fPct, fNum, fMs, useIsMobile } from "../format";
import { Pill, Dot, BarLine } from "../components/ui";

const PERIOD_LABELS={"24h":"LAST 24H","7d":"LAST 7D","30d":"LAST 30D"};
const PERIOD_DAYS={"24h":1,"7d":7,"30d":30};

export function Overview({data,period,go}){
  const{totalLost,totalFailed,totalRequests,failRate,avgLatency,endpoints,spark,impact}=data;
  const periodLabel=PERIOD_LABELS[period]||"LAST 24H";
  const periodDays=PERIOD_DAYS[period]||1;
  const dailyRate=totalLost/periodDays;
  const maxLost=endpoints[0]?.lost||1;
  const isMobile=useIsMobile();
  return(
    <div style={{display:"flex",flexDirection:"column",gap:24}}>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:14}}>
        <div style={{background:"var(--white)",border:"1px solid var(--red-border)",borderRadius:12,padding:"32px 32px 28px"}}>
          <p style={{fontSize:11,fontWeight:500,color:"var(--red)",letterSpacing:".08em",fontFamily:"DM Mono,monospace",marginBottom:16}}>FAILED API COST · {periodLabel}</p>
          <div style={{fontSize:64,fontWeight:600,color:"var(--red)",letterSpacing:"-.04em",lineHeight:1}}>{f$(totalLost)}</div>
          <p style={{fontSize:12,color:"var(--gray4)",marginTop:16}}><span style={{fontFamily:"DM Mono,monospace",color:"var(--ink)",fontWeight:500}}>{fNum(totalFailed)}</span> failed requests</p>
        </div>
        <div style={{background:"var(--white)",border:"1px solid var(--amber-border)",borderRadius:12,padding:"32px 32px 28px"}}>
          <p style={{fontSize:11,fontWeight:500,color:"var(--amber)",letterSpacing:".08em",fontFamily:"DM Mono,monospace",marginBottom:16}}>EST. REVENUE AT RISK · {periodLabel}</p>
          {impact.configured?(<>
            <div style={{fontSize:64,fontWeight:600,color:"var(--amber)",letterSpacing:"-.04em",lineHeight:1}}>{f$(impact.revenueAtRisk)}</div>
            <p style={{fontSize:12,color:"var(--gray4)",marginTop:16}}>~{fNum(impact.usersAffected)} users · {impact.abandonmentRate}% abandonment</p>
          </>):(<>
            <div style={{fontSize:22,fontWeight:600,color:"var(--gray4)",marginBottom:12}}>Not configured yet</div>
            <button onClick={()=>go&&go("settings")} style={{padding:"7px 14px",background:"var(--ink)",color:"#fff",border:"none",borderRadius:7,fontSize:12,cursor:"pointer"}}>Configure in Settings →</button>
          </>)}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)",gap:12}}>
        {[
          {label:"Failure Rate",value:fPct(failRate),color:failRate>20?"var(--red)":"var(--ink)"},
          {label:"Avg Latency",value:fMs(avgLatency)},
          {label:"Total Requests",value:fNum(totalRequests)},
          {label:"Monthly Projection",value:f$(dailyRate*30),color:"var(--red)"},
        ].map(s=>(
          <div key={s.label} style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:10,padding:"16px 18px"}}>
            <p style={{fontSize:10,color:"var(--gray4)",fontFamily:"DM Mono,monospace",marginBottom:10}}>{s.label.toUpperCase()}</p>
            <p style={{fontSize:22,fontWeight:600,color:s.color||"var(--ink)"}}>{s.value}</p>
          </div>
        ))}
      </div>
      <div style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:10,overflow:"hidden"}}>
        <div style={{padding:"14px 20px",borderBottom:"1px solid var(--gray2)",display:"flex",justifyContent:"space-between"}}>
          <p style={{fontSize:12,fontWeight:600}}>Leaking Endpoints</p>
          <Pill>{periodLabel}</Pill>
        </div>
        {endpoints.slice(0,5).map((ep,i)=>(
          <div key={ep.name} style={{padding:"13px 20px",borderBottom:"1px solid var(--gray2)",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:12,alignItems:"center"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>{i===0&&<Dot active color="var(--red)" />}<span style={{fontSize:12,fontFamily:"DM Mono,monospace"}}>{ep.name}</span></div>
              <BarLine value={ep.lost} max={maxLost} color={i===0?"var(--red)":"var(--gray3)"} />
            </div>
            <p style={{fontSize:12,fontFamily:"DM Mono,monospace"}}>{fNum(ep.failed)} failed</p>
            <p style={{fontSize:12,fontFamily:"DM Mono,monospace",color:ep.rate>20?"var(--red)":"var(--amber)"}}>{fPct(ep.rate)}</p>
            <p style={{fontSize:15,fontWeight:600,color:"var(--red)",textAlign:"right"}}>{f$(ep.lost)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
