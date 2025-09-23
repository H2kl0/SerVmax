import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import SparkForm from './SparkForm';
import SparkList from './SparkList';

function Home() {
  const { authToken } = useOutletContext();
  const [sparks, setSparks] = useState([]);
  const [newSparkContent, setNewSparkContent] = useState('');
  const [aiIdeas, setAiIdeas] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Obtener la lista de ideas
  useEffect(() => {
    if (!authToken) return;

    fetch('http://127.0.0.1:8000/journal/api/sparks/', {
      headers: { 'Authorization': `Token ${authToken}` },
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
        'Authorization': `Token ${authToken}`,
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
    <div className="home-container">
      <div className="left-column">
        
        <SparkForm
          handleSubmit={handleFormSubmit}
          newSparkContent={newSparkContent}
          setNewSparkContent={setNewSparkContent}
        />
        <SparkList
          sparks={sparks}
          authToken={authToken}
          setAiIdeas={setAiIdeas}
          setIsLoading={setIsLoading}
        />
      </div>
      <div className="right-column">
        {isLoading && <p className="text-loading">Generando ideas con la IA...</p>}
        {aiIdeas && (
          <div className="ai-results">
            <h3>Ideas Sugeridas:</h3>
            <p>{aiIdeas}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;