
import { useState } from 'react'
import { login as loginUser } from './services/auth'
import './Login.css'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

function OrbitArt() {
  return (
    <svg
      className="orbit-art"
      viewBox="0 0 560 430"
      role="img"
      aria-label="Glowing planets and orbital paths"
    >
      <defs>
        <radialGradient id="planet" cx="30%" cy="20%">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="55%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#30206E" />
        </radialGradient>

        <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#E879F9" />
        </linearGradient>
      </defs>

      <g className="orbit-rings" fill="none" stroke="url(#ring)">
        <ellipse cx="280" cy="220" rx="245" ry="100" transform="rotate(-20 280 220)" />
        <ellipse cx="280" cy="220" rx="200" ry="145" transform="rotate(25 280 220)" />
        <ellipse cx="280" cy="220" rx="155" ry="190" transform="rotate(55 280 220)" />
      </g>

      <circle cx="280" cy="220" r="76" fill="url(#planet)" />

      <ellipse
        cx="280"
        cy="220"
        rx="105"
        ry="30"
        fill="none"
        stroke="#C4B5FD"
        strokeWidth="3"
        transform="rotate(-20 280 220)"
      />

      <circle className="orbit-moon moon-one" cx="95" cy="265" r="15" fill="#38BDF8" />
      <circle className="orbit-moon moon-two" cx="430" cy="120" r="20" fill="#A78BFA" />
      <circle className="orbit-moon moon-three" cx="390" cy="340" r="9" fill="#E879F9" />

      <g fill="#DDD6FE">
        <path d="M430 240 l5 12 12 5 -12 5 -5 12 -5 -12 -12 -5 12 -5z" />
        <circle cx="135" cy="120" r="3" />
        <circle cx="470" cy="300" r="3" />
        <circle cx="185" cy="355" r="2" />
      </g>
    </svg>
  )
}

function OrbitMark() {
  return (
    <svg className="orbit-mark" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse
        cx="24"
        cy="24"
        rx="21"
        ry="9"
        transform="rotate(-30 24 24)"
        fill="none"
        stroke="#C4B5FD"
        strokeWidth="2.5"
      />
      <circle cx="24" cy="24" r="10" fill="#8B5CF6" />
      <path
        d="M19 19 Q23 15 28 19"
        fill="none"
        stroke="#E9D5FF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="7" cy="33" r="3.5" fill="#38BDF8" />
      <circle cx="39" cy="13" r="3.5" fill="#E879F9" />
    </svg>
  )
}

export default function Login({
  onLoginSuccess,
  onForgotPassword,
  onPreviewDashboard,
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('developer')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [organisationMode, setOrganisationMode] = useState('')
  const [organisationName, setOrganisationName] = useState('')
  const [organisationId, setOrganisationId] = useState('')
  const [organisationCode, setOrganisationCode] = useState('')

  const handleGithubLogin = () => {
    window.location.href =
      'https://backend-core-iwxv.onrender.com/api/auth/oauth/github'
  }

  const handleGoogleLogin = () => {
    window.location.href =
      'https://backend-core-iwxv.onrender.com/api/auth/oauth/google'
  }

  async function handleLogin(event) {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }

    if (organisationMode === 'create' && !organisationName.trim()) {
      setError('Please enter an organisation name.')
      return
    }

    if (
      organisationMode === 'join' &&
      (!organisationId.trim() || !organisationCode.trim())
    ) {
      setError('Please enter your organisation ID and invite code.')
      return
    }

    setLoading(true)

    try {
      const data = await loginUser(email.trim(), password)

      if (data?.success === false) {
        throw new Error(data.message || 'Login failed.')
      }

      const user = data?.user || data?.profile

      if (!user?.role) {
        throw new Error(
          'Login response received, but the user profile needs verification.'
        )
      }

      const roleMap = {
        user: 'developer',
        developer: 'developer',
        product_manager: 'product-manager',
        'product-manager': 'product-manager',
        senior_manager: 'senior-manager',
        'senior-manager': 'senior-manager',
      }

     const mappedRole = roleMap[String(user.role).toLowerCase()]

      if (!mappedRole) {
        throw new Error('Your account has an unsupported role.')
      }

      onLoginSuccess?.({
        email: user.email || email.trim(),
        role: mappedRole,
        user,
      })
    } catch (err) {
      setError(err.message || 'Unable to sign in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function changeOrganisationMode(mode) {
    setOrganisationMode(mode)
    setError('')
  }

  return (
    <main className="orbit-login-page">
      <section className="orbit-welcome">
        <a className="orbit-brand" href="#home" aria-label="Orbit home">
          <OrbitMark />
          <span>
            orbit<span className="brand-dot">.</span>
          </span>
        </a>

        <div className="orbit-intro">
          <p className="orbit-eyebrow">YOUR TEAM. YOUR UNIVERSE.</p>

          <h1>
            Better teams.
            <br />
            Bigger <span>dreams.</span>
          </h1>

          <p className="orbit-description">
            Organize, collaborate and build
            <br className="desktop-break" /> what matters — together.
          </p>
        </div>

        <OrbitArt />

        <div className="orbit-benefits">
          <div><span>◉</span> Work together</div>
          <div><span>↗</span> Stay productive</div>
          <div><span>✧</span> Build the future</div>
        </div>
      </section>

      <section className="orbit-form-side">
        <form className="orbit-login-card" onSubmit={handleLogin}>
          <div className="orbit-card-brand">
            <OrbitMark />
            <span>
              orbit<span className="brand-dot">.</span>
            </span>
          </div>

          <h2>Welcome back!</h2>

          <p className="orbit-login-subtitle">
            Sign in to continue to your workspace.
          </p>

          <div className="orbit-organisation-actions">
            <button
              type="button"
              className={organisationMode === 'create' ? 'active' : ''}
              aria-pressed={organisationMode === 'create'}
              onClick={() => changeOrganisationMode(
                organisationMode === 'create' ? '' : 'create'
              )}
            >
              Create an Organisation
            </button>

            <button
              type="button"
              className={organisationMode === 'join' ? 'active' : ''}
              aria-pressed={organisationMode === 'join'}
              onClick={() => changeOrganisationMode(
                organisationMode === 'join' ? '' : 'join'
              )}
            >
              Join an Organisation
            </button>
          </div>

          {organisationMode === 'create' && (
            <>
              <label htmlFor="orbit-org-name">Organisation Name</label>

              <div className="orbit-input-wrap">
                <span aria-hidden="true">✧</span>
                <input
                  id="orbit-org-name"
                  type="text"
                  placeholder="Enter organisation name"
                  value={organisationName}
                  onChange={(event) => setOrganisationName(event.target.value)}
                  autoComplete="organization"
                />
              </div>
            </>
          )}

          {organisationMode === 'join' && (
            <>
              <label htmlFor="orbit-org-id">Organisation ID</label>

              <div className="orbit-input-wrap">
                <span aria-hidden="true">⌘</span>
                <input
                  id="orbit-org-id"
                  type="text"
                  placeholder="Enter organisation ID"
                  value={organisationId}
                  onChange={(event) => setOrganisationId(event.target.value)}
                />
              </div>

              <label htmlFor="orbit-org-code">Organisation Invite Code</label>

              <div className="orbit-input-wrap">
                <span aria-hidden="true">✉</span>
                <input
                  id="orbit-org-code"
                  type="text"
                  placeholder="Enter invite code"
                  value={organisationCode}
                  onChange={(event) => setOrganisationCode(event.target.value)}
                />
              </div>

              <label htmlFor="orbit-role">Select your role</label>

              <div className="orbit-input-wrap orbit-role-wrap">
                <select
                  id="orbit-role"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                >
                  <option value="developer">Developer</option>
                  <option value="product-manager">Product Manager</option>
                  <option value="senior-manager">Senior Manager</option>
                </select>
              </div>
            </>
          )}

          <label htmlFor="orbit-email">Email address</label>

          <div className="orbit-input-wrap">
            <span aria-hidden="true">✉</span>
            <input
              id="orbit-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <label htmlFor="orbit-password">Password</label>

          <div className="orbit-input-wrap">
            <span aria-hidden="true">♙</span>
            <input
              id="orbit-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />

            <button
              className="orbit-show-password"
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="orbit-login-options">
            <label className="orbit-remember">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="orbit-forgot-password"
              onClick={() => onForgotPassword?.()}
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <p className="orbit-login-error" role="alert">
              {error}
            </p>
          )}

          <button className="orbit-submit" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
            {!loading && <span aria-hidden="true"> →</span>}
          </button>

          {import.meta.env.DEV && (
            <button
              type="button"
              className="orbit-preview-button"
              onClick={() => onPreviewDashboard?.(role)}
            >
              Preview Dashboard →
            </button>
          )}

          <div className="orbit-divider">
            <span>or continue with</span>
          </div>

          <div className="orbit-social-buttons">
            <button
              type="button"
              className="orbit-social-button"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="social-logo" aria-hidden="true" />
              <span>Google</span>
            </button>

            <button
              type="button"
              className="orbit-social-button"
              onClick={handleGithubLogin}
            >
              <FaGithub className="social-logo github-logo" aria-hidden="true" />
              <span>GitHub</span>
            </button>
          </div>

          <p className="orbit-login-footer">
            Your team workspace, all in one place.
          </p>
        </form>
      </section>
    </main>
  )
}
