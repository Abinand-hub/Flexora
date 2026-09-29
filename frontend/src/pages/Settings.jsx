import { useState, useEffect } from "react";
import { API_BASE, apiGet, apiPatch } from "../api";
import { useIsMobile } from "../format";

const field={width:"100%",padding:"10px 12px",border:"1px solid var(--gray2)",borderRadius:8,fontSize:13,background:"var(--white)",color:"var(--ink)",textAlign:"left"};
const mono={...field,fontFamily:"DM Mono,monospace"};
const ghost={padding:"10px 14px",border:"1px solid var(--gray2)",borderRadius:8,background:"var(--white)",color:"var(--ink)",fontSize:12,cursor:"pointer",flexShrink:0};
const primary={...ghost,background:"var(--ink)",color:"#fff",border:"none"};

export function Settings({apiKey,company,isDemo,pricePerReq,setPricePerReq,impact,regen,onApplyKey}){
  const isMobile=useIsMobile();
  const[keyDraft,setKeyDraft]=useState(apiKey||"");
  const[copied,setCopied]=useState(false);
  const[keyErr,setKeyErr]=useState("");
  const[keySaved,setKeySaved]=useState(false);
  const[price,setPrice]=useState(pricePerReq);
  const[saved,setSaved]=useState(false);
  const[priceErr,setPriceErr]=useState(false);
  const[abandonment,setAbandonment]=useState(impact?.abandonmentRate||0);
  const[aov,setAov]=useState(impact?.avgOrderValue||0);
  const[impactSaved,setImpactSaved]=useState(false);
  const[impactErr,setImpactErr]=useState("");
  const[saving,setSaving]=useState(false);
  const[webhook,setWebhook]=useState("");
  const[hookSaved,setHookSaved]=useState(false);
  const[hookErr,setHookErr]=useState("");

  useEffect(()=>{setKeyDraft(apiKey||"");},[apiKey]);
  useEffect(()=>{
    if(!apiKey||isDemo)return;
    apiGet("/api/customers/me",apiKey).then(async r=>{
      if(!r.ok)return;
      const c=await r.json();
      setWebhook(c.webhook_url||"");
    }).catch(()=>{});
  },[apiKey,isDemo]);

  async function copy(){
    const v=keyDraft.trim()||apiKey;
    if(!v){setKeyErr("Nothing to copy — paste an fx_ key first.");return;}
    try{await navigator.clipboard.writeText(v);setCopied(true);setTimeout(()=>setCopied(false),2000);}catch{setKeyErr("Couldn't copy. Select the key and copy it yourself.");}
  }

  async function applyKey(){
    const key=keyDraft.trim();
    setKeyErr("");
    if(!key){setKeyErr("Paste an API key that starts with fx_.");return;}
    if(!key.startsWith("fx_")){setKeyErr("API key must start with fx_");return;}
    setSaving(true);
    try{
      const r=await apiGet("/api/customers/me",key);
      if(!r.ok){
        if(r.status===401||r.status===403)throw new Error("Invalid API key. Check it and try again.");
        throw new Error("Couldn't reach the local API.");
      }
      const c=await r.json();
      onApplyKey({email:c.email,company:c.company||company||c.email,apiKey:key,isDemo:false});
      setKeySaved(true);setTimeout(()=>setKeySaved(false),2000);
    }catch(e){
      setKeyErr(e instanceof TypeError?"Couldn't reach "+API_BASE:e.message);
    }
    setSaving(false);
  }

  async function save(){
    const p=Number(price);
    if(!Number.isFinite(p)||p<=0){setPriceErr(true);setTimeout(()=>setPriceErr(false),2000);return;}
    setPricePerReq(p);
    if(isDemo){setSaved(true);setTimeout(()=>setSaved(false),2000);return;}
    setSaving(true);
    try{
      const r=await apiPatch("/api/customers/me",apiKey,{price_default:p});
      if(!r.ok)throw 0;
      regen();setSaved(true);setTimeout(()=>setSaved(false),2000);
    }catch{setPriceErr(true);setTimeout(()=>setPriceErr(false),2000);}
    setSaving(false);
  }

  async function saveImpact(){
    const a=Number(abandonment),v=Number(aov);
    if(!Number.isFinite(a)||a<0||a>100){setImpactErr("Abandonment rate must be 0–100.");return;}
    if(!Number.isFinite(v)||v<0){setImpactErr("Average order value must be 0 or more.");return;}
    setSaving(true);setImpactErr("");
    try{
      const r=await apiPatch("/api/customers/me",apiKey,{abandonment_rate:a,avg_order_value:v});
      if(!r.ok)throw 0;
      regen();setImpactSaved(true);setTimeout(()=>setImpactSaved(false),2000);
    }catch{setImpactErr("Couldn't save — try again.");}
    setSaving(false);
  }

  async function saveWebhook(){
    setHookErr("");
    if(isDemo)return;
    setSaving(true);
    try{
      const r=await apiPatch("/api/customers/me",apiKey,{webhook_url:webhook.trim()});
      const j=await r.json().catch(()=>({}));
      if(!r.ok)throw new Error(j.error||"Couldn't save webhook");
      setHookSaved(true);setTimeout(()=>setHookSaved(false),2000);
    }catch(e){setHookErr(e.message);}
    setSaving(false);
  }

  const dirty=keyDraft.trim()!==(apiKey||"");
  const canApply=keyDraft.trim().startsWith("fx_")&&(dirty||isDemo);

  return(
    <div style={{maxWidth:560,display:"flex",flexDirection:"column",gap:16,textAlign:"left"}}>
      <section style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:12,padding:"22px 24px"}}>
        <p style={{fontSize:14,fontWeight:600,marginBottom:6}}>API Key</p>
        <p style={{fontSize:12,color:"var(--gray4)",marginBottom:12}}>{isDemo?"Paste a seeded fx_ key to load real workflows. Leave blank for demo.":"This key authenticates the dashboard. Replace it to switch accounts."}</p>
        <input
          type="text"
          value={keyDraft}
          placeholder="fx_…"
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          onChange={e=>{setKeyDraft(e.target.value);setKeyErr("");}}
          onKeyDown={e=>{if(e.key==="Enter")applyKey();}}
          style={mono}
        />
        <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
          <button type="button" onClick={applyKey} disabled={saving||!canApply} style={{...primary,opacity:(saving||!canApply)?0.5:1}}>{keySaved?"Applied ✓":saving?"Checking…":"Apply key"}</button>
          <button type="button" onClick={copy} style={ghost}>{copied?"Copied":"Copy"}</button>
        </div>
        {keyErr&&<p style={{fontSize:12,color:"var(--red)",marginTop:10,padding:"8px 12px",background:"var(--red-bg)",border:"1px solid var(--red-border)",borderRadius:6}}>{keyErr}</p>}
      </section>

      <section style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:12,padding:"22px 24px"}}>
        <p style={{fontSize:14,fontWeight:600,marginBottom:12}}>Price Per Request</p>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:isMobile?"wrap":"nowrap"}}>
          <input type="number" value={price} step={.001} min={.001} onChange={e=>setPrice(e.target.value)} style={{...mono,flex:1,minWidth:140}} />
          <button type="button" onClick={save} disabled={saving} style={{...primary,background:saved?"var(--green-bg)":"var(--ink)",color:saved?"var(--green)":"#fff"}}>{saved?"Saved":"Save"}</button>
        </div>
        {priceErr&&<p style={{fontSize:12,color:"var(--red)",marginTop:8}}>Couldn't save price.</p>}
      </section>

      <section style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:12,padding:"22px 24px"}}>
        <p style={{fontSize:14,fontWeight:600,marginBottom:4}}>Revenue-at-Risk Model</p>
        <p style={{fontSize:12,color:"var(--gray4)",marginBottom:14}}>Used only when both values are set.</p>
        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:12,marginBottom:12}}>
          <label style={{display:"flex",flexDirection:"column",gap:6,fontSize:11,color:"var(--gray5)"}}>
            Abandonment rate (%)
            <input type="number" value={abandonment} disabled={isDemo} onChange={e=>setAbandonment(e.target.value)} style={{...field,opacity:isDemo?.55:1}} />
          </label>
          <label style={{display:"flex",flexDirection:"column",gap:6,fontSize:11,color:"var(--gray5)"}}>
            Avg order value ($)
            <input type="number" value={aov} disabled={isDemo} onChange={e=>setAov(e.target.value)} style={{...field,opacity:isDemo?.55:1}} />
          </label>
        </div>
        {impactErr&&<p style={{fontSize:12,color:"var(--red)",marginBottom:8}}>{impactErr}</p>}
        {!isDemo&&<button type="button" onClick={saveImpact} disabled={saving} style={{...primary,background:impactSaved?"var(--green-bg)":"var(--ink)",color:impactSaved?"var(--green)":"#fff"}}>{impactSaved?"Saved":"Save"}</button>}
        {isDemo&&<p style={{fontSize:12,color:"var(--gray4)"}}>Apply an API key to save this model.</p>}
      </section>

      <section style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:12,padding:"22px 24px"}}>
        <p style={{fontSize:14,fontWeight:600,marginBottom:6}}>Recovery webhook</p>
        <p style={{fontSize:12,color:"var(--gray4)",marginBottom:12}}>Fluxera POSTs failed-execution payloads here. It does not retry your app.</p>
        <input type="url" value={webhook} placeholder="https://…" disabled={isDemo} onChange={e=>{setWebhook(e.target.value);setHookErr("");}} style={{...mono,opacity:isDemo?.55:1}} />
        <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
          {!isDemo&&<button type="button" onClick={saveWebhook} disabled={saving} style={{...primary,background:hookSaved?"var(--green-bg)":"var(--ink)",color:hookSaved?"var(--green)":"#fff"}}>{hookSaved?"Saved":"Save"}</button>}
        </div>
        {hookErr&&<p style={{fontSize:12,color:"var(--red)",marginTop:8}}>{hookErr}</p>}
      </section>

      <section style={{background:"var(--white)",border:"1px solid var(--gray2)",borderRadius:12,padding:"22px 24px"}}>
        <p style={{fontSize:14,fontWeight:600,marginBottom:8}}>Account</p>
        {[{k:"Company",v:company||"—"},{k:"Support",v:"support@fluxeratechnologies.ai"}].map((r,i,arr)=>(
          <div key={r.k} style={{display:"flex",justifyContent:"space-between",gap:16,padding:"10px 0",borderBottom:i<arr.length-1?"1px solid var(--gray2)":"none"}}>
            <span style={{fontSize:12,color:"var(--gray4)"}}>{r.k}</span>
            <span style={{fontSize:12,fontWeight:500,textAlign:"right"}}>{r.v}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
