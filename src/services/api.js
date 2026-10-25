const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://backend-core-iwxv.onrender.com';

export async function apiRequest(endpoint, options = {}) {
  const accessToken =
    typeof window !== 'undefined'
      ? window.sessionStorage.getItem('orbit-access-token')
      : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      data.message || `Request failed (${response.status})`
    );
    error.status = response.status;
    throw error;
  }

  return data;
}
