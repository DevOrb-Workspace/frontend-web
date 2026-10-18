
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('team-theme') === 'dark'
  })

  useEffect(() => {
    localStorage.setItem('team-theme', dark ? 'dark' : 'light')
  }, [dark])

  const projects = [
    { name: 'Website Redesign', team: 'Design Team', progress: 75, color: 'purple' },
    { name: 'Mobile App', team: 'Development Team', progress: 45, color: 'teal' },
    { name: 'AI Assistant', team: 'Research Team', progress: 60, color: 'coral' }
  ]

  const tasks = [
    { title: 'Create dashboard wireframes', project: 'Website Redesign', status: 'In Progress', color: 'purple' },
    { title: 'Fix login page bugs', project: 'Mobile App', status: 'To Do', color: 'coral' },
    { title: 'Review pull requests', project: 'AI Assistant', status: 'Completed', color: 'teal' }
  ]

  return (
    <div className={`app ${dark ? 'dark' : 'light'}`}>
      <aside className="sidebar">
        <a className="brand" href="#home">
          <span className="brand-icon">✳</span>
          orbit<span className="brand-dot">.</span>
        </a>

        <p className="menu-label">WORKSPACE</p>

        <nav className="navigation">
          <a className="nav-item active" href="#home"><span>▦</span> Overview</a>
          <a className="nav-item" href="#projects"><span>◈</span> Projects</a>
          <a className="nav-item" href="#tasks"><span>✓</span> My Tasks</a>
          <a className="nav-item" href="#activity"><span>↗</span> Activity</a>
          <a className="nav-item" href="#messages"><span>☏</span> Messages <span className="notification">3</span></a>
        </nav>

        <div className="sidebar-bottom">
          <div className="invite-card">
            <span className="invite-icon">✦</span>
            <h3>Better work, together.</h3>
            <p>Bring your team's ideas to life.</p>
            <button onClick={() => alert('Team invitations will be available when we add the backend.')}>
              Invite teammates ↗
            </button>
          </div>

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

      <main className="main-content" id="home">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> Overview</div>

          <div className="top-actions">
            <button className="icon-button theme-button" onClick={() => setDark(!dark)}>
              {dark ? '☀️' : '🌙'} <span>{dark ? 'Light mode' : 'Dark mode'}</span>
            </button>
            <button className="icon-button notification-button" aria-label="Notifications">♧<i /></button>
            <div className="avatar top-avatar">A</div>
          </div>
        </header>

        <section className="welcome">
          <div>
            <span className="eyebrow">FRIDAY, YOUR TEAM IS ON A ROLL ✨</span>
            <h1>Good things happen<br />when we <span>work together.</span></h1>
            <p>Here's what's happening across your workspace today.</p>
          </div>
          <div className="welcome-art">
            <div className="art-circle circle-one" />
            <div className="art-circle circle-two" />
            <div className="art-star">✳</div>
            <div className="art-pill">Ideas in motion</div>
          </div>
        </section>

        <section className="stats-grid">
          <article className="stat-card purple-card">
            <div className="stat-top"><span>Active projects</span><span className="stat-icon">◈</span></div>
            <div className="stat-number">12</div>
            <div className="stat-note"><span>↗ 2 new</span> this month</div>
          </article>
          <article className="stat-card teal-card">
            <div className="stat-top"><span>Tasks completed</span><span className="stat-icon">✓</span></div>
            <div className="stat-number">28<span className="stat-total"> / 40</span></div>
            <div className="mini-progress"><span style={{ width: '70%' }} /></div>
            <div className="stat-note">70% of sprint completed</div>
          </article>
          <article className="stat-card coral-card">
            <div className="stat-top"><span>Team members</span><span className="stat-icon">♧</span></div>
            <div className="stat-number">08</div>
            <div className="avatar-stack"><span>A</span><span>R</span><span>S</span><span>M</span><small>+4</small></div>
          </article>
        </section>

        <section className="content-grid">
          <div className="panel projects-panel" id="projects">
            <div className="panel-heading">
              <div><h2>Projects in motion</h2><p>A little progress goes a long way.</p></div>
              <button className="text-button" onClick={() => alert('Project creation will be added next.')}>+ New project</button>
            </div>

            <div className="project-list">
              {projects.map((project) => (
                <article className="project-row" key={project.name}>
                  <div className={`project-symbol ${project.color}`}>✳</div>
                  <div className="project-details">
                    <strong>{project.name}</strong>
                    <span>{project.team}</span>
                    <div className="project-progress"><span className={project.color} style={{ width: `${project.progress}%` }} /></div>
                  </div>
                  <strong className="project-percent">{project.progress}%</strong>
                </article>
              ))}
            </div>
          </div>

          <div className="panel activity-panel" id="activity">
            <div className="panel-heading">
              <div><h2>Team activity</h2><p>Your team's latest moves.</p></div>
              <span className="live-dot">Live</span>
            </div>

            <div className="activity-list">
              <div className="activity-item"><div className="activity-avatar purple">R</div><div><strong>Riya Sharma</strong><p>completed a design task</p><span>12 minutes ago</span></div></div>
              <div className="activity-item"><div className="activity-avatar teal">K</div><div><strong>Kabir Mehta</strong><p>shared a project update</p><span>38 minutes ago</span></div></div>
              <div className="activity-item"><div className="activity-avatar coral">S</div><div><strong>Sana Khan</strong><p>opened a pull request</p><span>1 hour ago</span></div></div>
            </div>

            <button className="activity-link" onClick={() => alert('Full activity timeline will be added later.')}>View all activity ↗</button>
          </div>
        </section>

        <section className="panel tasks-panel" id="tasks">
          <div className="panel-heading">
            <div><h2>On your plate</h2><p>Small steps. Big momentum.</p></div>
            <button className="text-button" onClick={() => alert('Task creation will be added next.')}>+ Add task</button>
          </div>

          <div className="task-list">
            {tasks.map((task) => (
              <div className="task-row" key={task.title}>
                <span className={`task-check ${task.status === 'Completed' ? 'checked' : ''}`}>
                  {task.status === 'Completed' ? '✓' : ''}
                </span>
                <div className="task-info"><strong>{task.title}</strong><span>{task.project}</span></div>
                <span className={`task-status ${task.color}`}>{task.status}</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="footer">
          <span>Made for teams that make things happen <span className="footer-heart">♥</span></span>
          <span>One workspace. More possibilities.</span>
        </footer>
      </main>
    </div>
  )
}

export default App
