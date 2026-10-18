
import './hero.css'

const projects = [
  {
    number: '01.',
    title: 'Solar Energy Production',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80',
    updated: '12.03.2026',
    team: '5 members',
    description:
      'Improving clean energy production with smarter solar panel monitoring and efficient resource planning.',
    progress: 75,
    color: 'green',
  },
  {
    number: '02.',
    title: 'Increase in Grain Harvest',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
    updated: '08.04.2026',
    team: '4 members',
    description:
      'Tracking crop performance and helping the team plan better, more sustainable harvests.',
    progress: 38,
    color: 'purple',
  },
]

const menu = [
  ['⌂', 'Home page'],
  ['♟', 'My Account'],
  ['▤', 'My Projects'],
  ['♣', 'Teams'],
  ['▱', 'Billing'],
  ['▧', 'Knowledge Base'],
  ['☷', "Project’s Chat"],
]

function ProjectCard({ project }) {
  return (
    <article className="dash-project-card">
      <img
        className="dash-project-image"
        src={project.image}
        alt={project.title}
      />

      <h3>
        {project.number} {project.title}
      </h3>

      <div className="dash-project-meta">
        <span>
          <i className="meta-purple">◷</i> Updates {project.updated}
        </span>
        <span>
          <i className="meta-green">♟</i> Team: {project.team}
        </span>
      </div>

      <p>{project.description}</p>

      <div className="dash-project-footer">
        <button className="project-details">Project Details</button>

        <span className="completeness">
          Completeness <b className={project.color}>{project.progress}%</b>
        </span>

        <span className="progress-track">
          <span style={{ width: `${project.progress}%` }} />
        </span>
      </div>
    </article>
  )
}

function OrbitHeroBanner() {
  return (
    <section className="orbit-hero">
      <div className="orbit-hero-copy">
        <span className="orbit-eyebrow">
          ✦ YOUR TEAM WORKSPACE
        </span>

        <h1>
          Make room for
          <br />
          <span>great ideas.</span>
        </h1>

        <p>
          Your projects, people and progress—all in one place.
          Let’s make something amazing today.
        </p>

        <div className="orbit-hero-actions">
          <button className="orbit-primary-btn">
            + New project
          </button>

          <button className="orbit-secondary-btn">
            Explore tasks ↗
          </button>
        </div>
      </div>

      <div className="orbit-hero-art" aria-hidden="true">
        <span className="orbit-float orbit-float-top">
          ✦ Ideas in motion
        </span>

        <div className="orbit-dashed orbit-dashed-one" />
        <div className="orbit-dashed orbit-dashed-two" />

        <div className="orbit-center-icon">✳</div>

        <span className="orbit-float orbit-float-bottom">
          ✦ Team is building
        </span>

        <span className="orbit-star orbit-star-one">✦</span>
        <span className="orbit-star orbit-star-two">✳</span>
      </div>
    </section>
  )
}

export default function Hero() {
  return (
    <section className="dashboard-scene">
      <span className="scene-label scene-label-top">DASHBOARD</span>
      <span className="scene-label scene-label-bottom">UI / UX</span>

      <span className="scene-spark spark-top">
        ✦
        <br />
        ✦
      </span>

      <span className="scene-spark spark-bottom">✦</span>
      <span className="scene-spark spark-right">✦</span>

      <span className="dotted-loop loop-top" />
      <span className="dotted-loop loop-bottom" />

      <div className="dashboard-panel">
        <aside className="dash-sidebar">
          <div className="dash-brand">
            <span className="brand-mark">✳</span>
            <span>orbit.</span>
          </div>

          <div className="dash-sidebar-label">YOUR WORKSPACE</div>

          <nav
            className="dash-nav"
            aria-label="Dashboard navigation"
          >
            {menu.map(([icon, label], index) => (
              <button
                key={label}
                className={`dash-nav-item ${
                  index === 0 ? 'active' : ''
                }`}
              >
                <span>{icon}</span>
                <span>{label}</span>
                {index === 0 && <b>↗</b>}
              </button>
            ))}
          </nav>

          <div className="dash-sidebar-bottom">
            <button className="dash-nav-item">
              <span>⚙</span>
              <span>Settings</span>
            </button>

            <button className="dash-invite">
              + Invite teammates
            </button>

            <div className="dash-profile">
              <div className="dash-profile-avatar">A</div>
              <span>
                <b>Aayushi</b>
                <small>Team member</small>
              </span>
              <button className="user-menu" aria-label="Profile options">
                ···
              </button>
            </div>
          </div>
        </aside>

        <main className="dash-main">
          <header className="dash-topbar">
            <div className="dash-breadcrumb">
              <span>Workspace</span>
              <span>/</span>
              <b>Overview</b>
            </div>

            <label className="dash-search">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search projects or tasks..."
                aria-label="Search projects or tasks"
              />
            </label>

            <button className="dash-bell" aria-label="Change theme">
              ☀
            </button>

            <div className="dash-user-avatar">A</div>
          </header>

          <div className="dash-content">
            <OrbitHeroBanner />

            <section className="dash-overview">
              <div className="dash-overview-heading">
                <div>
                  <span className="dash-eyebrow">
                    YOUR WORK AT A GLANCE
                  </span>
                  <h2>Workspace overview</h2>
                </div>

                <span className="dash-overview-date">
                  18 Oct 2026
                </span>
              </div>

              <div className="dash-summary-grid">
                <article className="dash-summary-card">
                  <div className="summary-card-top">
                    <span>Active projects</span>
                    <span className="summary-icon purple-summary">
                      ◈
                    </span>
                  </div>
                  <strong>3</strong>
                  <small>Projects in your workspace</small>
                </article>

                <article className="dash-summary-card">
                  <div className="summary-card-top">
                    <span>Tasks completed</span>
                    <span className="summary-icon green-summary">
                      ✓
                    </span>
                  </div>
                  <strong>
                    1<small className="summary-total">/3</small>
                  </strong>
                  <div className="summary-progress">
                    <span />
                  </div>
                  <small>33% completion rate</small>
                </article>

                <article className="dash-summary-card">
                  <div className="summary-card-top">
                    <span>Team members</span>
                    <span className="summary-icon pink-summary">
                      ♟
                    </span>
                  </div>
                  <strong>08</strong>
                  <div className="team-avatars">
                    <span>A</span>
                    <span>R</span>
                    <span>S</span>
                    <span>M</span>
                    <span>+4</span>
                  </div>
                </article>
              </div>
            </section>

            <div className="dash-lower-grid">
              <section className="dash-projects">
                <div className="dash-section-heading">
                  <div>
                    <h2>My Projects</h2>
                    <p>3 projects in motion</p>
                  </div>

                  <button className="all-projects">
                    + Add project
                  </button>
                </div>

                <div className="dash-project-grid">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.title}
                      project={project}
                    />
                  ))}
                </div>
              </section>

              <aside className="dash-right">
                <div className="dash-chat-heading">
                  <div>
                    <h2>Project’s Chat</h2>
                    <p>A little teamwork goes a long way.</p>
                  </div>
                  <span className="chat-live">
                    <i /> Live
                  </span>
                </div>

                <div className="chat-tabs">
                  <button className="chat-tab-active">General</button>
                  <button>Design</button>
                  <button>Dev</button>
                </div>

                <div className="chat-panel">
                  <div className="chat-message">
                    <div className="chat-avatar avatar-m">R</div>
                    <div className="chat-message-copy">
                      <b>Riya Sharma</b>
                      <small>Design team</small>
                      <p>Uploaded the latest wireframes ✨</p>
                      <time>10:42 AM</time>
                    </div>
                  </div>

                  <div className="chat-message">
                    <div className="chat-avatar avatar-l">K</div>
                    <div className="chat-message-copy">
                      <b>Kabir Mehta</b>
                      <small>Development</small>
                      <p>The new dashboard is coming together!</p>
                      <time>10:31 AM</time>
                    </div>
                  </div>

                  <button className="answer-chat">
                    Open project chat ↗
                  </button>
                </div>

                <div className="dash-stats-heading">
                  <h2>Statistics</h2>
                  <span>Last 14 days</span>
                </div>

                <div className="stats-row">
                  <div className="stat-item">
                    <div className="stat-ring purple-ring">↗</div>
                    <span>
                      Project activity
                      <strong>123 docs</strong>
                    </span>
                  </div>

                  <div className="stat-item">
                    <div className="stat-ring green-ring">↘</div>
                    <span>
                      Tasks completed
                      <strong className="green-text">8 tasks</strong>
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}
