import { apiRequest } from './api';

export function createTaskRequest({
  projectId,
  title,
  description = '',
  assignedTo,
  priority = 'medium',
  dueDate = '',
}) {
  if (!projectId) {
    throw new Error('Select a valid backend project.');
  }

  if (!assignedTo) {
    throw new Error('Select a developer before creating the task.');
  }

  return apiRequest(
    `/api/projects/${encodeURIComponent(projectId)}/tasks`,
    {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        assignedTo,
        priority: priority.toLowerCase(),
        ...(dueDate
          ? { dueDate: `${dueDate}T00:00:00.000Z` }
          : {}),
      }),
    }
  );
}

export function updateTaskStatusRequest(taskId, status) {
  if (!taskId) {
    throw new Error('A valid backend task ID is required.');
  }

  const statusMap = {
    'To Do': 'todo',
    'In Progress': 'in_progress',
    Completed: 'completed',
  };

  const apiStatus = statusMap[status] || status;

  return apiRequest(
    `/api/tasks/${encodeURIComponent(taskId)}/status`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status: apiStatus }),
    }
  );
}
