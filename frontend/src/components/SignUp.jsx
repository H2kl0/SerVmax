import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    setError('');

    // Llama al endpoint de Djoser para crear usuarios
    fetch('http://127.0.0.1:8000/auth/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    .then(response => {
      if (response.ok) {
        // Si el registro es exitoso, te envía a la página de login
        console.log('Registro exitoso!');
        navigate('/login'); 
      } else {
        // Si hay un error, lo mostramos
        throw new Error('No se pudo registrar. Intenta con otro usuario o una contraseña más segura.');
      }
    })
    .catch(err => setError(err.message));
  };

  return (
    <div className="logout-container">
      <div className='logout-card'>
      <h2>Crear cuenta</h2>
      <form onSubmit={handleSignUp} className="spark-form">
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
        <input
          
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Elige un nombre de usuario"
        />
        <input
          
          
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Elige una contraseña segura "
        />
        <button type="submit" className="spark-button">Registrarse</button>
      </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          ¿No tienes una cuenta?{' '}
          <Link to="/login" style={{ color: 'var(--electric-blue)', fontWeight: '600' }}>
            Regístrate aquí
          </Link>
        </p>
    </div>
    </div>
  );
}

export default SignUp;