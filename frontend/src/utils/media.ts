/**
 * Resolves an image URL by checking if it's a relative path (local server)
 * or a full external URL (Supabase/External).
 */
export const resolveMediaURL = (url: string | null | undefined): string => {
  if (!url) return "https://via.placeholder.com/800x600?text=Invenger+Foundation";
  
  // If it's a relative path (starts with /uploads), append the backend server URL
  if (url.startsWith("/uploads")) {
    // For local dev, this is localhost:5000. In production, this will be your server IP.
    return `http://localhost:5000${url}`;
  }
  
  // Otherwise, return the URL as is (external links or Supabase)
  return url;
};
