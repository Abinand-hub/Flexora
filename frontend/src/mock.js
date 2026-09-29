export function mock() {
  const eps=[{n:"/v1/chat/completions",w:.38,p:.06},{n:"/v1/completions",w:.28,p:.04},{n:"/v1/embeddings",w:.18,p:.01},{n:"/v1/images/generate",w:.10,p:.08},{n:"/v1/audio/transcribe",w:.06,p:.03}];
  const errs=["timeout","rate_limit","server_error","context_length"];
  const logs=[];
  for(let i=0;i<800;i++){
    let acc=0,ep=eps[0];const r=Math.random();
    for(const e of eps){acc+=e.w;if(r<=acc){ep=e;break;}}
    const fail=Math.random()<.17;
    logs.push({id:"req_"+Math.random().toString(36).slice(2,9),endpoint:ep.n,status:fail?"fail":"success",latency:fail?Math.round(900+Math.random()*5100):Math.round(60+Math.random()*340),price:ep.p*(0.85+Math.random()*.3),error:fail?errs[Math.floor(Math.random()*4)]:null,ts:new Date(Date.now()-Math.random()*86400000)});
  }
  const failed=logs.filter(l=>l.status==="fail");
  const totalLost=failed.reduce((s,l)=>s+l.price,0);
  const byEp={};
  for(const l of logs){
    if(!byEp[l.endpoint])byEp[l.endpoint]={total:0,failed:0,lost:0,lats:[]};
    byEp[l.endpoint].total++;byEp[l.endpoint].lats.push(l.latency);
    if(l.status==="fail"){byEp[l.endpoint].failed++;byEp[l.endpoint].lost+=l.price;}
  }
  const endpoints=Object.entries(byEp).map(([name,s])=>({name,total:s.total,failed:s.failed,rate:(s.failed/s.total)*100,lost:s.lost,avgLatency:Math.round(s.lats.reduce((a,b)=>a+b,0)/s.lats.length)})).sort((a,b)=>b.lost-a.lost);
  const totalFailed=failed.length;
  const abandonmentRate=40, avgOrderValue=85;
  const usersAffected=Math.round(totalFailed*(abandonmentRate/100));
  const revenueAtRisk=Math.round(usersAffected*avgOrderValue*100)/100;
  return{
    logs:logs.sort((a,b)=>b.ts-a.ts),
    totalLost,totalFailed,totalRequests:800,
    failRate:(totalFailed/800)*100,
    avgLatency:Math.round(logs.reduce((s,l)=>s+l.latency,0)/logs.length),
    endpoints,
    spark:Array.from({length:30},(_,i)=>({day:i+1,lost:totalLost*(0.5+Math.random()*.9)})),
    impact:{configured:true,demo:true,abandonmentRate,avgOrderValue,usersAffected,revenueAtRisk,formula:'failed_requests × abandonment_rate × avg_order_value'},
    isDemo:true,
  };
}
