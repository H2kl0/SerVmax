import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setAuthToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/token/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Usuario o contraseña incorrectos.');
      }

      const data = await response.json();
      setAuthToken(data.auth_token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar sesión</h2>

        {error && (
          <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Usuario"
            required
          />

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />

          <button type="submit">Entrar</button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          ¿No tienes una cuenta?{' '}
          <Link to="/signup" style={{ color: 'var(--electric-blue)', fontWeight: '600' }}>
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
