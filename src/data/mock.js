export const STATUSES = [
  { id: 'todo',     label: 'To Do',       color: '#ff6bb5' },
  { id: 'progress', label: 'In Progress', color: '#ffd93d' },
  { id: 'review',   label: 'Review',      color: '#b197fc' },
  { id: 'done',     label: 'Done',        color: '#51e5a1' },
]

export const PRIORITY_COLORS = {
  low: '#51e5a1',
  medium: '#ffd93d',
  high: '#ff5c5c',
}

export const users = [
  { id: 'u1', name: 'Aayushi', color: '#ff6bb5' },
  { id: 'u2', name: 'Rohan',   color: '#4dabf7' },
  { id: 'u3', name: 'Meera',   color: '#51e5a1' },
  { id: 'u4', name: 'Kabir',   color: '#ff922b' },
]

export const issues = [
  { id: 1, title: 'Design login page',        description: 'Brutalist login with email and password.', status: 'done',     priority: 'medium', assignee: 'u1', labels: ['ui'] },
  { id: 2, title: 'Build Kanban drag & drop', description: 'Columns and draggable issue cards.',       status: 'progress', priority: 'high',   assignee: 'u2', labels: ['board'] },
  { id: 3, title: 'Chat message input',       description: 'Send messages and show them in a list.',   status: 'todo',     priority: 'medium', assignee: 'u3', labels: ['chat'] },
  { id: 4, title: 'PR merge button',          description: 'Merging a PR should close its issue.',     status: 'review',   priority: 'high',   assignee: 'u4', labels: ['code'] },
  { id: 5, title: 'Mobile sidebar',           description: 'Collapse nav on small screens.',           status: 'todo',     priority: 'low',    assignee: 'u1', labels: ['ui'] },
]

export const repos = [
  { id: 'r1', name: 'forge-web', description: 'Frontend of the platform', language: 'JavaScript', stars: 12, color: '#4dabf7',
    files: ['src/', 'public/', 'package.json', 'README.md'],
    commits: [
      { id: 'a1b2c3d', message: 'Add theme.css', author: 'u1', time: '2h ago' },
      { id: 'e4f5a6b', message: 'Create UI components', author: 'u2', time: '5h ago' },
      { id: 'c7d8e9f', message: 'Initial commit', author: 'u1', time: '1d ago' },
    ] },
  { id: 'r2', name: 'forge-api', description: 'Mock backend and data', language: 'Node.js', stars: 5, color: '#51e5a1',
    files: ['server.js', 'routes/', 'package.json'],
    commits: [
      { id: 'f1a2b3c', message: 'Add issues route', author: 'u3', time: '3h ago' },
      { id: 'd4e5f6a', message: 'Project setup', author: 'u3', time: '1d ago' },
    ] },
]

// `closes` links a PR to an issue, which is the cross-link feature
export const pullRequests = [
  { id: 101, title: 'Add Kanban board',  repo: 'r1', author: 'u2', status: 'open',   closes: 2, branch: 'feature/board' },
  { id: 102, title: 'Merge button logic', repo: 'r1', author: 'u4', status: 'open',   closes: 4, branch: 'feature/pr-merge' },
  { id: 103, title: 'Login page UI',     repo: 'r1', author: 'u1', status: 'merged', closes: 1, branch: 'feature/login' },
]

export const channels = [
  { id: 'c1', name: 'general', color: '#ff6bb5' },
  { id: 'c2', name: 'frontend', color: '#4dabf7' },
  { id: 'c3', name: 'random', color: '#ffd93d' },
]

export const messages = [
  { id: 'm1', channel: 'c1', user: 'u1', text: 'Welcome to Forge! 🎉', time: '10:02', reactions: { '🔥': 2 } },
  { id: 'm2', channel: 'c1', user: 'u2', text: 'Board is almost done, see #2', time: '10:05', reactions: {} },
  { id: 'm3', channel: 'c2', user: 'u3', text: 'Who is taking #3?', time: '10:10', reactions: {} },
  { id: 'm4', channel: 'c2', user: 'u4', text: 'PR for #4 is ready for review', time: '10:12', reactions: { '👍': 1 } },
]