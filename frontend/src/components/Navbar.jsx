import React from 'react';

function Navbar({ handleLogout, onOpenArchive }) {
  return (
    <nav className="bg-gray-800 p-4 mb-6 rounded-md border border-gray-700 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">IdeaSpark </h1>
      <div>
        {/* El nuevo botón para abrir el archivo */}
        <button 
          onClick={onOpenArchive}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors mr-4"

        >
          Ver Archivo
        </button>
        <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;