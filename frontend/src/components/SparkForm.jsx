import React, { useState, useRef } from 'react';

function SparkForm({ handleSubmit, newSparkContent, setNewSparkContent }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!newSparkContent.trim()) {
      setError('Por favor, escribe una idea antes de continuar');
      inputRef.current?.focus();
      return;
    }

    if (newSparkContent.trim().length < 5) {
      setError('Tu idea debe tener al menos 5 caracteres');
      return;
    }

    setError('');
    setIsLoading(true);
    
    try {
      await handleSubmit(e);
      setNewSparkContent('');
    } catch (err) {
      setError('Hubo un error al guardar tu idea. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewSparkContent(value);
    
    if (error && value.trim()) {
      setError('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      onSubmit(e);
    }
  };

  return (
    <div className="form-container interactive-bg">
      <h1 className="main-title">Mimir</h1>
      <form onSubmit={onSubmit} className="spark-form">
        <div className="form-group">
          <input
            ref={inputRef}
            className={`spark-input ${error ? 'error' : ''} ${newSparkContent.trim() && !error ? 'success' : ''}`}
            type="text"
            value={newSparkContent}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu próxima idea brillante..."
            disabled={isLoading}
            maxLength={200}
          />
          
          {error && (
            <div className="form-error">
              <span>⚠️</span>
              {error}
            </div>
          )}
          
          {newSparkContent.trim() && !error && (
            <div className="character-counter">
              {newSparkContent.length}/200 caracteres
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="spark-button"
          disabled={isLoading || !newSparkContent.trim()}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              Guardando...
            </>
          ) : (
            'Añadir Idea'
          )}
        </button>

        <div className="form-hint">
          Tip: Presiona Ctrl+Enter para enviar rápidamente 
        </div>
        <div className="mb-3">
          Nueva funcion con Aprender:(sobre el reino animal)
        </div>
      </form>
    </div>
  );
}

export default SparkForm;