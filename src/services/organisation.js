import { apiRequest } from './api';

export function joinOrganisation({
  orgId,
  accessCode,
  email,
  username,
  password,
}) {
  return apiRequest('/api/org/join', {
    method: 'POST',
    body: JSON.stringify({
      orgId: orgId.trim(),
      accessCode: accessCode.trim(),
      email: email.trim().toLowerCase(),
      username: username.trim(),
      password,
    }),
  });
}

export function verifyOrganisationOtp(email, otp) {
  return apiRequest('/api/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      otp: otp.trim(),
    }),
  });
}
