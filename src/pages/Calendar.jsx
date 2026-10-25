import { useState } from 'react'
import './Calendar.css'

function dateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseDate(value) {
  if (!value) return null

  const parts = String(value).slice(0, 10).split('-').map(Number)
  if (parts.length !== 3 || parts.some(number => !number)) return null

  const date = new Date(parts[0], parts[1] - 1, parts[2])
  return Number.isNaN(date.getTime()) ? null : date
}

function Calendar({ tasks = [] }) {
  const [viewDate, setViewDate] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState(() => dateKey(new Date()))

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const todayKey = dateKey(new Date())

  const firstDayOffset = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cellCount = Math.ceil((firstDayOffset + daysInMonth) / 7) * 7

  const dates = Array.from(
    { length: cellCount },
    (_, index) => new Date(year, month, index - firstDayOffset + 1)
  )

  const selectedTasks = tasks.filter(task => {
    const dueDate = parseDate(task.deadline)
    return dueDate && dateKey(dueDate) === selectedDate
  })

  function changeMonth(amount) {
    setViewDate(new Date(year, month + amount, 1))
  }

  function goToToday() {
    const today = new Date()
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelectedDate(dateKey(today))
  }

  function selectDate(date) {
    setSelectedDate(dateKey(date))

    if (date.getMonth() !== month || date.getFullYear() !== year) {
      setViewDate(new Date(date.getFullYear(), date.getMonth(), 1))
    }
  }

  function taskStatus(task) {
    const status = String(task.status || '').toLowerCase()

    if (status === 'done' || status === 'completed') {
      return 'completed'
    }

    return task.deadline && task.deadline.slice(0, 10) < todayKey
      ? 'overdue'
      : 'upcoming'
  }

  const selectedDateObject = parseDate(selectedDate)

  return (
    <section className="calendar-page">
      <div className="calendar-heading">
        <div>
          <span className="calendar-eyebrow">PLAN YOUR WORKSPACE</span>
          <h1>Calendar <span>✦</span></h1>
          <p>Keep track of your tasks, deadlines and plans.</p>
        </div>

        <button className="calendar-today-button" onClick={goToToday}>
          Today
        </button>
      </div>

      <div className="calendar-month-bar">
        <div className="calendar-month-title">
          <h2>
            {viewDate.toLocaleDateString('en-IN', {
              month: 'long',
              year: 'numeric'
            })}
          </h2>
          <span>Monthly view</span>
        </div>

        <div className="calendar-month-controls">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goToToday}
            className="calendar-current-month"
          >
            This month
          </button>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            aria-label="Next month"
          >
            ›
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div className="calendar-weekday" key={day}>
            {day}
          </div>
        ))}

        {dates.map(date => {
          const key = dateKey(date)
          const isCurrentMonth = date.getMonth() === month
          const dayTasks = tasks.filter(task => {
            const dueDate = parseDate(task.deadline)
            return dueDate && dateKey(dueDate) === key
          })

          const classes = [
            'calendar-day',
            !isCurrentMonth ? 'outside-month' : '',
            key === todayKey ? 'is-today' : '',
            key === selectedDate ? 'is-selected' : ''
          ].filter(Boolean).join(' ')

          return (
            <button
              type="button"
              className={classes}
              key={key}
              onClick={() => selectDate(date)}
              aria-label={`${date.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}, ${dayTasks.length} tasks`}
            >
              <span className="calendar-day-number">
                {date.getDate()}
              </span>

              <div className="calendar-day-tasks">
                {dayTasks.slice(0, 2).map(task => (
                  <span
                    className={`calendar-day-event ${taskStatus(task)}`}
                    key={task.id}
                    title={task.title}
                  >
                    {task.title}
                  </span>
                ))}

                {dayTasks.length > 2 && (
                  <span className="calendar-more-tasks">
                    +{dayTasks.length - 2} more
                  </span>
                )}
              </div>

              {dayTasks.length > 0 && (
                <span className="calendar-task-count">
                  {dayTasks.length}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="calendar-selected-panel">
        <div className="calendar-selected-heading">
          <div>
            <span className="calendar-eyebrow">YOUR SCHEDULE</span>
            <h2>
              {selectedDateObject
                ? selectedDateObject.toLocaleDateString('en-IN', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })
                : 'Selected date'}
            </h2>
          </div>
          <span className="calendar-scheduled-count">
            {selectedTasks.length} {selectedTasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>

        {selectedTasks.length > 0 ? (
          <div className="calendar-selected-tasks">
            {selectedTasks.map(task => (
              <article className="calendar-selected-task" key={task.id}>
                <span className={`calendar-task-indicator ${taskStatus(task)}`} />
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.project || 'No project assigned'}</p>
                </div>
                <span className={`calendar-status ${taskStatus(task)}`}>
                  {taskStatus(task) === 'completed'
                    ? 'Completed'
                    : taskStatus(task) === 'overdue'
                      ? 'Overdue'
                      : 'Upcoming'}
                </span>
              </article>
            ))}
          </div>
        ) : (
          <div className="calendar-no-tasks">
            <span>✧</span>
            <p>No tasks scheduled for this date.</p>
            <small>Add a deadline when creating a task to see it here.</small>
          </div>
        )}
      </div>
    </section>
  )
}

export default Calendar
