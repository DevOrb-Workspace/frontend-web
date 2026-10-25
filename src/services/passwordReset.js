import { apiRequest } from './api'

export function requestPasswordReset(email) {
  return apiRequest('/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email: email.trim() }),
  })
}

export function verifyPasswordResetCode(email, otp) {
  return apiRequest('/api/auth/verify-reset-code', {
    method: 'POST',
    body: JSON.stringify({ email: email.trim(), otp: otp.trim() }),
  })
}

export function resetPassword(email, otp, newPassword) {
  return apiRequest('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({
      email: email.trim(),
      otp: otp.trim(),
      newPassword,
    }),
  })
}
