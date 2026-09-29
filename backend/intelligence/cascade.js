function isBroken(status) {
  return status === 'fail' || status === 'cascade' || status === 'failed'
}

function normalizeDependsOn(value) {
  if (!Array.isArray(value)) return []
  return [...new Set(value.map(v => String(v).slice(0, 255)).filter(Boolean))].slice(0, 20)
}

// Mutates a copy: fail with a broken parent or named sibling dep → cascade.
function tagCascade(steps) {
  const list = (steps || []).map(s => ({
    ...s,
    depends_on: normalizeDependsOn(s.depends_on),
  }))
  const byId = new Map(list.map(s => [s.id, s]))
  let changed = true
  while (changed) {
    changed = false
    for (const st of list) {
      if (st.status !== 'fail') continue
      const parent = st.parent_step_id ? byId.get(st.parent_step_id) : null
      const parentBroken = parent && isBroken(parent.status)
      const depBroken = st.depends_on.some(name => {
        const dep = list.find(x => x.name === name && x.id !== st.id)
        return dep && isBroken(dep.status)
      })
      if (parentBroken || depBroken) {
        st.status = 'cascade'
        changed = true
      }
    }
  }
  return list
}

module.exports = { isBroken, normalizeDependsOn, tagCascade }
