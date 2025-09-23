import React, { useState } from 'react';
import { Icons } from './Icons';

function MimirHistory({ spark, authToken }) {
  const [showHistory, setShowHistory] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);

  if (!spark || !spark.mimir_responses || spark.mimir_responses.length === 0) {
    return null;
  }

  const getResponseTypeIcon = (type) => {
    switch (type) {
      case 'learning': return <Icons.Book size={16} />;
      case 'project': return <Icons.Rocket size={16} />;
      case 'business': return <Icons.Briefcase size={16} />;
      case 'creative': return <Icons.Lightbulb size={16} />;
      default: return <Icons.Question size={16} />;
    }
  };

  const getResponseTypeLabel = (type) => {
    switch (type) {
      case 'learning': return 'Plan de Aprendizaje';
      case 'project': return 'Plan de Proyecto';
      case 'business': return 'Análisis de Negocio';
      case 'creative': return 'Ideas Creativas';
      default: return 'Respuesta General';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mimir-history">
      <button 
        className="history-toggle-btn"
        onClick={() => setShowHistory(!showHistory)}
      >
        <div className="history-btn-content">
          <Icons.History size={16} />
          <span>Historial de Mimir ({spark.mimir_responses.length})</span>
        </div>
        {showHistory ? <Icons.ChevronUp size={16} /> : <Icons.ChevronDown size={16} />}
      </button>

      {showHistory && (
        <div className="history-container">
          <div className="history-list">
            {spark.mimir_responses.map((response) => (
              <div 
                key={response.id} 
                className={`history-item ${selectedResponse?.id === response.id ? 'active' : ''}`}
                onClick={() => setSelectedResponse(selectedResponse?.id === response.id ? null : response)}
              >
                <div className="history-item-header">
                  <div className="response-type">
                    {getResponseTypeIcon(response.response_type)}
                    <span>{getResponseTypeLabel(response.response_type)}</span>
                  </div>
                  <span className="response-date">{formatDate(response.created_at)}</span>
                </div>
                <div className="history-item-preview">
                  {response.response_content.substring(0, 100)}...
                </div>
              </div>
            ))}
          </div>

          {selectedResponse && (
            <div className="history-detail">
              <div className="history-detail-header">
                <div className="detail-title">
                  {getResponseTypeIcon(selectedResponse.response_type)}
                  <h3>{getResponseTypeLabel(selectedResponse.response_type)}</h3>
                </div>
                <span className="detail-date">{formatDate(selectedResponse.created_at)}</span>
                <button 
                  className="close-detail-btn"
                  onClick={() => setSelectedResponse(null)}
                >
                  <Icons.X size={16} />
                </button>
              </div>
              <div className="history-detail-content">
                <div className="response-content">
                  {selectedResponse.response_content.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MimirHistory;
