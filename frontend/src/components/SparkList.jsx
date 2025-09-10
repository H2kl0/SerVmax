import React, { useState } from 'react';

function SparkList({ sparks, authToken }) {
  const [aiIdeas, setAiIdeas] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateIdeas = (sparkId) => {
    setIsLoading(true);
    setAiIdeas('');

    fetch(`http://127.0.0.1:8000/journal/api/sparks/${sparkId}/generate_ideas/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${authToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setAiIdeas(data.ideas);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error al generar ideas:', error);
        setAiIdeas('Hubo un error al contactar a la IA.');
        setIsLoading(false);
      });
  };

  return (
    <div className="home-container">
      <div className="left-column">
        <ul className="spark-list">
          {sparks.map(spark => (
            <li key={spark.id} className="spark-item">
              <p className="mb-2">{spark.content}</p>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-400">
                  Creado el: {new Date(spark.created_at).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleGenerateIdeas(spark.id)}
                  className="spark-item-button"
                >
                  Generar Ideas
                </button>
              </div>
            </li>
          ))}
        </ul>
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

export default SparkList;