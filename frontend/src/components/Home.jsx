import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom'; // Para recibir el token
import SparkForm from './SparkForm';
import SparkList from './SparkList';

function Home() {
  const { authToken } = useOutletContext(); // Recibe el token desde el Outlet
  const [sparks, setSparks] = useState([]);
  const [newSparkContent, setNewSparkContent] = useState('');

  // Obtener la lista de ideas
  useEffect(() => {
    if (!authToken) return;

    fetch('http://127.0.0.1:8000/journal/api/sparks/', {
      headers: { 'Authorization': `Token ${authToken}` }
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.results)) {
          setSparks(data.results);
        }
      })
      .catch(error => console.error("Hubo un error al obtener las chispas!", error));
  }, [authToken]);

  // Manejar el envío del formulario
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!newSparkContent.trim()) return;

    fetch('http://127.0.0.1:8000/journal/api/sparks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`
      },
      body: JSON.stringify({ content: newSparkContent }),
    })
    .then(response => response.json())
    .then(newSpark => {
      setSparks([newSpark, ...sparks]);
      setNewSparkContent('');
    })
    .catch(error => console.error("Hubo un error al crear la chispa!", error));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Tus Ideas Recientes</h2>
      <SparkForm 
        handleSubmit={handleFormSubmit}
        newSparkContent={newSparkContent}
        setNewSparkContent={setNewSparkContent}
      />
      <SparkList sparks={sparks} authToken={authToken} />
    </div>
  );
}

export default Home;