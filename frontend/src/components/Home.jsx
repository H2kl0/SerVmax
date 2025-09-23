import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import SparkForm from './SparkForm';
import SparkList from './SparkList';
import MimirGuide from './MimirGuide';
import Notification from './Notification';
import { Icons } from './Icons';

function Home() {
  const { authToken } = useOutletContext();
  const [sparks, setSparks] = useState([]);
  const [newSparkContent, setNewSparkContent] = useState('');

  const [selectedSpark, setSelectedSpark] = useState(null); 
  const [aiIdeas, setAiIdeas] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [notification, setNotification] = useState(null); 
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
      .catch(error => console.error("Error al obtener las chispas:", error));
  }, [authToken]);

  
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
      .catch(error => console.error("Error al crear la chispa:", error));
  };

  const closeSuggestions = () => {
      setSelectedSpark(null);
      setAiIdeas('');
      setShowSaveButton(false);
  };

  const saveCurrentResponse = () => {
    if (!selectedSpark || !aiIdeas) return;
    
    console.log('Guardando respuesta y actualizando datos...');
    
    // Actualizar la lista de sparks para reflejar la nueva respuesta
    fetch('http://127.0.0.1:8000/journal/api/sparks/', {
      headers: { 
        'Authorization': `Token ${authToken}`,
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Datos actualizados recibidos:', data);
        
        if (data.results && Array.isArray(data.results)) {
          setSparks(data.results);
        } else if (Array.isArray(data)) {
          setSparks(data);
        }
        
        // Mostrar notificación de éxito
        setNotification({
          message: `✅ ¡Respuesta guardada! "${selectedSpark.content.substring(0, 40)}..." - Ve a "Ver Todas las Ideas" para verla`,
          type: 'success'
        });
        
        // Mantener la respuesta visible pero marcar como guardada
        setShowSaveButton(false);
        
        console.log('Respuesta marcada como guardada');
      })
      .catch(error => {
        console.error("Error al actualizar las ideas:", error);
        setNotification({
          message: '✅ Respuesta guardada correctamente en el servidor',
          type: 'success'
        });
        setShowSaveButton(false);
      });
  };

  const handleRefreshIdea = () => {
    if (!selectedSpark) return;
    
    console.log('Generando nueva respuesta para la misma idea...');
    setIsLoading(true);
    setAiIdeas('');
    setShowSaveButton(false);

    // Llamar a la API para generar una nueva respuesta
    fetch(`http://127.0.0.1:8000/journal/api/sparks/${selectedSpark.id}/generate_ideas/`, {
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
        setShowSaveButton(true);
        
        setNotification({
          message: '🔄 ¡Nueva respuesta generada! Mimir ha creado una perspectiva diferente',
          type: 'info'
        });
      } else if (data.error) {
        setAiIdeas(`Error: ${data.error}`);
        setNotification({
          message: 'Error al generar nueva respuesta. Intenta de nuevo.',
          type: 'error'
        });
      }
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error al generar nueva respuesta:', error);
      setAiIdeas('Error al conectar con Mimir. Intenta de nuevo.');
      setIsLoading(false);
      setNotification({
        message: 'Error de conexión. Verifica tu conexión a internet.',
        type: 'error'
      });
    });
  };

  return (
    <div className="home-container">
      {/* Navigation */}
      <div className="home-navigation">
        <Link to="/ideas" className="nav-btn">
          <Icons.List size={16} />
          Ver Todas las Ideas
        </Link>
        <Link to="/guide" className="nav-btn">
          <Icons.Info size={16} />
          Guía Completa
        </Link>
      </div>

      {/* ======================= COLUMNA IZQUIERDA: Panel de Control ======================= */}
      <div className="left-column">
        <MimirGuide />
        <SparkForm
          handleSubmit={handleFormSubmit}
          newSparkContent={newSparkContent}
          setNewSparkContent={setNewSparkContent}
        />
        <SparkList
          sparks={sparks}
          setSparks={setSparks}               // 👈 Pasamos la función para actualizar la lista de sparks
          authToken={authToken}
          setSelectedSpark={setSelectedSpark} // 👈 Pasamos la función para actualizar la idea seleccionada
          selectedSpark={selectedSpark}       // 👈 Pasamos la idea seleccionada para el estilo "activo"
          setAiIdeas={setAiIdeas}             // 👈 Pasamos la función para actualizar las ideas de la IA
          setIsLoading={setIsLoading}         // 👈 Pasamos la función para el estado de carga
          setShowSaveButton={setShowSaveButton} // 👈 Pasamos la función para mostrar el botón de guardar
        />
      </div>

      {/* ======================= COLUMNA DERECHA: Área de Resultados ======================= */}
      <div className="right-column">
        {isLoading && (
            <div className="placeholder-content">
                <div className="loading-spinner-large"></div>
                <p className="neon-text">Mimir está pensando...</p>
            </div>
        )}
        
        {!isLoading && aiIdeas && selectedSpark && (
          <div className="suggested-ideas-container">
            <div className="response-header">
              <h2>🧠 Respuesta de Mimir para "{selectedSpark.content}"</h2>
              <div className="response-actions">
                <button className="close-button" onClick={closeSuggestions}>
                  <Icons.X size={16} />
                </button>
              </div>
            </div>
            <div className="card idea-suggestion-card">
              <div className="mimir-response-content">
                {aiIdeas.split('\n').map((line, index) => {
                  if (line.trim() === '') return <br key={index} />;
                  
                  // Detectar títulos con emojis y **texto**
                  if (line.includes('**') && (line.includes('📚') || line.includes('🎯') || line.includes('📋') || line.includes('🛠️') || line.includes('⏱️') || line.includes('🎉') || line.includes('🚀') || line.includes('📊') || line.includes('💰') || line.includes('📈') || line.includes('💼') || line.includes('👥') || line.includes('⚠️') || line.includes('💡') || line.includes('🌟'))) {
                    return <h3 key={index} className="mimir-section-title">{line}</h3>;
                  }
                  
                  // Detectar subtítulos con **Fase X:** o **Mes X:**
                  if (line.includes('**Fase') || line.includes('**Mes') || line.includes('**Dirección')) {
                    return <h4 key={index} className="mimir-subsection-title">{line}</h4>;
                  }
                  
                  // Detectar listas con • o -
                  if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                    return <li key={index} className="mimir-list-item">{line.replace(/^[•-]\s*/, '')}</li>;
                  }
                  
                  // Detectar listas numeradas
                  if (/^\d+\./.test(line.trim())) {
                    return <li key={index} className="mimir-numbered-item">{line}</li>;
                  }
                  
                  return <p key={index} className="mimir-text">{line}</p>;
                })}
              </div>
            </div>
            
            {/* Botones de acción*/}
            <div className="response-bottom-actions">
              <button className="refresh-response-btn" onClick={() => handleRefreshIdea()}>
                <Icons.ArrowLeft size={16} />
                Nueva Respuesta
              </button>
              <button className="save-response-btn" onClick={saveCurrentResponse}>
                <Icons.Save size={16} />
                Guardar Respuesta
              </button>
            </div>
          </div>
        )}

        {!isLoading && !selectedSpark && (
            <div className="placeholder-content">
                <h3>Bienvenido a Mimir</h3>
                <p>Crea una nueva idea o selecciona una de tu historial para que la IA genere sugerencias para ti.</p>
            </div>
        )}
      </div>
      
      {/* Notificación */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default Home;