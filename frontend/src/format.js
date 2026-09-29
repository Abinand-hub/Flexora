import { useState, useEffect } from "react";

export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}

:root{
  --bg:#fafafa;
  --white:#ffffff;
  --gray1:#f4f4f5;
  --gray2:#e8e8ec;
  --gray3:#c8c8d0;
  --gray4:#88889a;
  --gray5:#444450;
  --ink:#0c0c10;
  --red:#d42020;
  --red-bg:#fef2f2;
  --red-border:#fcd4d4;
  --amber:#b45800;
  --amber-bg:#fffbeb;
  --amber-border:#fde9a0;
  --green:#0f6e40;
  --green-bg:#f0fdf6;
  --green-border:#a8e8c4;
}

html,body{height:100%;background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;font-size:14px;line-height:1.5;-webkit-font-smoothing:antialiased;}
*{font-family:'Inter',sans-serif;}
input,button{font-family:'Inter',sans-serif;}
input:focus-visible,button:focus-visible{outline:2px solid var(--ink);outline-offset:2px;}
input::placeholder{color:var(--gray3);}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-thumb{background:var(--gray2);}
a{color:inherit;text-decoration:none;}

@keyframes up{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
@keyframes up24{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
@keyframes in{from{opacity:0;}to{opacity:1;}}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:.3;}}
`;

export const f$ = n => "$" + Math.abs(parseFloat(n)||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
export const fPct = n => (parseFloat(n)||0).toFixed(1)+"%";
export const fNum = n => (parseInt(n)||0).toLocaleString();
export const fMs = n => n>999?(n/1000).toFixed(1)+"s":(n||0)+"ms";

export function useIsMobile(breakpoint=680){
  const[isMobile,setIsMobile]=useState(()=>typeof window!=="undefined"&&window.innerWidth<breakpoint);
  useEffect(()=>{
    const mq=window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange=()=>setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?mq.addEventListener("change",onChange):mq.addListener(onChange);
    return()=>{mq.removeEventListener?mq.removeEventListener("change",onChange):mq.removeListener(onChange);};
  },[breakpoint]);
  return isMobile;
}
