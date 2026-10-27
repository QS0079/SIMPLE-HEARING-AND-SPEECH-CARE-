'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check for remembered email on mount (default is unchecked if none saved)
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('simplehearing_remembered_email');
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberEmail(true);
      }
    } catch {
      // Safe fallback if localStorage is disabled
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid email or password');
      }

      // Handle remember email preference
      try {
        if (rememberEmail && email) {
          localStorage.setItem('simplehearing_remembered_email', email.trim());
        } else {
          localStorage.removeItem('simplehearing_remembered_email');
        }
      } catch {
        // Safe fallback if localStorage is disabled
      }

      router.push(redirectPath);
      router.refresh();
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-card__brand">
          <Link href="/" className="logo">
            <Image
              src="/logo.png"
              alt="Simple Hearing & Speech Care"
              width={220}
              height={55}
              priority
              className="logo__img"
            />
          </Link>
          <span className="admin-login-card__badge">Lead Management Portal</span>
        </div>

        <div className="admin-login-card__header">
          <h2>Admin Login</h2>
          <p>Sign in to manage patient appointment leads &amp; enquiries.</p>
        </div>

        {error && (
          <div className="admin-alert admin-alert--danger" role="alert">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <label className="field">
            <span>Admin Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="e.g. simplehearing@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </label>

          <label className="field">
            <span>Password</span>
            <div className="admin-password-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </label>

          <div className="admin-remember-row">
            <label className="admin-remember-label">
              <input
                type="checkbox"
                checked={rememberEmail}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setRememberEmail(checked);
                  if (!checked) {
                    try {
                      localStorage.removeItem('simplehearing_remembered_email');
                    } catch {}
                  }
                }}
                disabled={loading}
                className="admin-remember-checkbox"
              />
              <span>Remember email</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn--grad btn--block admin-login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="admin-spinner" aria-hidden="true" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="btn__arrow">
                  <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="admin-login-card__footer">
          <Link href="/" className="admin-back-link">
            ← Return to SimpleHearing Website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="admin-login-page">
          <div className="admin-login-card" style={{ display: 'grid', placeItems: 'center', minHeight: '300px' }}>
            <span className="admin-spinner" style={{ width: '28px', height: '28px' }} />
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
