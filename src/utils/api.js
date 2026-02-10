
// 1. Get the raw value (defaulting to empty string if undefined)
const rawBase = import.meta.env.VITE_API_URL || 'http://localhost:1337';

// 2. Safely clean the URL (only calling replace if rawBase exists)
export const API_BASE = rawBase.replace(/\/$/, "");

export const getStrapiMedia = (url) => {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('//')) return url;
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${API_BASE}${path}`;
};

export const API_URL = `${API_BASE}/api`;