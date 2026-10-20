
import { apiRequest } from './api';

export function requestOtp(email) {
  return apiRequest('/api/auth/request-otp', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export function verifyOtp(details) {
  return apiRequest('/api/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify(details),
  });
}

export function login(email, password) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function getCurrentUser(accessToken) {
  return apiRequest('/api/auth/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function refreshToken(refreshTokenValue) {
  return apiRequest('/api/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({
      refreshToken: refreshTokenValue,
    }),
  });
}

export function logout(refreshTokenValue) {
  return apiRequest('/api/auth/logout', {
    method: 'POST',
    body: JSON.stringify({
      refreshToken: refreshTokenValue,
    }),
  });
}
