
import { useState } from 'react';
import './Login.css';

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
  );
}

function OrbitMark() {
  return (
    <svg className="orbit-mark" viewBox="0 0 48 48" aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      >
        <ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(-35 24 24)" />
        <ellipse cx="24" cy="24" rx="8" ry="20" transform="rotate(35 24 24)" />
      </g>

      <circle cx="8" cy="31" r="3.5" fill="#38BDF8" />
      <circle cx="37" cy="12" r="3.5" fill="#E879F9" />
      <circle cx="32" cy="39" r="3" fill="#A78BFA" />
    </svg>
  );
}

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('developer');

  function handleLogin(event) {
    event.preventDefault();
    setError('');

    // Temporary frontend demo login; no API is connected yet.
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    onLoginSuccess?.({ email, role });
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
          <div><span>✳</span> Work together</div>
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
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <label htmlFor="orbit-role">Select your role</label>

          <div className="orbit-input-wrap">
            <span aria-hidden="true">✦</span>

            <select
              id="orbit-role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              required
            >
              <option value="developer">Developer</option>
              <option value="product-manager">Product Manager</option>
              <option value="senior-manager">Senior Manager</option>
            </select>
          </div>

          <label className="orbit-remember">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>

          {error && (
            <p className="orbit-login-error" role="alert">
              {error}
            </p>
          )}

          <button className="orbit-submit" type="submit">
            Sign in <span aria-hidden="true">→</span>
          </button>

          <p className="orbit-login-footer">
            Your team workspace, all in one place.
          </p>
        </form>
      </section>
    </main>
  );
}
