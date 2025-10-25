function buildUrlAndParams(basePath, paramsObj) {
  const params = new URLSearchParams();
  for (const [key, val] of Object.entries(paramsObj || {})) {
    if (val === undefined || val === null || val === '') continue;
    params.append(key, String(val));
  }
  const qs = params.toString();
  return `${basePath}${qs ? `?${qs}` : ''}`;
}

module.exports = buildUrlAndParams;