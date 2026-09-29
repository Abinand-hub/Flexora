export const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:3000";

function headers(apiKey, extra={}){
  return { ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}), ...extra };
}

export async function apiGet(path, apiKey){
  const r = await fetch(`${API_BASE}${path}`, { headers: headers(apiKey) });
  return r;
}

export async function apiPatch(path, apiKey, body){
  return fetch(`${API_BASE}${path}`, {
    method: "PATCH",
    headers: headers(apiKey, { "Content-Type": "application/json" }),
    body: JSON.stringify(body),
  });
}

export async function apiPost(path, apiKey, body){
  return fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: headers(apiKey, { "Content-Type": "application/json" }),
    body: JSON.stringify(body || {}),
  });
}
