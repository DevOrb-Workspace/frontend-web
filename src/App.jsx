
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { useEffect, useState } from 'react'
import './Analytics.css'
import './App.css'
import Login from './Login'
import Landing from './pages/Landing'
import Tickets from './pages/Tickets'
import Submissions from './pages/Submissions'
import Calendar from './pages/Calendar'
import Chat from './features/chat/Chat'

import { getCurrentUser, logout } from './services/auth'
import { createProjectRequest } from './services/projects'
import { createTaskRequest, updateTaskStatusRequest } from './services/tasks'
import { getOrganisationMembers } from './services/members'
import { joinOrganisation, verifyOrganisationOtp } from './services/organisation'

const initialProjects = [
  {
    name: 'Website Redesign',
    team: 'Design Team',
    progress: 75,
    color: 'purple',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=80'
  },
  {
    name: 'Mobile App',
    team: 'Development Team',
    progress: 45,
    color: 'lime',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=80'
  },
  {
    name: 'AI Assistant',
    team: 'Research Team',
    progress: 60,
    color: 'coral',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80'
  }
]

const initialTasks = [
  {
    title: 'Create dashboard wireframes',
    project: 'Website Redesign',
    status: 'In Progress',
    priority: 'High',
    color: 'purple'
  },
  {
    title: 'Fix login page bugs',
    project: 'Mobile App',
    status: 'To Do',
    priority: 'Medium',
    color: 'coral'
  },
  {
    title: 'Review pull requests',
    project: 'AI Assistant',
    status: 'Completed',
    priority: 'Low',
    color: 'lime'
  }
]

const initialMessages = [
  {
    name: 'Aayushi Agarwal',
    role: 'Design team',
    message: 'Uploaded the latest wireframes ✨',
    time: '10:42 AM',
    avatar: 'A',
    color: 'purple'
  },
  {
    name: 'Srishti Kumari Sharma',
    role: 'Development',
    message: 'The new dashboard is coming together!',
    time: '10:35 AM',
    avatar: 'S',
    color: 'lime'
  },
  {
    name: 'Ashutosh Yadav',
    role: 'Research team',
    message: 'Shared the project update with everyone.',
    time: '10:18 AM',
    avatar: 'A',
    color: 'coral'
  }
]

function AnalyticsPage({ projects, tasks, onBack }) {
  const completed = tasks.filter(
    task => task.status === 'Completed'
  ).length

  const inProgress = tasks.filter(
    task => task.status === 'In Progress'
  ).length

  const toDo = tasks.filter(
    task => task.status === 'To Do'
  ).length

  const activity = [
    { day: 'Mon', tasks: 4 },
    { day: 'Tue', tasks: 7 },
    { day: 'Wed', tasks: 5 },
    { day: 'Thu', tasks: 9 },
    { day: 'Fri', tasks: 6 },
    { day: 'Sat', tasks: 3 },
    { day: 'Sun', tasks: 5 }
  ]

  const statusData = [
    { name: 'Completed', value: completed, color: '#166534' },
    { name: 'In Progress', value: inProgress, color: '#facc15' },
    { name: 'To Do', value: toDo, color: '#ef4444' }
  ].filter(item => item.value > 0)

  const rate = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0

  return (
    <div className="analytics-page">
      <div className="analytics-intro">
        <span className="eyebrow">YOUR WORK, VISUALIZED</span>
        <h1>Analytics &amp; Insights</h1>
        <p>Track your projects and team progress.</p>
      </div>

      <div className="analytics-summary">
        <article className="analytics-summary-card">
          <span>Total projects</span>
          <h2>{projects.length}</h2>
        </article>

        <article className="analytics-summary-card">
          <span>Total tasks</span>
          <h2>{tasks.length}</h2>
        </article>

        <article className="analytics-summary-card">
          <span>Completion rate</span>
          <h2>{rate}%</h2>
        </article>
      </div>

      <div className="analytics-grid">
        <section className="panel analytics-panel">
          <div className="panel-heading">
            <div>
              <h2>Weekly task activity</h2>
              <p>Illustrative weekly data</p>
            </div>
          </div>

          <div className="chart-area">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={activity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="tasks"
                  radius={[6, 6, 0, 0]}
                >
                  {activity.map((entry, index) => (
                    <Cell
                      key={entry.day}
                      fill={[
                        '#A477FF',
                        '#FF9FCE',
                        '#65E6E0',
                        '#79DFB8',
                        '#C8F56A',
                        '#FFD166',
                        '#FF7B72'
                      ][index % 7]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel analytics-panel">
          <div className="panel-heading">
            <div>
              <h2>Task status</h2>
              <p>Current task distribution</p>
            </div>
          </div>

          <div className="pie-chart-area">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                  >
                    {statusData.map(item => (
                      <Cell
                        key={item.name}
                        fill={item.color}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p>No tasks yet.</p>
            )}
          </div>

          <div className="analytics-breakdown">
            <div>
              <span className="status-dot completed-dot" />
              <span>Completed</span>
              <strong>{completed}</strong>
            </div>

            <div>
              <span className="status-dot progress-dot" />
              <span>In Progress</span>
              <strong>{inProgress}</strong>
            </div>

            <div>
              <span className="status-dot todo-dot" />
              <span>To Do</span>
              <strong>{toDo}</strong>
            </div>
          </div>
        </section>
      </div>

      <section className="panel analytics-panel">
        <div className="panel-heading">
          <div>
            <h2>Project progress</h2>
            <p>Progress across your projects</p>
          </div>
        </div>

        {projects.map(project => (
          <div
            className="project-analytics-row"
            key={project.name}
          >
            <div className="project-analytics-info">
              <strong>{project.name}</strong>
              <span>{project.progress}%</span>
            </div>

            <div className="project-progress">
              <span
                className={project.color}
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        ))}
      </section>

      <button
        className="secondary-button analytics-back"
        onClick={onBack}
      >
        ← Back to overview
      </button>
    </div>
  )
}


function MyTasksPage({ tasks, toggleTask, addTask, onBack }) {
  const [folder, setFolder] = useState(null)
  const [priority, setPriority] = useState('All')

  const folders = [
    { title: 'Completed', status: 'Completed', icon: '✓', tone: 'green' },
    { title: 'Not Completed', status: 'To Do', icon: '○', tone: 'orange' },
    { title: 'In Progress', status: 'In Progress', icon: '↗', tone: 'purple' }
  ]

  const folderTasks = tasks.filter(task => task.status === folder)
  const visibleTasks = folderTasks.filter(
    task => priority === 'All' || (task.priority || 'Medium') === priority
  )

  const priorityData = ['High', 'Medium', 'Low'].map(name => ({
    name,
    value: folderTasks.filter(task => (task.priority || 'Medium') === name).length
  })).filter(item => item.value > 0)

  const chartColors = ['#8b5cf6', '#fb923c', '#22c55e']

  return (
    <div className="my-tasks-page">
      <div className="my-tasks-heading">
        <div>
          <span className="eyebrow">YOUR WORKSPACE / TASKS</span>
          <h1>{folder ? folders.find(item => item.status === folder)?.title : 'My Tasks'}</h1>
          <p>
            {folder
              ? 'Your tasks, projects and priority breakdown.'
              : 'Everything you need to keep your work moving.'}
          </p>
        </div>
        <button
          type="button"
          className="text-button"
          onClick={onBack}
        >
          ← Back to overview
        </button>
      </div>

      {folder ? (
        <>
          <button className="text-button my-tasks-back" onClick={() => {
            setFolder(null)
            setPriority('All')
          }}>
            ← Back to My Tasks
          </button>

          <div className="my-task-detail-grid">
            <section className="panel my-task-list-panel">
              <div className="panel-heading">
                <div>
                  <h2>{folder === 'To Do' ? 'Not Completed Tasks' : `${folder} Tasks`}</h2>
                  <p>Click a task to cycle its status.</p>
                </div>
                <strong>{folderTasks.length} tasks</strong>
              </div>

              <div className="priority-filters my-task-priority-filters">
                {['All', 'High', 'Medium', 'Low'].map(item => (
                  <button
                    type="button"
                    key={item}
                    className={`priority-filter ${priority === item ? 'active' : ''}`}
                    onClick={() => setPriority(item)}
                  >
                    {item === 'All' ? 'All priorities' : item}
                  </button>
                ))}
              </div>

              <div className="task-demo-list">
                {visibleTasks.map(task => (
                  <button
                    type="button"
                    className="task-demo-card"
                    key={task.id || task.title}
                    onClick={() => toggleTask(task.title)}
                    title="Click to cycle task status"
                  >
                    <span className={`task-check ${task.status === 'Completed' ? 'checked' : ''}`}>
                      {task.status === 'Completed' ? '✓' : ''}
                    </span>
                    <span className="task-demo-info">
                      <strong>{task.title}</strong>
                      <span>Project: {task.project || 'General'}</span>
                    </span>
                    <span className={`task-priority priority-${(task.priority || 'Medium').toLowerCase()}`}>
                      {task.priority || 'Medium'} Priority
                    </span>
                    <span className="task-demo-status">{task.status}</span>
                  </button>
                ))}
                {visibleTasks.length === 0 && (
                  <p className="empty-state">No tasks in this selection yet.</p>
                )}
              </div>
            </section>

            <section className="panel my-task-chart-panel">
              <h2>Priority breakdown</h2>
              <p>Based on tasks in this folder.</p>
              {priorityData.length > 0 ? (
                <>
                  <div className="my-task-pie-chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={priorityData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={85}
                          paddingAngle={4}
                        >
                          {priorityData.map((entry, index) => (
                            <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {priorityData.map((item, index) => (
                    <div className="my-task-chart-legend" key={item.name}>
                      <span>
                        <i style={{ background: chartColors[index % chartColors.length] }} />
                        {item.name} priority
                      </span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </>
              ) : (
                <p className="empty-state">Add tasks to see the chart.</p>
              )}
            </section>
          </div>
        </>
      ) : (
        <div className="my-task-folder-grid">
          {folders.map(item => {
            const count = tasks.filter(task => task.status === item.status).length
            return (
              <button
                type="button"
                key={item.status}
                className={`my-task-folder-card folder-${item.tone}`}
                onClick={() => setFolder(item.status)}
              >
                <span className="my-task-folder-icon">{item.icon}</span>
                <span className="my-task-folder-name">{item.title}</span>
                <strong>{count}</strong>
                <small>Open folder ↗</small>
              </button>
            )
          })}
        </div>
      )}

      <footer className="footer">
        <span>Made for teams that make things happen <b>♥</b></span>
        <span>One workspace. More possibilities.</span>
      </footer>
    </div>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [showLanding, setShowLanding] = useState(true)
  const [userRole, setUserRole] = useState('developer')
  const [checkingOAuth, setCheckingOAuth] = useState(
    window.location.pathname === '/auth/callback'
  )

  useEffect(() => {
    async function handleOAuthCallback() {
      if (window.location.pathname !== '/auth/callback') return

      const params = new URLSearchParams(
        window.location.hash.slice(1)
      )

      const accessToken = params.get('accessToken')
      const refreshToken = params.get('refreshToken')

      // Remove tokens from the address bar immediately.
      window.history.replaceState(
        {},
        document.title,
        '/'
      )

      if (!accessToken) {
        setCheckingOAuth(false)
        setShowLanding(false)
        return
      }


      try {
        const data = await getCurrentUser(accessToken)
        const user = data.user || data.profile || data

        console.log('OAuth profile keys:', Object.keys(data || {}))
        console.log('OAuth user keys:', Object.keys(data?.user || {}))
        console.log('OAuth profile:', {
          email: user?.email || null,
          role: user?.role || null,
        })

        const roleMap = {
          user: 'developer',
          developer: 'developer',
          product_manager: 'product-manager',
          'product-manager': 'product-manager',
          senior_manager: 'senior-manager',
          'senior-manager': 'senior-manager',
        }

      const mappedRole = roleMap[user.role] || 'developer'


        if (!user.email || !mappedRole) {
          throw new Error('User profile is missing required details.')
        }

        sessionStorage.setItem('orbit-access-token', accessToken)

        if (refreshToken) {
          sessionStorage.setItem('orbit-refresh-token', refreshToken)
        }

        setUserRole(mappedRole)
        setUserEmail(user.email)
        setShowLanding(false)
        setIsLoggedIn(true)
      } catch (error) {
        console.error('OAuth sign-in failed:', error.message)
        setShowLanding(false)
      } finally {
        setCheckingOAuth(false)
      }
    }

    handleOAuthCallback()
  }, [])
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState('Medium')
  const [newTaskDeadline, setNewTaskDeadline] = useState('')
  const [newTaskProject, setNewTaskProject] = useState('')
  const [newTaskAssignee, setNewTaskAssignee] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [newTaskStatus, setNewTaskStatus] = useState('To Do')
  const [dark, setDark] = useState(
    () => localStorage.getItem('team-theme') === 'dark'
  )

  const [activePage, setActivePage] = useState('overview')
  const [selectedTaskStatus, setSelectedTaskStatus] = useState('Completed')
  const [selectedPriority, setSelectedPriority] = useState('All')


  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('developer')
  const [invitedMembers, setInvitedMembers] = useState([])
  const [backendMembers, setBackendMembers] = useState([])
  const [membersLoading, setMembersLoading] = useState(false)
  const [membersError, setMembersError] = useState('')
  const [inviteError, setInviteError] = useState('')
  const [inviteSuccess, setInviteSuccess] = useState('')
  const [inviteStage, setInviteStage] = useState('join')
  const [inviteOrgId, setInviteOrgId] = useState(
    () => sessionStorage.getItem('orbit-organisation-id') || ''
  )
  const [inviteAccessCode, setInviteAccessCode] = useState('')
  const [inviteUsername, setInviteUsername] = useState('')
  const [invitePassword, setInvitePassword] = useState('')
  const [inviteOtp, setInviteOtp] = useState('')
  const [inviteSubmitting, setInviteSubmitting] = useState(false)

  const [editingProject, setEditingProject] = useState(null)
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [teamName, setTeamName] = useState('')
  const [projectColor, setProjectColor] = useState('purple')

  const [search, setSearch] = useState('')

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('orbit-projects')

    if (saved) {
      const parsedProjects = JSON.parse(saved)

      return parsedProjects.map(project => {
        const imageMap = {
          'Website Redesign':
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=80',
          'Mobile App':
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=80',
          'AI Assistant':
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80'
        }

        return imageMap[project.name]
          ? { ...project, image: imageMap[project.name] }
          : project
      })
    }

    return initialProjects
  })

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('orbit-tasks')
    return saved ? JSON.parse(saved) : initialTasks
  })

  const [messages, setMessages] = useState(initialMessages)
  const [activeChannel, setActiveChannel] = useState('General')
  const [message, setMessage] = useState('')

  useEffect(() => {
    localStorage.setItem('orbit-projects', JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    localStorage.setItem('orbit-tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    if (!showInviteModal) return

    const accessToken = sessionStorage.getItem('orbit-access-token')

    if (!accessToken) {
      setBackendMembers([])
      setMembersLoading(false)
      setMembersError(
        'A backend-authenticated session is needed to load real members. Preview data remains local.'
      )
      return
    }

    let cancelled = false
    setMembersLoading(true)
    setMembersError('')

    getOrganisationMembers()
      .then(response => {
        const records = Array.isArray(response)
          ? response
          : Array.isArray(response?.members)
            ? response.members
            : Array.isArray(response?.data)
              ? response.data
              : Array.isArray(response?.data?.members)
                ? response.data.members
                : null

        if (!records) {
          throw new Error('The members API returned an unexpected response format.')
        }

        if (!cancelled) {
          setBackendMembers(records.map(member => {
            const user = member?.user || member || {}

            return {
              id: member?.id || user?.id,
              email: user?.email || member?.email || '',
              username: user?.username || member?.username || '',
              role: String(member?.role || user?.role || 'member')
                .replace(/[_-]/g, ' ')
                .toLowerCase(),
              isEmailVerified: user?.isEmailVerified,
            }
          }))
        }
      })
      .catch(error => {
        if (!cancelled) {
          setBackendMembers([])
          setMembersError(error.message || 'Could not load organisation members.')
        }
      })
      .finally(() => {
        if (!cancelled) setMembersLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [showInviteModal])


  useEffect(() => {
    localStorage.setItem('team-theme', dark ? 'dark' : 'light')
  }, [dark])

  const heroContent = {
    developer: {
      eyebrow: '✦ BUILD. DEBUG. INNOVATE.',
      title: 'Turn ideas into',
      highlight: 'working code.',
      description:
        'Build meaningful features, solve problems, and turn great ideas into reality.',
      note1: '✦ Code in motion',
      note2: '● Building features'
    },

    'product-manager': {
      eyebrow: '✦ PLAN. CONNECT. DELIVER.',
      title: 'Shape ideas into',
      highlight: 'great products.',
      description:
        'Bring people together, plan smarter, and turn user needs into products that matter.',
      note1: '✦ Ideas taking shape',
      note2: '● Team aligned'
    },

    'senior-manager': {
      eyebrow: '✦ LEAD. INSPIRE. GROW.',
      title: 'Lead teams toward',
      highlight: 'bigger goals.',
      description:
        'Create a clear vision, empower your team, and turn strategic goals into results.',
      note1: '✦ Vision in action',
      note2: '● Team moving forward'
    }
  }

  const currentHero = heroContent[userRole] || heroContent.developer
  const query = search.toLowerCase()

  const filteredProjects = projects.filter(project =>
    `${project.name} ${project.team}`.toLowerCase().includes(query)
  )

  const filteredTasks = tasks.filter(task =>
    `${task.title} ${task.project} ${task.status}`
      .toLowerCase()
      .includes(query)
  )

  const completed = tasks.filter(
    task => task.status === 'Completed'
  ).length

  const inProgress = tasks.filter(
    task => task.status === 'In Progress'
  ).length

  const toDo = tasks.filter(
    task => task.status === 'To Do'
  ).length

  const completionRate = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0

  function addProject() {
    setEditingProject(null)
    setProjectName('')
    setProjectDescription('')
    setTeamName('')
    setProjectColor('purple')
    setShowProjectModal(true)
  }

  async function createProject(event) {
    event.preventDefault()

    if (!projectName.trim() || !teamName.trim()) return

    const projectDetails = {
      name: projectName.trim(),
      description: projectDescription.trim(),
    }

    const accessToken = sessionStorage.getItem('orbit-access-token')

    try {
      let createdProject

      if (accessToken) {
        const response = await createProjectRequest(projectDetails)
        createdProject = response?.project || response?.data || response
      } else {
        // Preview Dashboard remains a local-only demo.
        createdProject = {
          ...projectDetails,
          id: `preview-${Date.now()}`,
          status: 'ACTIVE',
          deadline: null,
        }
      }

      setProjects(previous => [
        ...previous,
        {
          id: createdProject.id || `local-${Date.now()}`,
          name: createdProject.name || projectDetails.name,
          description: createdProject.description ?? projectDetails.description,
          team: teamName.trim(),
          progress: 0,
          color: projectColor,
          status: createdProject.status || 'ACTIVE',
          deadline: createdProject.deadline || '',
          image:
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=80'
        }
      ])

      setShowProjectModal(false)
      setEditingProject(null)
    } catch (error) {
      window.alert(`Could not create project on the backend: ${error.message}`)
    }
  }

  function editProject(project) {
    setEditingProject(project)
    setProjectName(project.name)
    setProjectDescription(project.description || '')
    setTeamName(project.team)
    setProjectColor(project.color)
    setShowProjectModal(true)
  }

  function updateProject(event) {
    event.preventDefault()

    if (!editingProject || !projectName.trim() || !teamName.trim()) {
      return
    }

    const oldName = editingProject.name
    const newName = projectName.trim()

    if (
      newName !== oldName &&
      projects.some(project => project.name === newName)
    ) {
      alert('A project with this name already exists.')
      return
    }

    setProjects(previous =>
      previous.map(project =>
        project.name === oldName
          ? {
            ...project,
            name: newName,
            description: projectDescription.trim(),
            team: teamName.trim(),
            color: projectColor
          }
          : project
      )
    )

    setTasks(previous =>
      previous.map(task =>
        task.project === oldName
          ? {
            ...task,
            project: newName,
            color: projectColor
          }
          : task
      )
    )

    setShowProjectModal(false)
    setEditingProject(null)
  }

  async function addTask() {
    if (!newTaskTitle.trim() || !newTaskProject) return

    const selectedProject = projects.find(
      project => project.name === newTaskProject
    )
    const accessToken = sessionStorage.getItem('orbit-access-token')

    try {
      let newTask

      if (accessToken) {
        if (
          !selectedProject?.id ||
          String(selectedProject.id).startsWith('local-') ||
          String(selectedProject.id).startsWith('preview-')
        ) {
          throw new Error(
            'This project is only local/preview. Select a project created on the backend.'
          )
        }

        if (!newTaskAssignee.trim()) {
          throw new Error('Enter the assigned developer ID.')
        }

        const response = await createTaskRequest({
          projectId: selectedProject.id,
          title: newTaskTitle.trim(),
          description: newTaskDescription.trim(),
          assignedTo: newTaskAssignee.trim(),
          priority: newTaskPriority.toLowerCase(),
          dueDate: newTaskDeadline,
        })

        const taskData = response?.task || response?.data || response

        const statusMap = {
          TODO: 'To Do',
          IN_PROGRESS: 'In Progress',
          SUBMITTED: 'Submitted',
          COMPLETED: 'Completed',
          CANCELLED: 'Cancelled',
        }

        newTask = {
          id: taskData.id || taskData._id,
          projectId: selectedProject.id,
          title: taskData.title || newTaskTitle.trim(),
          project: selectedProject.name,
          description: taskData.description || newTaskDescription.trim(),
          status: statusMap[String(taskData.status || 'TODO').toUpperCase()] || 'To Do',
          priority: newTaskPriority,
          deadline: taskData.dueDate || taskData.deadline || newTaskDeadline,
          color: selectedProject.color || 'purple',
        }
      } else {
        // Keep the Preview Dashboard's local-only demo working.
        newTask = {
          id: Date.now(),
          title: newTaskTitle.trim(),
          project: newTaskProject,
          description: newTaskDescription.trim(),
          status: newTaskStatus,
          priority: newTaskPriority,
          deadline: newTaskDeadline,
          color: 'purple',
        }
      }

      setTasks(previous => [...previous, newTask])
      setNewTaskTitle('')
      setNewTaskProject('')
      setNewTaskDescription('')
      setNewTaskStatus('To Do')
      setNewTaskPriority('Medium')
      setNewTaskDeadline('')
      setNewTaskAssignee('')
      setShowTaskModal(false)
    } catch (error) {
      window.alert(`Could not create task: ${error.message}`)
    }
  }

  async function toggleTask(title) {
    const task = tasks.find(item => item.title === title)
    if (!task) return

    const nextStatus = {
      'To Do': 'In Progress',
      'In Progress': 'Completed',
      'Completed': 'To Do',
    }

    const requestedStatus = nextStatus[task.status] || 'To Do'
    const accessToken = sessionStorage.getItem('orbit-access-token')

    try {
      let finalStatus = requestedStatus

      if (accessToken) {
        const taskId = task.id
        const localOnly =
          !taskId ||
          typeof taskId === 'number' ||
          String(taskId).startsWith('local-') ||
          String(taskId).startsWith('preview-')

        if (localOnly) {
          throw new Error(
            'This is a local preview task. A backend task ID is required to update it on the server.'
          )
        }

        const response = await updateTaskStatusRequest(
          taskId,
          requestedStatus
        )

        const updated = response?.task || response?.data || response
        const statusMap = {
          TODO: 'To Do',
          IN_PROGRESS: 'In Progress',
          SUBMITTED: 'Submitted',
          COMPLETED: 'Completed',
          CANCELLED: 'Cancelled',
        }

        finalStatus =
          statusMap[String(updated?.status || '').toUpperCase()] ||
          requestedStatus
      }

      setTasks(previous =>
        previous.map(item =>
          item.id === task.id
            ? { ...item, status: finalStatus }
            : item
        )
      )
    } catch (error) {
      window.alert(`Could not update task status: ${error.message}`)
    }
  }


  async function handleSignOut() {
    const refreshTokenValue = sessionStorage.getItem('orbit-refresh-token')

    try {
      if (refreshTokenValue) {
        await logout(refreshTokenValue)
      }
    } catch (error) {
      console.warn('Server sign-out failed; clearing local session.', error.message)
    } finally {
      sessionStorage.removeItem('orbit-access-token')
      sessionStorage.removeItem('orbit-refresh-token')
      sessionStorage.removeItem('orbit-organisation-id')

      setShowProfileMenu(false)
      setIsLoggedIn(false)
      setUserEmail('')
      setUserRole('developer')
      setActivePage('overview')
      setShowLanding(true)
      window.history.replaceState({}, document.title, '/')
    }
  }

  function inviteTeam() {
    setInviteEmail('')
    setInviteRole('developer')
    setInviteOrgId(sessionStorage.getItem('orbit-organisation-id') || '')
    setInviteAccessCode('')
    setInviteUsername('')
    setInvitePassword('')
    setInviteOtp('')
    setInviteStage('join')
    setInviteError('')
    setInviteSuccess('')
    setShowInviteModal(true)
  }

  async function sendInvitation(event) {
    event.preventDefault()
    setInviteError('')
    setInviteSuccess('')

    const email = inviteEmail.trim().toLowerCase()

    if (
      !inviteOrgId.trim() ||
      !inviteAccessCode.trim() ||
      !inviteUsername.trim() ||
      !invitePassword
    ) {
      setInviteError('Please complete all required fields.')
      return
    }

    setInviteSubmitting(true)

    try {
      const response = await joinOrganisation({
        orgId: inviteOrgId,
        accessCode: inviteAccessCode,
        email,
        username: inviteUsername,
        password: invitePassword,
      })

      if (response?.success === false) {
        throw new Error(response.message || 'Registration request failed.')
      }

      setInviteEmail(email)
      setInvitePassword('')
      setInviteOtp('')
      setInviteStage('otp')
      setInviteSuccess(
        response?.message ||
        'Registration started. Check your email for the verification code.'
      )
    } catch (error) {
      setInviteError(error.message || 'Could not start registration.')
    } finally {
      setInviteSubmitting(false)
    }
  }

  async function verifyInvitationOtp(event) {
    event.preventDefault()
    setInviteError('')
    setInviteSuccess('')

    if (!/^\\d{6}$/.test(inviteOtp)) {
      setInviteError('Enter the six-digit verification code.')
      return
    }

    setInviteSubmitting(true)

    try {
      const response = await verifyOrganisationOtp(inviteEmail, inviteOtp)

      if (response?.success === false) {
        throw new Error(response.message || 'OTP verification failed.')
      }

      setInviteStage('success')
      setInviteSuccess(
        response?.message || 'Email verified successfully.'
      )

      setInvitedMembers(previous => {
        if (previous.some(member => member.email === inviteEmail)) {
          return previous
        }

        return [
          ...previous,
          {
            email: inviteEmail,
            role: inviteRole,
            status: 'Verified',
          },
        ]
      })
    } catch (error) {
      setInviteError(error.message || 'OTP verification failed.')
    } finally {
      setInviteSubmitting(false)
    }
  }


  function sendMessage(event) {
    event.preventDefault()

    if (!message.trim()) return

    setMessages(previous => [
      ...previous,
      {
        name: userEmail ? userEmail.split('@')[0] : 'You',
        role: 'You',
        message: message.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        avatar: 'A',
        color: 'purple',
        channel: activeChannel
      }
    ])

    setMessage('')
  }

  if (!isLoggedIn && showLanding) {
    return (
      <Landing
        onGetStarted={() => setShowLanding(false)}
      />
    )
  }

  if (!isLoggedIn) {
    return (
      <Login
        onLoginSuccess={user => {
          setUserRole(user.role)
          setUserEmail(user.email)
          setIsLoggedIn(true)
        }}
        onPreviewDashboard={role => {
          setUserRole(role)
          setUserEmail('preview@orbit.local')
          setActivePage('overview')
          setIsLoggedIn(true)
        }}
      />
    )
  }

  return (
    <div
      className={`app ${dark ? 'dark' : 'light'} role-${userRole}`}
      id="home"
    >
      <div className="decor decor-top">✧</div>
      <div className="decor decor-bottom">·</div>
      <div className="decor decor-side">✧</div>

      <main className="dashboard-shell">
        <aside className="sidebar">

          <a className="brand" href="#home">
            <span className="brand-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48">
                <ellipse
                  cx="24"
                  cy="24"
                  rx="21"
                  ry="9"
                  transform="rotate(-30 24 24)"
                  fill="none"
                  stroke="#C4B5FD"
                  strokeWidth="3"
                />
                <circle cx="24" cy="24" r="10" fill="#8B5CF6" />
                <circle cx="20" cy="20" r="3" fill="#E9D5FF" />
              </svg>
            </span>
            orbit<span className="brand-dot">.</span>
          </a>


          <p className="menu-label">YOUR WORKSPACE</p>

          <nav className="navigation">
            <a
              className={`nav-item ${activePage === 'overview' ? 'active' : ''
                }`}
              href="#home"
              onClick={() => setActivePage('overview')}
            >
              <span>⌂</span> Home
              {activePage === 'overview' && <b>↗</b>}
            </a>


            <a
              className={`nav-item ${activePage === 'my-tasks' || activePage === 'task-folder' ? 'active' : ''}`}
              href="#my-tasks"
              onClick={(event) => {
                event.preventDefault()
                setActivePage('my-tasks')
              }}
            >
              <span>▣</span> My Tasks
              {(activePage === 'my-tasks' || activePage === 'task-folder') && <b>↗</b>}
            </a>



            <button
              className={`nav-item ${activePage === 'submissions' ? 'active' : ''}`}
              onClick={() => setActivePage('submissions')}
            >
              <span>↗</span> Submissions
              {activePage === 'submissions' && <b>↗</b>}
            </button>

            <button
              className={`nav-item ${activePage === 'tickets' ? 'active' : ''}`}
              onClick={() => setActivePage('tickets')}
            >
              <span>◇</span> Tickets
              {activePage === 'tickets' && <b>↗</b>}
            </button>

            <button
              className={`nav-item ${activePage === 'calendar' ? 'active' : ''}`}
              onClick={() => setActivePage('calendar')}
            >
              <span>▦</span> Calendar
              {activePage === 'calendar' && <b>↗</b>}
            </button>

            {userRole === 'product-manager' && (
              <a
                className="nav-item"
                href="#team"
                onClick={() => setActivePage('overview')}
              >
                <span>♧</span> Team Management
              </a>
            )}

            {userRole === 'senior-manager' && (
              <button
                className={`nav-item ${activePage === 'analytics' ? 'active' : ''
                  }`}
                onClick={() => setActivePage('analytics')}
              >
                <span>◷</span> Executive Analytics
                {activePage === 'analytics' && <b>↗</b>}
              </button>
            )}

            <a
              className="nav-item"
              href="#chat"
              onClick={() => setActivePage('overview')}
            >
              <span>▤</span> Team Chat
            </a>

            {userRole !== 'senior-manager' && (
              <button
                className={`nav-item ${activePage === 'analytics' ? 'active' : ''
                  }`}
                onClick={() => setActivePage('analytics')}
              >
                <span>◷</span> Analytics
                {activePage === 'analytics' && <b>↗</b>}
              </button>
            )}
          </nav>

          <div className="sidebar-bottom">
            <div className="profile">
              <div className="avatar">A</div>
              <div className="profile-info">
                <strong>{userEmail.split('@')[0]}</strong>
                <span>
                  {userRole === 'product-manager'
                    ? 'Product Manager'
                    : userRole === 'senior-manager'
                      ? 'Senior Manager'
                      : 'Developer'}
                </span>
              </div>

              <span className="profile-menu">•••</span>
            </div>
          </div>
        </aside>

        <section className="workspace">
          <header className="topbar">
            <div className="breadcrumb">
              Workspace <span>/</span>{' '}
              {activePage === 'analytics' ? 'Analytics' : 'Overview'}
            </div>

            <div className="top-actions">
              <label className="search-box">
                <span>⌕</span>

                <input
                  type="search"
                  placeholder="Search projects or tasks..."
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                />

                {search && (
                  <button
                    type="button"
                    className="clear-search"
                    onClick={() => setSearch('')}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </label>

              <button
                className="icon-button"
                onClick={() => setDark(previous => !previous)}
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {dark ? '☀️' : '🌙'}
              </button>

              {userRole === 'developer' && (
                <button
                  type="button"
                  className="invite-team-button"
                  onClick={inviteTeam}
                >
                  + Invite teammates
                </button>
              )}

              <div className="profile-avatar-wrap">
                <button
                  type="button"
                  className="avatar top-avatar"
                  aria-label="Open profile menu"
                  aria-haspopup="menu"
                  aria-expanded={showProfileMenu}
                  title="Profile"
                  onClick={() => setShowProfileMenu(open => !open)}
                >
                  {((userEmail || 'A').trim().charAt(0) || 'A').toUpperCase()}
                </button>

                {showProfileMenu && (
                  <div className="profile-dropdown" role="menu">
                    <div className="profile-dropdown-details">
                      <strong>{userEmail ? userEmail.split('@')[0] : 'Orbit user'}</strong>
                      <span>{userEmail || 'No email available'}</span>
                      <small>
                        {userRole === 'product-manager'
                          ? 'Product Manager'
                          : userRole === 'senior-manager'
                            ? 'Senior Manager'
                            : 'Developer'}
                      </small>
                    </div>

                    <button
                      type="button"
                      className="profile-signout-button"
                      role="menuitem"
                      onClick={handleSignOut}
                    >
                      <span aria-hidden="true">↪</span>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {activePage === 'submissions' ? (
            <Submissions onBack={() => setActivePage('overview')} />
          ) : activePage === 'calendar' ? (
            <Calendar tasks={tasks} />
          ) : activePage === 'analytics' ? (
            <AnalyticsPage
              projects={projects}
              tasks={tasks}
              onBack={() => setActivePage('overview')}
            />
          ) : activePage === 'my-tasks' || activePage === 'task-folder' ? (
            <MyTasksPage
              tasks={tasks}
              toggleTask={toggleTask}
              addTask={addTask}
              onBack={() => setActivePage('overview')}
            />
          ) : (
            <>
              <section className="hero">
                <div className="hero-copy">
                  <span className="eyebrow">
                    {currentHero.eyebrow}
                  </span>

                  <h1>
                    {currentHero.title}
                    <br />
                    <span>{currentHero.highlight}</span>
                  </h1>

                  <p>{currentHero.description}</p>

                  <div className="hero-actions">
                    {userRole !== 'senior-manager' && (
                           <button
          type="button"
          className="text-button"
          onClick={() => {
            setNewTaskProject('')
            setShowTaskModal(true)
          }}
        >
          + Add task
        </button>
                    )}

                    <a className="secondary-button" href="#tasks">
                      Explore tasks ↗
                    </a>
                  </div>
                </div>

                <div className="hero-art" aria-hidden="true">
                  <span className="hero-spark spark-one">✦</span>
                  <span className="hero-spark spark-two">✧</span>
                  <div className="hero-orbit orbit-one" />
                  <div className="hero-orbit orbit-two" />

                  <div className="hero-orbit-core" aria-hidden="true">
                    <svg viewBox="0 0 100 100" className="hero-network-icon">
                      {/* Connecting lines */}
                      <g
                        stroke="#C4B5FD"
                        strokeWidth="2"
                        strokeOpacity="0.8"
                        fill="none"
                      >
                        <path d="M50 50 L22 25" />
                        <path d="M50 50 L78 23" />
                        <path d="M50 50 L80 72" />
                        <path d="M50 50 L22 77" />
                        <path d="M22 25 L78 23" strokeOpacity="0.35" />
                        <path d="M22 77 L80 72" strokeOpacity="0.35" />
                      </g>

                      {/* Center node */}
                      <path
                        d="M50 36 L64 50 L50 64 L36 50 Z"
                        fill="#A78BFA"
                        stroke="#E9D5FF"
                        strokeWidth="2"
                      />

                      {/* Connected team nodes */}
                      <circle cx="22" cy="25" r="7" fill="#F472B6" />
                      <circle cx="78" cy="23" r="7" fill="#67E8F9" />
                      <circle cx="80" cy="72" r="7" fill="#C4B5FD" />
                      <circle cx="22" cy="77" r="7" fill="#F9A8D4" />

                      {/* Tiny highlights */}
                      <circle cx="22" cy="25" r="2" fill="#FFFFFF" />
                      <circle cx="78" cy="23" r="2" fill="#FFFFFF" />
                      <circle cx="80" cy="72" r="2" fill="#FFFFFF" />
                      <circle cx="22" cy="77" r="2" fill="#FFFFFF" />
                    </svg>
                  </div>

                  <span className="hero-note note-one">
                    {currentHero.note1}
                  </span>
                  <span className="hero-note note-two">
                    {currentHero.note2}
                  </span>
                </div>
              </section>

              <div className="section-heading">
                <div>
                  <span className="eyebrow">
                    YOUR WORK AT A GLANCE
                  </span>

                  <h2>
                    {userRole === 'developer'
                      ? 'Developer Workspace'
                      : userRole === 'product-manager'
                        ? 'Product Workspace'
                        : 'Executive Overview'}
                  </h2>
                </div>

                <span className="date-label">
                  {new Date().toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>

              <section className="stats-grid">
                <article className="stat-card purple-card">
                  <div className="stat-top">
                    <span>
                      {userRole === 'developer'
                        ? 'My Projects'
                        : userRole === 'product-manager'
                          ? 'Portfolio Projects'
                          : 'Projects in Portfolio'}
                    </span>
                    <span className="stat-icon">◈</span>
                  </div>
                  <div className="stat-number">{projects.length}</div>
                  <div className="stat-note">
                    {userRole === 'developer'
                      ? 'Projects in your workspace'
                      : userRole === 'product-manager'
                        ? 'Projects to coordinate'
                        : 'Total projects tracked'}
                  </div>
                </article>

                <article className="stat-card lime-card">
                  <div className="stat-top">
                    <span>
                      {userRole === 'developer'
                        ? 'Tasks Completed'
                        : userRole === 'product-manager'
                          ? 'Delivery Progress'
                          : 'Completed Tasks'}
                    </span>
                    <span className="stat-icon">✓</span>
                  </div>
                  <div className="stat-number">
                    {completed}
                    <span className="stat-total">
                      {' '}/ {tasks.length}
                    </span>
                  </div>
                  <div className="mini-progress">
                    <span style={{ width: `${completionRate}%` }} />
                  </div>
                  <div className="stat-note">
                    {completionRate}% overall completion
                  </div>
                </article>

                <article className="stat-card coral-card">
                  <div className="stat-top">
                    <span>
                      {userRole === 'developer'
                        ? 'In Progress'
                        : userRole === 'product-manager'
                          ? 'Tasks In Progress'
                          : 'Active Work'}
                    </span>
                    <span className="stat-icon">↗</span>
                  </div>
                  <div className="stat-number">{inProgress}</div>
                  <div className="stat-note">
                    {userRole === 'developer'
                      ? 'Your ongoing tasks'
                      : userRole === 'product-manager'
                        ? 'Tasks currently underway'
                        : 'Tasks currently in progress'}
                  </div>
                </article>

                <article className="stat-card coral-card" id="team">
                  <div className="stat-top">
                    <span>
                      {userRole === 'developer'
                        ? 'To Do'
                        : userRole === 'product-manager'
                          ? 'Pending Tasks'
                          : 'Outstanding Tasks'}
                    </span>
                    <span className="stat-icon">◷</span>
                  </div>
                  <div className="stat-number">{toDo}</div>
                  <div className="stat-note">
                    {userRole === 'developer'
                      ? 'Tasks waiting for you'
                      : userRole === 'product-manager'
                        ? 'Tasks awaiting action'
                        : 'Tasks not yet completed'}
                  </div>
                </article>
              </section>

              {userRole === 'senior-manager' ? (
                <div className="right-column">
                  <section className="panel activity-panel executive-activity-panel">
                    <div className="panel-heading">
                      <div>
                        <span className="eyebrow">PORTFOLIO SNAPSHOT</span>
                        <h2>Delivery Overview</h2>
                        <p>A quick look at the current workspace workload.</p>
                      </div>
                    </div>

                    <div className="activity-stat">
                      <div className="activity-circle purple-circle">◈</div>
                      <div>
                        <span>Projects tracked</span>
                        <strong>{projects.length} projects</strong>
                      </div>
                    </div>

                    <div className="activity-stat">
                      <div className="activity-circle lime-circle">✓</div>
                      <div>
                        <span>Tasks completed</span>
                        <strong>{completed} completed</strong>
                      </div>
                    </div>

                    <div className="activity-stat">
                      <div className="activity-circle coral-circle">◷</div>
                      <div>
                        <span>Tasks outstanding</span>
                        <strong>{toDo + inProgress} remaining</strong>
                      </div>
                    </div>

                    <a className="activity-link" href="#executive-insights">
                      View portfolio insights ↗
                    </a>
                  </section>

                  <section className="panel activity-panel executive-health-panel">
                    <div className="panel-heading">
                      <div>
                        <span className="eyebrow">DELIVERY STATUS</span>
                        <h2>Completion Rate</h2>
                        <p>Based on tasks currently in the workspace.</p>
                      </div>
                    </div>

                    <div className="activity-stat">
                      <div className="activity-circle purple-circle">↗</div>
                      <div>
                        <span>Overall completion</span>
                        <strong>{completionRate}%</strong>
                      </div>
                    </div>

                    <div
                      className="mini-progress"
                      role="progressbar"
                      aria-valuenow={completionRate}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Overall task completion"
                    >
                      <span style={{ width: `${completionRate}%` }} />
                    </div>

                    <p className="empty-state">
                      {tasks.length === 0
                        ? 'Add project tasks to start tracking delivery progress.'
                        : completionRate === 100
                          ? 'All currently tracked tasks are complete.'
                          : 'Progress updates as tasks change status.'}
                    </p>
                  </section>
                </div>
              ) : (
              <div className="right-column">
                  <section className="panel chat-panel" id="chat">
                    <div className="panel-heading">
                      <div>
                        <h2>Project’s Chat</h2>
                        <p>
                          A little teamwork goes a long way.
                        </p>
                      </div>

                      <span className="chat-live">
                        <i /> Live
                      </span>
                    </div>

                    <div className="chat-channels">
                      {['General', 'Design', 'Dev'].map(channel => (
                        <button
                          key={channel}
                          type="button"
                          className={`channel ${activeChannel === channel ? 'active' : ''
                            }`}
                          onClick={() => setActiveChannel(channel)}
                        >
                          {channel}
                        </button>
                      ))}
                    </div>

                    <div className="message-list">
                      {messages
                        .filter(
                          item =>
                            !item.channel ||
                            item.channel === activeChannel
                        )
                        .map((item, index) => (
                          <article
                            className="message-item"
                            key={`${item.name}-${index}`}
                          >
                            <div
                              className={`message-avatar ${item.color}`}
                            >
                              {item.avatar}
                            </div>

                            <div className="message-content">
                              <div className="message-heading">
                                <strong>{item.name}</strong>
                                <time>{item.time}</time>
                              </div>

                              <span className="message-role">
                                {item.role}
                              </span>

                              <p>{item.message}</p>
                            </div>
                          </article>
                        ))}
                    </div>

                    <form
                      className="message-form"
                      onSubmit={sendMessage}
                    >
                      <input
                        value={message}
                        onChange={event =>
                          setMessage(event.target.value)
                        }
                        placeholder="Write a message..."
                        aria-label="Write a message"
                      />

                      <button
                        type="submit"
                        aria-label="Send message"
                      >
                        ↗
                      </button>
                    </form>
                  </section>

                  <Chat />

                  <section className="panel activity-panel" id="activity">
                    <div className="panel-heading">
                      <div>
                        <h2>Project activity</h2>
                        <p>
                          Little wins worth celebrating.
                        </p>
                      </div>

                      <span className="activity-badge">
                        This week
                      </span>
                    </div>

                    <div className="activity-stat">
                      <div className="activity-circle purple-circle">
                        ↗
                      </div>

                      <div>
                        <span>Project updates</span>
                        <strong>12 updates</strong>
                      </div>
                    </div>

                    <div className="activity-stat">
                      <div className="activity-circle lime-circle">
                        ✓
                      </div>

                      <div>
                        <span>Tasks completed</span>
                        <strong>{completed} completed</strong>
                      </div>
                    </div>

                    <div className="activity-stat">
                      <div className="activity-circle coral-circle">
                        ◷
                      </div>

                      <div>
                        <span>Tasks in progress</span>
                        <strong>{inProgress} in progress</strong>
                      </div>
                    </div>

                    <a className="activity-link" href="#tasks">
                      Check team tasks ↗
                    </a>
                  </section>
              </div>

              )}

              {userRole === 'senior-manager' ? (
                <section className="panel tasks-panel executive-insights-panel" id="executive-insights">
                  <div className="panel-heading">
                    <div>
                      <span className="eyebrow">EXECUTIVE OVERVIEW</span>
                      <h2>Portfolio Insights</h2>
                      <p>A quick view of delivery, workload and project progress.</p>
                    </div>
                  </div>

                  <div className="task-status-cards">
                    <article className="task-status-card">
                      <span className="task-status-icon">◈</span>
                      <span className="task-status-title">Projects tracked</span>
                      <strong>{projects.length}</strong>
                      <small>Across your portfolio</small>
                    </article>

                    <article className="task-status-card">
                      <span className="task-status-icon">✓</span>
                      <span className="task-status-title">Delivery progress</span>
                      <strong>{completionRate}%</strong>
                      <small>{completed} of {tasks.length} tasks completed</small>
                    </article>

                    <article className="task-status-card">
                      <span className="task-status-icon">↗</span>
                      <span className="task-status-title">Active workload</span>
                      <strong>{inProgress}</strong>
                      <small>Tasks in progress</small>
                    </article>
                  </div>

                  <div className="task-filter-heading">
                    <div>
                      <h3>Workload Breakdown</h3>
                      <p>Current task distribution across the workspace.</p>
                    </div>
                  </div>

                  <div className="mini-progress" role="progressbar" aria-valuenow={completionRate} aria-valuemin={0} aria-valuemax={100} aria-label="Overall task completion">
                    <span style={{ width: `${completionRate}%` }} />
                  </div>

                  <div className="task-summary">
                    <span>Pending: <strong>{toDo}</strong></span>
                    <span>In Progress: <strong>{inProgress}</strong></span>
                    <span>Completed: <strong>{completed}</strong></span>
                  </div>

                  <p className="empty-state">
                    Portfolio insights are based on the projects and tasks currently available in this workspace.
                  </p>
                </section>
              ) : (
              <section className="panel tasks-panel" id="tasks">
                <div className="panel-heading">
                  <div>
                    <h2>
                      {userRole === 'developer'
                        ? 'My Tasks'
                        : 'Team Tasks'}
                    </h2>

                    <p>
                      Click a task to update its status.
                    </p>
                  </div>

                  <button
                    className="text-button"
                    onClick={addTask}
                  >
                    + Add task
                  </button>
                </div>

                <div className="task-status-cards">
                  {[
                    { title: 'Completed', status: 'Completed', icon: '✓' },
                    { title: 'Not Completed', status: 'To Do', icon: '○' },
                    { title: 'In Progress', status: 'In Progress', icon: '↗' }
                  ].map(item => {
                    const count = filteredTasks.filter(
                      task => task.status === item.status
                    ).length

                    return (
                      <button
                        type="button"
                        key={item.status}
                        className={`task-status-card ${selectedTaskStatus === item.status ? 'selected' : ''}`}
                        onClick={() => setSelectedTaskStatus(item.status)}
                      >
                        <span className="task-status-icon">{item.icon}</span>
                        <span className="task-status-title">{item.title}</span>
                        <strong>{count}</strong>
                        <small>View tasks ↗</small>
                      </button>
                    )
                  })}
                </div>

                <div className="task-filter-heading">
                  <div>
                    <h3>{selectedTaskStatus === 'To Do' ? 'Not Completed Tasks' : selectedTaskStatus + ' Tasks'}</h3>
                    <p>Choose a priority to narrow down your tasks.</p>
                  </div>

                  <div className="priority-filters">
                    {['All', 'High', 'Medium', 'Low'].map(priority => (
                      <button
                        type="button"
                        key={priority}
                        className={`priority-filter ${selectedPriority === priority ? 'active' : ''}`}
                        onClick={() => setSelectedPriority(priority)}
                      >
                        {priority === 'All' ? 'All priorities' : priority}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="task-demo-list">
                  {filteredTasks
                    .filter(task => task.status === selectedTaskStatus)
                    .filter(task => selectedPriority === 'All' || (task.priority || 'Medium') === selectedPriority)
                    .map(task => (
                      <button
                        type="button"
                        className="task-demo-card"
                        key={task.id || task.title}
                        onClick={() => toggleTask(task.title)}
                        title="Click to cycle task status"
                      >
                        <span className={`task-check ${task.status === 'Completed' ? 'checked' : ''}`}>
                          {task.status === 'Completed' ? '✓' : ''}
                        </span>

                        <span className="task-demo-info">
                          <strong>{task.title}</strong>
                          <span>Project: {task.project || 'General'}</span>
                        </span>

                        <span className={`task-priority priority-${(task.priority || 'Medium').toLowerCase()}`}>
                          {task.priority || 'Medium'} Priority
                        </span>

                        <span className="task-demo-status">{task.status}</span>
                      </button>
                    ))}

                  {filteredTasks
                    .filter(task => task.status === selectedTaskStatus)
                    .filter(task => selectedPriority === 'All' || (task.priority || 'Medium') === selectedPriority)
                    .length === 0 && (
                      <p className="empty-state">
                        No tasks match these filters. Try another priority or add a task.
                      </p>
                    )}
                </div>

                <div className="task-summary">
                  <span>To Do: <strong>{toDo}</strong></span>
                  <span>In Progress: <strong>{inProgress}</strong></span>
                  <span>Completed: <strong>{completed}</strong></span>
                </div>
              </section>
              )}


              <footer className="footer">
                <span>
                  Made for teams that make things happen <b>♥</b>
                </span>
                <span>One workspace. More possibilities.</span>
              </footer>
            </>
          )}
        </section>

{showTaskModal && (
  <div className="project-modal-backdrop">
    <div className="project-modal task-modal">
      <div className="project-modal-header">
        <div>
          <h2>Create New Task ✦</h2>
          <p>Add the details and assign it to a project.</p>
        </div>

        <button
          type="button"
          className="modal-close"
          onClick={() => setShowTaskModal(false)}
          aria-label="Close task form"
        >
          ×
        </button>
      </div>

      <form
        className="project-form"
        onSubmit={event => {
          event.preventDefault()
          addTask()
        }}
      >
        <label htmlFor="task-title">Task Title *</label>
        <input
          id="task-title"
          type="text"
          placeholder="e.g. Design landing page"
          value={newTaskTitle}
          onChange={event => setNewTaskTitle(event.target.value)}
          required
        />

        <label htmlFor="task-project">Project *</label>
        <select
          id="task-project"
          value={newTaskProject}
          onChange={event => setNewTaskProject(event.target.value)}
          required
        >
          <option value="">Select a project</option>
          {projects.map(project => (
            <option key={project.name} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>

        <label htmlFor="task-assignee">Assigned Developer ID</label>
        <input
          id="task-assignee"
          type="text"
          placeholder="Enter the developer's backend ID"
          value={newTaskAssignee}
          onChange={event => setNewTaskAssignee(event.target.value)}
        />

        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          placeholder="Describe what needs to be done..."
          value={newTaskDescription}
          onChange={event => setNewTaskDescription(event.target.value)}
        />

        <label htmlFor="task-priority">Priority</label>
        <select
          id="task-priority"
          value={newTaskPriority}
          onChange={event => setNewTaskPriority(event.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label htmlFor="task-status">Status</label>
        <select
          id="task-status"
          value={newTaskStatus}
          onChange={event => setNewTaskStatus(event.target.value)}
        >
          <option value="To Do">Not Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <label htmlFor="task-deadline">Due Date</label>
        <input
          id="task-deadline"
          type="date"
          value={newTaskDeadline}
          onChange={event => setNewTaskDeadline(event.target.value)}
        />

        <div className="project-form-actions">
          <button
            type="button"
            className="cancel-project-btn"
            onClick={() => setShowTaskModal(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="create-project-btn"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  </div>
)}

        {showProjectModal && (
          <div className="project-modal-backdrop">
            <div className="project-modal">
              <div className="project-modal-header">
                <div>
                  <h2>
                    {editingProject
                      ? 'Edit Project'
                      : 'Create New Project'}
                  </h2>

                  <p>
                    {editingProject
                      ? 'Update your project details.'
                      : 'Add a new project to your workspace.'}
                  </p>
                </div>

                <button
                  type="button"
                  className="modal-close"
                  onClick={() => {
                    setShowProjectModal(false)
                    setEditingProject(null)
                  }}
                  aria-label="Close project form"
                >
                  ×
                </button>
              </div>

              <form
                className="project-form"
                onSubmit={
                  editingProject ? updateProject : createProject
                }
              >
                <label htmlFor="project-name">
                  Project Name *
                </label>

                <input
                  id="project-name"
                  type="text"
                  placeholder="e.g. Website Redesign"
                  value={projectName}
                  onChange={event =>
                    setProjectName(event.target.value)
                  }
                  required
                />

                <label htmlFor="project-description">
                  Description
                </label>

                <textarea
                  id="project-description"
                  placeholder="What is this project about?"
                  value={projectDescription}
                  onChange={event =>
                    setProjectDescription(event.target.value)
                  }
                />

                <label htmlFor="team-name">
                  Team Name *
                </label>

                <input
                  id="team-name"
                  type="text"
                  placeholder="e.g. Design Team"
                  value={teamName}
                  onChange={event =>
                    setTeamName(event.target.value)
                  }
                  required
                />


                <label>Project Color</label>

                <div className="project-color-palette">
                  {[
                    { name: 'purple', hex: '#8B5CF6' },
                    { name: 'pink', hex: '#EC4899' },
                    { name: 'cyan', hex: '#06B6D4' },
                    { name: 'blue', hex: '#3B82F6' },
                    { name: 'lime', hex: '#84CC16' },
                    { name: 'coral', hex: '#F97373' },
                    { name: 'orange', hex: '#F97316' },
                    { name: 'indigo', hex: '#6366F1' },
                    { name: 'mint', hex: '#10B981' },
                    { name: 'lavender', hex: '#C4B5FD' },
                    { name: 'red', hex: '#EF4444' },
                    { name: 'slate', hex: '#64748B' }
                  ].map(color => (
                    <button
                      key={color.name}
                      type="button"
                      className={`project-color-swatch ${projectColor === color.name ? 'selected' : ''
                        }`}
                      style={{ '--swatch-color': color.hex }}
                      onClick={() => setProjectColor(color.name)}
                      title={color.name}
                      aria-label={`Select ${color.name}`}
                      aria-pressed={projectColor === color.name}
                    >
                      {projectColor === color.name && '✓'}
                    </button>
                  ))}
                </div>

                <p className="selected-color-label">
                  Selected: {projectColor.charAt(0).toUpperCase() + projectColor.slice(1)}
                </p>


                <div className="project-form-actions">
                  <button
                    type="button"
                    className="cancel-project-btn"
                    onClick={() => {
                      setShowProjectModal(false)
                      setEditingProject(null)
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="create-project-btn"
                  >
                    {editingProject
                      ? 'Save Changes'
                      : 'Create Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showInviteModal && (
          <div className="project-modal-backdrop">
            <div className="project-modal invite-modal">
              <div className="project-modal-header">
                <div>
                  <h2>Bring your team together ✨</h2>
                  <p>Invite someone to collaborate in Orbit.</p>
                </div>

                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setShowInviteModal(false)}
                  aria-label="Close invitation form"
                >
                  ×
                </button>
              </div>

              {inviteStage === 'join' ? (
                <form className="project-form" onSubmit={sendInvitation}>
                  <label htmlFor="invite-org-id">Organisation ID *</label>
                  <input
                    id="invite-org-id"
                    value={inviteOrgId}
                    onChange={event => setInviteOrgId(event.target.value)}
                    placeholder="e.g. ORB-BEC85A"
                    required
                  />

                  <label htmlFor="invite-access-code">Role access code *</label>
                  <input
                    id="invite-access-code"
                    type="password"
                    value={inviteAccessCode}
                    onChange={event => setInviteAccessCode(event.target.value)}
                    placeholder="Enter the code for this role"
                    autoComplete="off"
                    required
                  />

                  <label htmlFor="invite-username">Username *</label>
                  <input
                    id="invite-username"
                    value={inviteUsername}
                    onChange={event => setInviteUsername(event.target.value)}
                    placeholder="Choose a username"
                    minLength={3}
                    maxLength={40}
                    required
                  />

                  <label htmlFor="invite-email">Teammate's email *</label>
                  <input
                    id="invite-email"
                    type="email"
                    value={inviteEmail}
                    onChange={event => setInviteEmail(event.target.value)}
                    placeholder="teammate@example.com"
                    required
                  />

                  <label htmlFor="invite-role">Choose their role</label>
                  <select
                    id="invite-role"
                    value={inviteRole}
                    onChange={event => setInviteRole(event.target.value)}
                  >
                    <option value="developer">Developer</option>
                    <option value="product-manager">Product Manager</option>
                    <option value="senior-manager">Senior Manager</option>
                  </select>

                  <p className="invite-hint">
                    Use the access code assigned to the selected role.
                  </p>

                  <label htmlFor="invite-password">Password *</label>
                  <input
                    id="invite-password"
                    type="password"
                    value={invitePassword}
                    onChange={event => setInvitePassword(event.target.value)}
                    placeholder="At least 12 characters"
                    minLength={12}
                    maxLength={128}
                    autoComplete="new-password"
                    required
                  />

                  {inviteError && <p className="invite-error" role="alert">{inviteError}</p>}
                  {inviteSuccess && <p className="invite-success" role="status">{inviteSuccess}</p>}

                  <div className="project-form-actions">
                    <button
                      type="button"
                      className="cancel-project-btn"
                      onClick={() => setShowInviteModal(false)}
                    >
                      Close
                    </button>
                    <button type="submit" className="create-project-btn" disabled={inviteSubmitting}>
                      {inviteSubmitting ? 'Sending code...' : 'Continue to verification'}
                    </button>
                  </div>
                </form>
              ) : inviteStage === 'otp' ? (
                <form className="project-form" onSubmit={verifyInvitationOtp}>
                  <h3>Verify your email ✉</h3>
                  <p>Enter the six-digit code sent to <strong>{inviteEmail}</strong>.</p>

                  <label htmlFor="invite-otp">Verification code *</label>
                  <input
                    id="invite-otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={inviteOtp}
                    onChange={event => setInviteOtp(event.target.value.replace(/\\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    minLength={6}
                    maxLength={6}
                    pattern="[0-9]{6}"
                    required
                  />

                  {inviteError && <p className="invite-error" role="alert">{inviteError}</p>}
                  {inviteSuccess && <p className="invite-success" role="status">{inviteSuccess}</p>}

                  <div className="project-form-actions">
                    <button
                      type="button"
                      className="cancel-project-btn"
                      disabled={inviteSubmitting}
                      onClick={() => {
                        setInviteStage('join')
                        setInviteError('')
                        setInviteSuccess('')
                      }}
                    >
                      Back
                    </button>
                    <button type="submit" className="create-project-btn" disabled={inviteSubmitting}>
                      {inviteSubmitting ? 'Verifying...' : 'Verify OTP'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="project-form" role="status">
                  <h3>You're all set ✨</h3>
                  <p>{inviteSuccess}</p>
                  <div className="project-form-actions">
                    <button
                      type="button"
                      className="cancel-project-btn"
                      onClick={() => setShowInviteModal(false)}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}

              <div className="invited-members">
                <h3>Current organisation members</h3>

                {membersLoading && <p>Loading members...</p>}

                {membersError && (
                  <p className="invite-error" role="alert">
                    {membersError}
                  </p>
                )}

                {!membersLoading && !membersError && backendMembers.length === 0 && (
                  <p>No members returned by the API.</p>
                )}

                {backendMembers.map((member, index) => (
                  <div
                    className="invited-member"
                    key={member.id || member.email || member.username || `member-${index}`}
                  >
                    <div>
                      <strong>{member.username || member.email || 'Member'}</strong>
                      <span>{member.email}</span>
                    </div>

                    <span>{member.role}</span>
                  </div>
                ))}
              </div>

              {invitedMembers.length > 0 && (
                <div className="invited-members">
                  <h3>Invited teammates</h3>

                  {invitedMembers.map(member => (
                    <div className="invited-member" key={member.email}>
                      <div>
                        <strong>{member.email}</strong>
                        <span>{member.role.replace('-', ' ')}</span>
                      </div>

                      <span className="invite-pending">
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

export default App
