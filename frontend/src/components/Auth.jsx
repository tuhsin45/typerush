import React, { useState } from 'react';

const Auth = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = isLogin 
        ? await onLogin(formData.email, formData.password)
        : await onRegister(formData.email, formData.password);

      if (!result.success) {
        setError(result.message);
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ 
      background: 'linear-gradient(135deg, var(--primary-bg) 0%, var(--bg-secondary) 100%)',
      padding: 'var(--space-lg)'
    }}>
      <div className="card animate-slide-up" style={{ width: '100%', maxWidth: '450px' }}>
        <div className="text-center mb-xl">
          <div className="flex items-center justify-center gap-md mb-md">
            <img 
              src="/icon.svg" 
              alt="TypeRush" 
              style={{ width: '48px', height: '48px' }}
            />
            <h1 className="text-display" style={{ color: 'var(--primary)', margin: '0' }}>TypeRush</h1>
          </div>
          <p className="text-body" style={{ color: 'var(--text-secondary)', margin: '0' }}>
            Test your typing speed and improve your skills
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
          <div>
            <label htmlFor="email" style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: 'var(--text-primary)', 
              marginBottom: 'var(--space-sm)' 
            }}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: 'var(--text-primary)', 
              marginBottom: 'var(--space-sm)' 
            }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div style={{ 
              color: 'var(--error)', 
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              padding: 'var(--space-md)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              textAlign: 'center',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-xl">
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ email: '', password: '' });
              }}
              style={{ 
                marginLeft: 'var(--space-sm)', 
                color: 'var(--primary)', 
                fontWeight: '600', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {isLogin ? 'Sign up here' : 'Sign in here'}
            </button>
          </p>
        </div>

        <div className="text-center mt-lg" style={{ 
          padding: 'var(--space-lg)',
          background: 'linear-gradient(135deg, var(--primary-bg) 0%, var(--bg-tertiary) 100%)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)'
        }}>
          <p style={{ margin: '0 0 0.5rem 0' }}>Ready to test your typing skills?</p>
          <p style={{ margin: '0' }}>Join thousands of users improving their WPM!</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
