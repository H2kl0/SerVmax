import React from 'react';

function ArchiveModal({ isOpen, onClose, sparks }) {
  if (!isOpen) {
    return null;
  }

  const archivedSparks = sparks.slice(5);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      {/* Contenedor del modal (evita que el clic interior cierre el modal) */}
      <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Ideas Archivadas</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>
        
        {/* Lista de ideas archivadas */}
        <ul className="space-y-3 max-h-96 overflow-y-auto">
          {archivedSparks.length > 0 ? (
            archivedSparks.map(spark => (
              <li key={spark.id} className="bg-gray-700 p-3 rounded-md">
                <p>{spark.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Creado el: {new Date(spark.created_at).toLocaleDateString()}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-400">No hay ideas antiguas para mostrar.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ArchiveModal;