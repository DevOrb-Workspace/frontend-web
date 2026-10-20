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

import './Analytics.css'
import { useEffect, useState } from 'react'
import './App.css'
import Login from './Login'
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
  { title: 'Create dashboard wireframes', project: 'Website Redesign', status: 'In Progress', color: 'purple' },
  { title: 'Fix login page bugs', project: 'Mobile App', status: 'To Do', color: 'coral' },
  { title: 'Review pull requests', project: 'AI Assistant', status: 'Completed', color: 'lime' }
]

const initialMessages = [
  { name: 'Riya Sharma', role: 'Design team', message: 'Uploaded the latest wireframes ✨', time: '10:42 AM', avatar: 'R', color: 'purple' },
  { name: 'Kabir Mehta', role: 'Development', message: 'The new dashboard is coming together!', time: '10:35 AM', avatar: 'K', color: 'lime' },
  { name: 'Sana Khan', role: 'Research team', message: 'Shared the project update with everyone.', time: '10:18 AM', avatar: 'S', color: 'coral' }
]

function AnalyticsPage({ projects, tasks, onBack }) {
  const completed = tasks.filter(task => task.status === 'Completed').length
  const inProgress = tasks.filter(task => task.status === 'In Progress').length
  const toDo = tasks.filter(task => task.status === 'To Do').length

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
                <Bar dataKey="tasks" fill="#a78bfa" radius={[6, 6, 0, 0]} />
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
            {statusData.length ? (
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
                      <Cell key={item.name} fill={item.color} />
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

      <section className="panel analytics-panel"></section> 
      <section className="panel analytics-panel">
        <div className="panel-heading">
          <div>
            <h2>Project progress</h2>
            <p>Progress across your projects</p>
          </div>
        </div>

        {projects.map(project => (
          <div className="project-analytics-row" key={project.name}>
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

      <button className="secondary-button analytics-back" onClick={onBack}>
        ← Back to overview
      </button>
    </div>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [dark, setDark] = useState(
    () => localStorage.getItem('team-theme') === 'dark'
  )
  const [activePage, setActivePage] = useState('overview')
  const [search, setSearch] = useState('')
  const [projects, setProjects] = useState(() => {
  const saved = localStorage.getItem('orbit-projects')
  return saved ? JSON.parse(saved) : initialProjects
})

const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem('orbit-tasks')
  return saved ? JSON.parse(saved) : initialTasks
})
  const [messages, setMessages] = useState(initialMessages)
  const [message, setMessage] = useState('')

  useEffect(() => {
  localStorage.setItem('orbit-projects', JSON.stringify(projects))
}, [projects])

useEffect(() => {
  localStorage.setItem('orbit-tasks', JSON.stringify(tasks))
}, [tasks])
  const query = search.toLowerCase()

  const filteredProjects = projects.filter(project =>
    `${project.name} ${project.team}`.toLowerCase().includes(query)
  )

  const filteredTasks = tasks.filter(task =>
    `${task.title} ${task.project} ${task.status}`.toLowerCase().includes(query)
  )

  const completed = tasks.filter(task => task.status === 'Completed').length
  const completionRate = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0

  function addProject() {
    const name = prompt('Enter your new project name:')
    if (!name?.trim()) return

    const colors = ['purple', 'lime', 'coral']
    setProjects(previous => [
      ...previous,
      {
        name: name.trim(),
        team: 'New Team',
        progress: 0,
        color: colors[previous.length % colors.length],
        image:
          'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=80'
      }
    ])
  }

  function addTask() {
    const title = prompt('Enter your new task:')
    if (!title?.trim()) return

    setTasks(previous => [
      ...previous,
      {
        title: title.trim(),
        project: 'General',
        status: 'To Do',
        color: 'purple'
      }
    ])
  }

  function toggleTask(title) {
    setTasks(previous =>
      previous.map(task =>
        task.title === title
          ? {
              ...task,
              status: task.status === 'Completed' ? 'To Do' : 'Completed'
            }
          : task
      )
    )
  }

  function inviteTeam() {
    const email = prompt('Enter your teammate’s email address:')
    if (!email) return

    if (email.includes('@')) {
      alert(`Invitation prepared for ${email}. Connect a backend to send it.`)
    } else {
      alert('Please enter a valid email address.')
    }
  }

  function sendMessage(event) {
    event.preventDefault()
    if (!message.trim()) return

    setMessages(previous => [
      ...previous,
      {
        name: 'Aayushi',
        role: 'You',
        message: message.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        avatar: 'A',
        color: 'purple'
      }
    ])
    setMessage('')
  }

  if (!isLoggedIn) {
  return (
    <Login
      onLoginSuccess={() => setIsLoggedIn(true)}
    />
  )
}
  return (
    <div className={`app ${dark ? 'dark' : 'light'}`} id="home">
      <div className="decor decor-top">✦</div>
      <div className="decor decor-bottom">✳</div>
      <div className="decor decor-side">✦</div>

      <main className="dashboard-shell">
        <aside className="sidebar">
          <a className="brand" href="#home">
            <span className="brand-icon">✳</span>
            orbit<span className="brand-dot">.</span>
          </a>

       
          <p className="menu-label">YOUR WORKSPACE</p>

          <nav className="navigation">
            <a
              className={`nav-item ${activePage === 'overview' ? 'active' : ''}`}
              href="#home"
              onClick={() => setActivePage('overview')}
            >
              <span>⌂</span> Home
              {activePage === 'overview' && <b>↗</b>}
            </a>

            <a className="nav-item" href="#projects">
              <span>◈</span> My Projects
            </a>

            <a className="nav-item" href="#tasks">
              <span>✓</span> My Tasks
            </a>

            <a className="nav-item" href="#activity">
              <span>↗</span> Activity
            </a>

            <a className="nav-item" href="#team">
              <span>♧</span> Teams
            </a>

            <a className="nav-item" href="#chat">
              <span>▤</span> Project Chat
            </a>

            <button
              className={`nav-item ${activePage === 'analytics' ? 'active' : ''}`}
              onClick={() => setActivePage('analytics')}
            >
              <span>◷</span> Analytics
              {activePage === 'analytics' && <b>↗</b>}
            </button>
          </nav>

          <div className="sidebar-bottom">

            <div className="settings-card">
              <span>⚙</span> Settings
            </div>
            <button className="logout-button" onClick={inviteTeam}>
              <span>＋</span> Invite teammates
            </button>
            <div className="profile">
              <div className="avatar">A</div>
              <div className="profile-info">
                <strong>Aayushi</strong>
                <span>Team member</span>
              </div>
              <span className="profile-menu">•••</span>
            </div>
          </div>
        </aside>

        <section className="workspace">
          <header className="topbar">
            <div className="breadcrumb">
              Workspace <span>/</span> Overview
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
                onClick={() => setDark(!dark)}
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {dark ? '☀️' : '🌙'}
              </button>

              <div className="avatar top-avatar">A</div>
            </div>
          </header>
        

          {activePage === 'analytics' ? (
            <AnalyticsPage
              projects={projects}
              tasks={tasks}
              onBack={() => setActivePage('overview')}
            />
          ) : (
            <>
              <section className="hero">
         
            <div className="hero-copy">
              <span className="eyebrow">✦ YOUR TEAM WORKSPACE</span>
              <h1>
                Make room for
                <br />
                <span>great ideas.</span>
              </h1>
              <p>
                Your projects, people and progress—all in one place.
                Let’s make something amazing today.
              </p>
              <div className="hero-actions">
                <button className="primary-button" onClick={addProject}>
                  + New project
                </button>
                <a className="secondary-button" href="#tasks">
                  Explore tasks ↗
                </a>
              </div>
            </div>

            <div className="hero-art" aria-hidden="true">
              <span className="hero-spark spark-one">✦</span>
              <span className="hero-spark spark-two">✳</span>
              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />
              <div className="hero-orbit-core">✳</div>
              <span className="hero-note note-one">✦ Ideas in motion</span>
              <span className="hero-note note-two">● Team is building</span>
            </div>
          </section>

          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR WORK AT A GLANCE</span>
              <h2>Workspace overview</h2>
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
                <span>Active projects</span>
                <span className="stat-icon">◈</span>
              </div>
              <div className="stat-number">{projects.length}</div>
              <div className="stat-note">Projects in your workspace</div>
            </article>

            <article className="stat-card lime-card">
              <div className="stat-top">
                <span>Tasks completed</span>
                <span className="stat-icon">✓</span>
              </div>
              <div className="stat-number">
                {completed}<span className="stat-total"> / {tasks.length}</span>
              </div>
              <div className="mini-progress">
                <span style={{ width: `${completionRate}%` }} />
              </div>
              <div className="stat-note">{completionRate}% completion rate</div>
            </article>

            <article className="stat-card coral-card" id="team">
              <div className="stat-top">
                <span>Team members</span>
                <span className="stat-icon">♧</span>
              </div>
              <div className="stat-number">08</div>
              <div className="avatar-stack">
                <span>A</span><span>R</span><span>S</span><span>M</span><small>+4</small>
              </div>
            </article>
          </section>

          <section className="main-grid">
            <div className="panel projects-panel" id="projects">
              <div className="panel-heading">
                <div>
                  <h2>My Projects</h2>
                  <p>{filteredProjects.length} projects in motion</p>
                </div>
                <button className="text-button" onClick={addProject}>
                  + Add project
                </button>
              </div>

              <div className="project-grid">
                {filteredProjects.map(project => (
                  <article className="project-card" key={project.name}>
                    <img
                      className="project-image"
                      src={project.image}
                      alt={`${project.name} project`}
                      loading="lazy"
                    />
                    <div className="project-card-content">
                      <span className={`project-tag ${project.color}`}>
                        {project.team}
                      </span>
                      <h3>{project.name}</h3>
                      <div className="project-meta">
                        <span>◷ Updated recently</span>
                        <span>♧ Team project</span>
                      </div>
                      <div className="project-progress">
                        <span
                          className={project.color}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className="project-card-bottom">
                        <span>Project progress</span>
                        <strong>{project.progress}%</strong>
                      </div>
                    </div>
                  </article>
                ))}

                {filteredProjects.length === 0 && (
                  <p className="empty-state">No matching projects found.</p>
                )}
              </div>
            </div>

            <div className="right-column">
              <section className="panel chat-panel" id="chat">
                <div className="panel-heading">
                  <div>
                    <h2>Project’s Chat</h2>
                    <p>A little teamwork goes a long way.</p>
                  </div>
                  <span className="chat-live"><i /> Live</span>
                </div>

                <div className="chat-channels">
                  <span className="channel active">General</span>
                  <span className="channel">Design</span>
                  <span className="channel">Dev</span>
                </div>

                <div className="message-list">
                  {messages.map((item, index) => (
                    <article className="message-item" key={`${item.name}-${index}`}>
                      <div className={`message-avatar ${item.color}`}>
                        {item.avatar}
                      </div>
                      <div className="message-content">
                        <div className="message-heading">
                          <strong>{item.name}</strong>
                          <time>{item.time}</time>
                        </div>
                        <span className="message-role">{item.role}</span>
                        <p>{item.message}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <form className="message-form" onSubmit={sendMessage}>
                  <input
                    value={message}
                    onChange={event => setMessage(event.target.value)}
                    placeholder="Write a message..."
                    aria-label="Write a message"
                  />
                  <button type="submit" aria-label="Send message">↗</button>
                </form>
              </section>

              <section className="panel activity-panel" id="activity">
                <div className="panel-heading">
                  <div>
                    <h2>Project activity</h2>
                    <p>Little wins worth celebrating.</p>
                  </div>
                  <span className="activity-badge">This week</span>
                </div>

                <div className="activity-stat">
                  <div className="activity-circle purple-circle">↗</div>
                  <div>
                    <span>Project updates</span>
                    <strong>12 updates</strong>
                  </div>
                </div>
                <div className="activity-stat">
                  <div className="activity-circle lime-circle">✓</div>
                  <div>
                    <span>Tasks completed</span>
                    <strong>{completed} completed</strong>
                  </div>
                </div>
                <a className="activity-link" href="#tasks">
                  Check team tasks ↗
                </a>
              </section>
            </div>
          </section>

          <section className="panel tasks-panel" id="tasks">
            <div className="panel-heading">
              <div>
                <h2>On your plate</h2>
                <p>Click a task to complete it or reopen it.</p>
              </div>
              <button className="text-button" onClick={addTask}>
                + Add task
              </button>
            </div>

            <div className="task-list">
              {filteredTasks.map(task => (
                <button
                  className="task-row"
                  key={task.title}
                  onClick={() => toggleTask(task.title)}
                >
                  <span className={`task-check ${task.status === 'Completed' ? 'checked' : ''}`}>
                    {task.status === 'Completed' ? '✓' : ''}
                  </span>
                  <span className="task-info">
                    <strong>{task.title}</strong>
                    <span>{task.project}</span>
                  </span>
                  <span className={`task-status ${task.color}`}>
                    {task.status}
                  </span>
                </button>
              ))}

              {filteredTasks.length === 0 && (
                <p className="empty-state">No matching tasks found.</p>
              )}
            </div>
          </section>

                    <footer className="footer">
            <span>Made for teams that make things happen <b>♥</b></span>
            <span>One workspace. More possibilities.</span>
          </footer>
            </>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
