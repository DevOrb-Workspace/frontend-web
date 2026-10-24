import { useState } from 'react'
import './Submissions.css'

const initialSubmissions = [
  {
    id: 1,
    title: 'Landing Page Design',
    project: 'Website Redesign',
    submittedBy: 'Aayushi',
    date: '2026-10-24',
    status: 'Under Review',
  },
  {
    id: 2,
    title: 'API Integration',
    project: 'Backend Development',
    submittedBy: 'Team Developer',
    date: '2026-10-22',
    status: 'Approved',
  },
  {
    id: 3,
    title: 'Dashboard Prototype',
    project: 'ORBIT Workspace',
    submittedBy: 'Design Team',
    date: '2026-10-25',
    status: 'Changes Requested',
  },
]

function Submissions({ onBack }) {
  const [submissions, setSubmissions] = useState(initialSubmissions)
  const [filter, setFilter] = useState('All')

  const visibleSubmissions = submissions.filter(item =>
    filter === 'All' || item.status === filter
  )

  function updateStatus(id, status) {
    setSubmissions(previous =>
      previous.map(item =>
        item.id === id ? { ...item, status } : item
      )
    )
  }

  return (
    <section className="submissions-page">
      <div className="submissions-heading">
        <div>
          <span className="submissions-eyebrow">WORKSPACE / SUBMISSIONS</span>
          <h1>Submissions <span>✦</span></h1>
          <p>Track submitted work and keep feedback moving.</p>
        </div>

        <button className="submissions-back" onClick={onBack}>
          ← Back to Home
        </button>
      </div>

      <div className="submission-stats">
        <article>
          <span>Total submissions</span>
          <strong>{submissions.length}</strong>
        </article>
        <article>
          <span>Under review</span>
          <strong>
            {submissions.filter(item => item.status === 'Under Review').length}
          </strong>
        </article>
        <article>
          <span>Approved</span>
          <strong>
            {submissions.filter(item => item.status === 'Approved').length}
          </strong>
        </article>
      </div>

      <div className="submission-list-heading">
        <h2>Submitted work</h2>

        <select value={filter} onChange={event => setFilter(event.target.value)}>
          <option>All</option>
          <option>Under Review</option>
          <option>Approved</option>
          <option>Changes Requested</option>
        </select>
      </div>

      <div className="submission-list">
        {visibleSubmissions.map(item => (
          <article className="submission-card" key={item.id}>
            <div className="submission-symbol">↗</div>

            <div className="submission-info">
              <h3>{item.title}</h3>
              <p>{item.project} · Submitted by {item.submittedBy}</p>
              <small>Submitted: {item.date}</small>
            </div>

            <div className="submission-actions">
              <span className={`submission-status status-${item.status.toLowerCase().replaceAll(' ', '-')}`}>
                {item.status}
              </span>

              <select
                aria-label={`Update status for ${item.title}`}
                value={item.status}
                onChange={event => updateStatus(item.id, event.target.value)}
              >
                <option>Under Review</option>
                <option>Approved</option>
                <option>Changes Requested</option>
              </select>
            </div>
          </article>
        ))}

        {visibleSubmissions.length === 0 && (
          <p className="submission-empty">No submissions match this filter.</p>
        )}
      </div>
    </section>
  )
}

export default Submissions
