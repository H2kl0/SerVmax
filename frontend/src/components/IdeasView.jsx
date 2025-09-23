import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Icons } from './Icons';
import MimirHistory from './MimirHistory';

function IdeasView() {
  const { authToken } = useOutletContext();
  const [sparks, setSparks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSpark, setExpandedSpark] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // 5 ideas por página

  useEffect(() => {
    if (!authToken) return;

    console.log('Cargando ideas desde la API...');
    fetch('http://127.0.0.1:8000/journal/api/sparks/', {
      headers: { 
        'Authorization': `Token ${authToken}`,
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        console.log('Respuesta de la API:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('Datos recibidos:', data);
        if (data.results && Array.isArray(data.results)) {
          setSparks(data.results);
          console.log('Ideas cargadas:', data.results.length);
        } else if (Array.isArray(data)) {
          setSparks(data);
          console.log('Ideas cargadas (array directo):', data.length);
        } else {
          console.log('Formato de datos inesperado:', data);
          setSparks([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener las ideas:", error);
        setLoading(false);
      });
  }, [authToken]);

  const toggleSparkExpansion = (sparkId) => {
    setExpandedSpark(expandedSpark === sparkId ? null : sparkId);
  };

  // Lógica de paginación
  const totalPages = Math.ceil(sparks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSparks = sparks.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    setExpandedSpark(null); // Cerrar cualquier expansión al cambiar de página
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getResponseTypeIcon = (type) => {
    switch (type) {
      case 'learning': return <Icons.Book size={16} />;
      case 'project': return <Icons.Rocket size={16} />;
      case 'business': return <Icons.Briefcase size={16} />;
      case 'creative': return <Icons.Lightbulb size={16} />;
      default: return <Icons.Question size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="ideas-view">
        <div className="ideas-view-container">
          <div className="loading-container">
            <div className="loading-spinner-large"></div>
            <p>Cargando tus ideas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ideas-view">
      <div className="ideas-view-container">
        {/* Navigation */}
        <div className="ideas-navigation">
          <Link to="/" className="back-btn">
            <Icons.ArrowLeft size={16} />
            Volver a Crear Ideas
          </Link>
          <Link to="/guide" className="nav-btn">
            <Icons.Info size={16} />
            Ver Guía
          </Link>
        </div>

        {/* Header */}
        <div className="ideas-header">
          <h1>
            <Icons.List size={32} />
            Todas tus Ideas
          </h1>
          <p>Aquí puedes ver todas las ideas que has creado, ordenadas de más reciente a más antigua.</p>
        </div>

        {/* Stats */}
        <div className="ideas-stats">
          <div className="stat-card">
            <Icons.Lightbulb size={24} />
            <div>
              <h3>{sparks.length}</h3>
              <p>Ideas Totales</p>
            </div>
          </div>
          <div className="stat-card">
            <Icons.Brain size={24} />
            <div>
              <h3>{sparks.reduce((total, spark) => total + (spark.mimir_responses?.length || 0), 0)}</h3>
              <p>Respuestas de Mimir</p>
            </div>
          </div>
          <div className="stat-card">
            <Icons.History size={24} />
            <div>
              <h3>{sparks.filter(spark => spark.mimir_responses?.length > 0).length}</h3>
              <p>Ideas con Respuestas</p>
            </div>
          </div>
        </div>

        {/* Ideas List */}
        <div className="ideas-list-view">
          {sparks.length === 0 ? (
            <div className="empty-state">
              <Icons.Lightbulb size={64} />
              <h3>No tienes ideas aún</h3>
              <p>¡Empieza creando tu primera idea!</p>
              <Link to="/" className="create-idea-btn">
                <Icons.Plus size={16} />
                Crear Primera Idea
              </Link>
            </div>
          ) : (
            <>
              {/* Información de paginación */}
              <div className="pagination-info">
                <p>Mostrando {startIndex + 1}-{Math.min(endIndex, sparks.length)} de {sparks.length} ideas</p>
                <p>Página {currentPage} de {totalPages}</p>
              </div>

              {/* Lista de ideas paginada */}
              {currentSparks.map(spark => (
              <div key={spark.id} className="idea-card">
                <div className="idea-card-header">
                  <div className="idea-content">
                    <h3>{spark.content}</h3>
                    <div className="idea-meta">
                      <span className="idea-date">
                        <Icons.History size={14} />
                        {formatDate(spark.created_at)}
                      </span>
                      {spark.mimir_responses && spark.mimir_responses.length > 0 && (
                        <span className="idea-responses">
                          <Icons.Brain size={14} />
                          {spark.mimir_responses.length} respuesta{spark.mimir_responses.length !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {spark.mimir_responses && spark.mimir_responses.length > 0 && (
                    <button 
                      className="expand-idea-btn"
                      onClick={() => toggleSparkExpansion(spark.id)}
                      title="Ver respuestas de Mimir"
                    >
                      {expandedSpark === spark.id ? <Icons.ChevronUp size={20} /> : <Icons.ChevronDown size={20} />}
                    </button>
                  )}
                </div>

                {/* Mostrar tipos de respuestas */}
                {spark.mimir_responses && spark.mimir_responses.length > 0 && (
                  <div className="response-types">
                    {[...new Set(spark.mimir_responses.map(r => r.response_type))].map(type => (
                      <span key={type} className="response-type-tag">
                        {getResponseTypeIcon(type)}
                        {type === 'learning' ? 'Aprendizaje' : 
                         type === 'project' ? 'Proyecto' : 
                         type === 'business' ? 'Negocio' : 
                         type === 'creative' ? 'Creativo' : 'General'}
                      </span>
                    ))}
                  </div>
                )}

                {/* Historial expandido */}
                {expandedSpark === spark.id && (
                  <div className="idea-history-expanded">
                    <MimirHistory 
                      spark={spark} 
                      authToken={authToken}
                    />
                  </div>
                )}
              </div>
              ))}

              {/* Controles de paginación */}
              {totalPages > 1 && (
                <div className="pagination-controls">
                  <button 
                    className="pagination-btn" 
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    <Icons.ChevronUp size={16} />
                    Anterior
                  </button>
                  
                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    className="pagination-btn" 
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                    <Icons.ChevronDown size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default IdeasView;
