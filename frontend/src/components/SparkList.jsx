import React, { useState } from 'react';
import MimirHistory from './MimirHistory';
import { Icons } from './Icons';

function SparkList({ sparks, setSparks, authToken, setSelectedSpark, selectedSpark, setAiIdeas, setIsLoading, setShowSaveButton }) {
  
  const [expandedSpark, setExpandedSpark] = useState(null);
  
  const handleSparkClick = (spark) => {
    // Si se hace clic en la idea ya seleccionada, no hacer nada para evitar llamadas repetidas
    if (selectedSpark && selectedSpark.id === spark.id) {
        return;
    }

    setSelectedSpark(spark); // Actualiza la idea seleccionada en el componente Home
    setIsLoading(true); // Activa el estado de carga
    setAiIdeas(''); // Limpia las ideas anteriores

    // Llamada real a la API de Mimir
    fetch(`http://127.0.0.1:8000/journal/api/sparks/${spark.id}/generate_ideas/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${authToken}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.ideas) {
        setAiIdeas(data.ideas);
        setShowSaveButton(true); // Mostrar botón de guardar cuando se carga una respuesta
        
        // Actualizar la lista de sparks para reflejar la nueva respuesta
        fetch('http://127.0.0.1:8000/journal/api/sparks/', {
          headers: { 'Authorization': `Token ${authToken}` },
        })
          .then(response => response.json())
          .then(updatedData => {
            if (Array.isArray(updatedData.results)) {
              setSparks(updatedData.results);
            }
          })
          .catch(error => console.error("Error al actualizar sparks:", error));
      } else if (data.error) {
        setAiIdeas(`Error: ${data.error}`);
      }
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error al generar ideas:', error);
      setAiIdeas('Error al conectar con Mimir. Intenta de nuevo.');
      setIsLoading(false);
    });
  };

  const toggleSparkExpansion = (sparkId, event) => {
    event.stopPropagation(); // Evita que se active handleSparkClick
    setExpandedSpark(expandedSpark === sparkId ? null : sparkId);
  };

  return (
    <div className="spark-list-container">
      <h3>Tu Historial de Ideas</h3>
      <ul className="spark-list">
        {sparks.map(spark => (
          <li key={spark.id} className="spark-list-item">
            <div className="spark-item-wrapper">
              <button
                className={`spark-item ${selectedSpark && selectedSpark.id === spark.id ? 'active' : ''}`}
                onClick={() => handleSparkClick(spark)}
              >
                <span className="spark-content">{spark.content}</span>
                <div className="spark-meta">
                  <span className="spark-date">
                    {new Date(spark.created_at).toLocaleDateString()}
                  </span>
                  {spark.mimir_responses && spark.mimir_responses.length > 0 && (
                    <span className="response-count">
                      <Icons.Brain size={12} />
                      {spark.mimir_responses.length}
                    </span>
                  )}
                </div>
              </button>
              
              {spark.mimir_responses && spark.mimir_responses.length > 0 && (
                <button 
                  className="expand-history-btn"
                  onClick={(e) => toggleSparkExpansion(spark.id, e)}
                  title="Ver historial de respuestas"
                >
                  {expandedSpark === spark.id ? <Icons.ChevronUp size={16} /> : <Icons.ChevronDown size={16} />}
                </button>
              )}
            </div>
            
            {expandedSpark === spark.id && (
              <MimirHistory 
                spark={spark} 
                authToken={authToken}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SparkList;