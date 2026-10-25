import { apiRequest } from './api';

export function getOrganisationMembers() {
  return apiRequest('/api/org/members');
}
