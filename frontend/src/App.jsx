import { useState } from 'react';
import { Routes, Route, Navigate, Outlet, useOutletContext } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import SignUp from './components/SignUp';
import Sidebar from './components/SideBar';
import Home from './components/Home';

function MainLayout({ authToken, setAuthToken }) {
  const handleLogout = () => {
    fetch('http://127.0.0.1:8000/auth/token/logout/', {
      method: 'POST',
      headers: { 'Authorization': `Token ${authToken}` }
    })
    .finally(() => {
      localStorage.removeItem('authToken');
      setAuthToken(null);
    });
  };

  return (
    <div className="flex bg-gray-900 text-white min-h-screen font-sans">
      <Sidebar handleLogout={handleLogout} />
      <main className="flex-grow p-8">
        {/* Outlet ahora pasa el token a los componentes hijos (Home) */}
        <Outlet context={{ authToken, setAuthToken }} />
      </main>
    </div>
  );
}

function App() {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') || null);

  return (
    <Routes>
      <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
      <Route path="/signup" element={<SignUp />} />
      
      <Route 
        path="/" 
        element={
          authToken 
            ? <MainLayout authToken={authToken} setAuthToken={setAuthToken} /> 
            : <Navigate to="/login" />
        }
      >
        <Route index element={<Home />} />
        {/* Futuras rutas anidadas como /profile irían aquí */}
      </Route>
    </Routes>
  );
}

// Hook personalizado para que los componentes hijos accedan al context del Outlet
export function useAuth() {
  return useOutletContext();
}

export default App;