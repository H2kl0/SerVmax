import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar({ handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleSidebar} className="sidebar-toggle">
        {isOpen ? 'Cerrar' : 'Menú'} 
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h1 className="sidebar-title">SerVmax</h1>
        <nav className="sidebar-nav">
          <NavLink
            to="/"
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            end
          >
            Inicio
          </NavLink>
          {/* Aquí se pueden añadir más enlaces en el futuro */}
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-logout">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;