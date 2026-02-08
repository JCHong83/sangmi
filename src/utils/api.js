
export const API_BASE = (import.meta.env.PROD
  ? import.meta.env.VITE_API_URL 
  : 'http://localhost:1337').replace(/\/$/, ""); 

export const getStrapiMedia = (url) => {
  if (url == null) return null;
  if (url.startsWith('http') || url.startsWith('//')) return url;
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${API_BASE}${path}`;
};

export const API_URL = `${API_BASE}/api`;