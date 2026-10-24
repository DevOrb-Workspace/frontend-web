import { useEffect, useState } from 'react'
import './Tickets.css'

const initialTickets = [
  {
    id: 'ORB-101',
    title: 'Fix dashboard layout on mobile',
    description: 'Make the workspace responsive on smaller screens.',
    priority: 'High',
    status: 'Open',
    assignee: 'Aayushi',
    dueDate: '',
    comments: [],
    activity: ['Ticket created']
  },
  {
    id: 'ORB-102',
    title: 'Improve task card design',
    description: 'Polish spacing, colors and hover interactions.',
    priority: 'Medium',
    status: 'In Progress',
    assignee: 'Design Team',
    dueDate: '',
    comments: [],
    activity: ['Ticket created']
  },
  {
    id: 'ORB-103',
    title: 'Test login flow',
    description: 'Check login and preview dashboard functionality.',
    priority: 'Low',
    status: 'Resolved',
    assignee: 'Development Team',
    dueDate: '',
    comments: [],
    activity: ['Ticket created']
  }
]

const statuses = ['Open', 'In Progress', 'Resolved']

function readTickets() {
  try {
    const saved = localStorage.getItem('orbit-tickets')
    return saved ? JSON.parse(saved) : initialTickets
  } catch {
    return initialTickets
  }
}

function Tickets() {
  const [tickets, setTickets] = useState(readTickets)
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [assigneeFilter, setAssigneeFilter] = useState('All')

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  const [commentText, setCommentText] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [assignee, setAssignee] = useState('')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('orbit-tickets', JSON.stringify(tickets))
    } catch (error) {
      console.error('Unable to save tickets:', error)
    }
  }, [tickets])

  const selectedTicket = tickets.find(ticket => ticket.id === selectedId)

  const filteredTickets = tickets.filter(ticket => {
    const text = [
      ticket.id,
      ticket.title,
      ticket.description,
      ticket.assignee
    ]
      .join(' ')
      .toLowerCase()

    return (
      text.includes(search.toLowerCase()) &&
      (priorityFilter === 'All' || ticket.priority === priorityFilter) &&
      (assigneeFilter === 'All' || ticket.assignee === assigneeFilter)
    )
  })

  const assignees = [
    ...new Set(tickets.map(ticket => ticket.assignee).filter(Boolean))
  ]

  function resetForm() {
    setTitle('')
    setDescription('')
    setPriority('Medium')
    setAssignee('')
    setDueDate('')
    setEditingId(null)
    setShowForm(false)
  }

  function openCreateForm() {
    setSelectedId(null)
    resetForm()
    setShowForm(true)
  }

  function editTicket(ticket) {
    setEditingId(ticket.id)
    setTitle(ticket.title)
    setDescription(ticket.description)
    setPriority(ticket.priority)
    setAssignee(ticket.assignee || '')
    setDueDate(ticket.dueDate || '')
    setSelectedId(null)
    setShowForm(true)
  }

  function saveTicket(event) {
    event.preventDefault()

    if (!title.trim()) return

    if (editingId) {
      setTickets(previous =>
        previous.map(ticket =>
          ticket.id === editingId
            ? {
                ...ticket,
                title: title.trim(),
                description: description.trim() || 'No description provided.',
                priority,
                assignee: assignee.trim() || 'Unassigned',
                dueDate,
                activity: [
                  `Ticket updated · ${new Date().toLocaleString()}`,
                  ...(ticket.activity || [])
                ]
              }
            : ticket
        )
      )
    } else {
      const newTicket = {
        id: `ORB-${Date.now().toString().slice(-6)}`,
        title: title.trim(),
        description: description.trim() || 'No description provided.',
        priority,
        status: 'Open',
        assignee: assignee.trim() || 'Unassigned',
        dueDate,
        comments: [],
        activity: [`Ticket created · ${new Date().toLocaleString()}`]
      }

      setTickets(previous => [newTicket, ...previous])
    }

    resetForm()
  }

  function updateStatus(id, status) {
    setTickets(previous =>
      previous.map(ticket =>
        ticket.id === id
          ? {
              ...ticket,
              status,
              activity: [
                `Status changed to ${status} · ${new Date().toLocaleString()}`,
                ...(ticket.activity || [])
              ]
            }
          : ticket
      )
    )
  }

  function deleteTicket(id) {
    if (!window.confirm('Delete this ticket? This cannot be undone.')) return

    setTickets(previous => previous.filter(ticket => ticket.id !== id))

    if (selectedId === id) {
      setSelectedId(null)
    }
  }

  function addComment(event) {
    event.preventDefault()

    if (!commentText.trim() || !selectedTicket) return

    const now = new Date()

    const comment = {
      id: now.getTime(),
      text: commentText.trim(),
      author: 'You',
      time: now.toLocaleString()
    }

    setTickets(previous =>
      previous.map(ticket =>
        ticket.id === selectedId
          ? {
              ...ticket,
              comments: [...(ticket.comments || []), comment],
              activity: [
                `Comment added · ${now.toLocaleString()}`,
                ...(ticket.activity || [])
              ]
            }
          : ticket
      )
    )

    setCommentText('')
  }

  function isOverdue(ticket) {
    if (!ticket.dueDate || ticket.status === 'Resolved') return false

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const due = new Date(`${ticket.dueDate}T00:00:00`)

    return due < today
  }

  function daysRemaining(ticket) {
    if (!ticket.dueDate) return null

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const due = new Date(`${ticket.dueDate}T00:00:00`)

    return Math.ceil((due.getTime() - today.getTime()) / 86400000)
  }

  return (
    <section className="tickets-page">
      {/* Page heading */}
      <div className="tickets-heading">
        <div>
          <span className="tickets-eyebrow">ORBIT WORKSPACE</span>
          <h1>
            Tickets <span>↗</span>
          </h1>
          <p>Track issues, manage deadlines and keep your team moving.</p>
        </div>

        {!showForm && (
          <button
            className="ticket-create-button"
            type="button"
            onClick={openCreateForm}
          >
            + Create ticket
          </button>
        )}
      </div>

      {/* Statistics */}
      {!showForm && (
        <div className="ticket-stats">
          <article>
            <span>Total tickets</span>
            <strong>{tickets.length}</strong>
          </article>

          <article>
            <span>Open</span>
            <strong>
              {tickets.filter(ticket => ticket.status === 'Open').length}
            </strong>
          </article>

          <article>
            <span>In progress</span>
            <strong>
              {tickets.filter(ticket => ticket.status === 'In Progress').length}
            </strong>
          </article>

          <article>
            <span>Overdue</span>
            <strong>{tickets.filter(isOverdue).length}</strong>
          </article>
        </div>
      )}

      {/* Create / Edit form */}
      {showForm && (
        <form className="ticket-form" onSubmit={saveTicket}>
          <h2>{editingId ? 'Edit ticket' : 'Create a ticket'}</h2>

          <label>
            Ticket title
            <input
              type="text"
              value={title}
              onChange={event => setTitle(event.target.value)}
              placeholder="What needs to be done?"
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={event => setDescription(event.target.value)}
              placeholder="Add details..."
              rows={3}
            />
          </label>

          <div className="ticket-form-row">
            <label>
              Priority
              <select
                value={priority}
                onChange={event => setPriority(event.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </label>

            <label>
              Assignee
              <input
                type="text"
                value={assignee}
                onChange={event => setAssignee(event.target.value)}
                placeholder="Name or team"
              />
            </label>

            <label>
              Due date
              <input
                type="date"
                value={dueDate}
                onChange={event => setDueDate(event.target.value)}
              />
            </label>
          </div>

          <div className="ticket-form-actions">
            <button className="ticket-create-button" type="submit">
              {editingId ? 'Save changes' : 'Save ticket'}
            </button>

            <button
              className="ticket-cancel-button"
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Search, filters and Kanban board */}
      {!showForm && (
        <>
          <div className="tickets-toolbar">
            <div>
              <h2>Issue board</h2>
              <p>Search tickets and move work through each stage.</p>
            </div>

            <input
              className="ticket-search"
              type="search"
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="⌕ Search tickets..."
              aria-label="Search tickets"
            />
          </div>

          <div className="ticket-filters">
            <label>
              Priority
              <select
                value={priorityFilter}
                onChange={event => setPriorityFilter(event.target.value)}
              >
                <option value="All">All</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </label>

            <label>
              Assignee
              <select
                value={assigneeFilter}
                onChange={event => setAssigneeFilter(event.target.value)}
              >
                <option value="All">All</option>
                {assignees.map(name => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="ticket-kanban">
            {statuses.map(status => {
              const columnTickets = filteredTickets.filter(
                ticket => ticket.status === status
              )

              return (
                <section
                  className={`ticket-column column-${status
                    .toLowerCase()
                    .replace(' ', '-')}`}
                  key={status}
                >
                  <div className="ticket-column-heading">
                    <h3>
                      <span className="ticket-status-dot" />
                      {status}
                    </h3>

                    <span className="ticket-column-count">
                      {columnTickets.length}
                    </span>
                  </div>

                  <div className="ticket-column-list">
                    {columnTickets.map(ticket => {
                      const remaining = daysRemaining(ticket)
                      const overdue = isOverdue(ticket)

                      return (
                        <article className="ticket-card" key={ticket.id}>
                          <div className="ticket-card-top">
                            <span className="ticket-id">{ticket.id}</span>

                            <span
                              className={`ticket-priority priority-${(
                                ticket.priority || 'Medium'
                              ).toLowerCase()}`}
                            >
                              {ticket.priority}
                            </span>
                          </div>

                          <button
                            type="button"
                            className="ticket-card-title"
                            onClick={() => setSelectedId(ticket.id)}
                          >
                            {ticket.title}
                          </button>

                          <p className="ticket-card-description">
                            {ticket.description}
                          </p>

                          <div className="ticket-card-meta">
                            <span>
                              <span className="ticket-meta-label">
                                Assigned to
                              </span>
                              {ticket.assignee || 'Unassigned'}
                            </span>

                            {ticket.dueDate && (
                              <span className={overdue ? "ticket-overdue" : ""}>
                                <span className="ticket-meta-label">Due</span>
                                {overdue ? "Overdue" : remaining === 0 ? "Due today" : remaining < 0 ? "Past due" : `${remaining}d left`}
                              </span>
                            )}
                          </div>
                          <div className="ticket-card-actions">
                            <select value={ticket.status} onChange={event => updateStatus(ticket.id, event.target.value)} aria-label={`Status for ${ticket.id}`}>
                              {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                            </select>
                            <button type="button" onClick={() => editTicket(ticket)}>Edit</button>
                            <button type="button" onClick={() => deleteTicket(ticket.id)}>Delete</button>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>
        </>
      )}
      {selectedTicket && (
        <div className="ticket-detail-overlay" onClick={() => setSelectedId(null)}>
          <section className="ticket-detail-panel" role="dialog" aria-modal="true" aria-label={`Ticket ${selectedTicket.id}`} onClick={event => event.stopPropagation()}>
            <button type="button" onClick={() => setSelectedId(null)}>Close ×</button>
            <p>{selectedTicket.id}</p>
            <h2>{selectedTicket.title}</h2>
            <p>{selectedTicket.description}</p>
            <p>Priority: {selectedTicket.priority}</p>
            <p>Status: {selectedTicket.status}</p>
            <p>Assigned to: {selectedTicket.assignee || "Unassigned"}</p>
            <p>Due date: {selectedTicket.dueDate || "Not set"}</p>
            <h3>Comments</h3>
            {(selectedTicket.comments || []).map(comment => (
              <article key={comment.id}>
                <strong>{comment.author}</strong>
                <p>{comment.text}</p>
                <small>{comment.time}</small>
              </article>
            ))}
            <form onSubmit={addComment}>
              <textarea value={commentText} onChange={event => setCommentText(event.target.value)} placeholder="Write a comment..." rows={3} required />
              <button type="submit">Add comment</button>
            </form>
            <h3>Activity</h3>
            {(selectedTicket.activity || []).map((item, index) => (
              <p key={`${selectedTicket.id}-${index}`}>{item}</p>
            ))}
          </section>
        </div>
      )}
    </section>
  )
}

export default Tickets
