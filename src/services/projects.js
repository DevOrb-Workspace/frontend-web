import { apiRequest } from './api';

export function createProjectRequest({ name, description = '' }) {
  return apiRequest('/api/org/projects/create', {
    method: 'POST',
    body: JSON.stringify({
      name,
      description,
    }),
  });
}

export function getProjectInfo(projectId) {
  if (!projectId) {
    throw new Error('Project ID is required.');
  }

  return apiRequest(
    `/api/projects/${encodeURIComponent(projectId)}`
  );
}
