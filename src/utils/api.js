/**
 * API_BASE handles switching between your local Strapi 
 * and your live Render.com backend.
 */
export const API_BASE = (process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL 
  : 'http://localhost:1337').replace(/\/$/, ""); // Removes trailing slash if present

// Helper for image URLs
export const getStrapiMedia = (url) => {
  if (url == null) return null;
  if (url.startsWith('http') || url.startsWith('//')) return url;
  
  // Ensure the URL starts with a slash before prepending the base
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${API_BASE}${path}`;
};

// Main API endpoint helper
export const API_URL = `${API_BASE}/api`;