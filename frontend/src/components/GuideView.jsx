import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from './Icons';
import MimirLogo from '../images/MimirLogo.png';
import '../styles/GuideView.css';

function GuideView() {
  const examples = [
    {
      type: 'aprender:',
      icon: <Icons.Book size={24} />,
      title: 'Plan de Aprendizaje',
      description: 'Mimir creará un plan estructurado de aprendizaje con objetivos claros, pasos específicos y recursos recomendados.',
      example: 'aprender: programación en Python',
      color: '#4CAF50',
      features: [
        'Objetivos de aprendizaje claros',
        'Plan de acción paso a paso',
        'Recursos recomendados',
        'Tiempo estimado',
        'Resultados esperados'
      ]
    },
    {
      type: 'proyecto:',
      icon: <Icons.Rocket size={24} />,
      title: 'Plan de Proyecto',
      description: 'Mimir estructurará tu proyecto en fases manejables con análisis de viabilidad y métricas de éxito.',
      example: 'proyecto: aplicación móvil para delivery',
      color: '#2196F3',
      features: [
        'Análisis de viabilidad',
        'Plan por fases',
        'Recursos necesarios',
        'Métricas de éxito',
        'Gestión de riesgos'
      ]
    },
    {
      type: 'negocio:',
      icon: <Icons.Briefcase size={24} />,
      title: 'Análisis de Negocio',
      description: 'Mimir analizará la viabilidad de tu idea de negocio con propuesta de valor, mercado objetivo y modelo de negocio.',
      example: 'negocio: tienda online de productos artesanales',
      color: '#FF9800',
      features: [
        'Propuesta de valor',
        'Análisis de mercado',
        'Modelo de negocio',
        'Plan de acción 90 días',
        'Análisis de riesgos'
      ]
    },
    {
      type: 'general',
      icon: <Icons.Lightbulb size={24} />,
      title: 'Ideas Creativas',
      description: 'Mimir generará múltiples direcciones creativas para expandir tu idea con recomendaciones específicas.',
      example: 'crear un blog sobre tecnología',
      color: '#9C27B0',
      features: [
        'Múltiples direcciones',
        'Análisis de potencial',
        'Ventajas específicas',
        'Primeros pasos',
        'Recomendaciones personalizadas'
      ]
    }
  ];

  return (
    <div className="guide-view">
      <div className="guide-view-container">
        {/* Navigation */}
        <div className="guide-navigation">
          <Link to="/" className="back-btn">
            <Icons.ArrowLeft size={16} />
            Volver a Ideas
          </Link>
          <Link to="/ideas" className="nav-btn">
            <Icons.List size={16} />
            Ver Todas las Ideas
          </Link>
        </div>

        {/* Header */}
        <div className="guide-header-section">
          <div className="guide-logo">
            <img src={MimirLogo} alt="Mimir Logo" className="mimir-logo-img" />
            <div className="guide-title-section">
              <h1>Guía Completa de Mimir</h1>
              <p>Tu asistente de IA para convertir ideas en planes realizables</p>
            </div>
          </div>
        </div>

        {/* Introducción */}
        <div className="guide-intro">
          <div className="intro-card">
            <Icons.Info size={32} />
            <div>
              <h2>¿Cómo funciona Mimir?</h2>
              <p>
                Mimir es tu asistente de IA especializado en transformar ideas vagas en planes estructurados y realizables. 
                Dependiendo de cómo escribas tu idea, Mimir adaptará su respuesta para darte exactamente lo que necesitas.
              </p>
            </div>
          </div>
        </div>

        {/* Tipos de respuestas */}
        <div className="guide-types">
          <h2>Tipos de Respuestas</h2>
          <div className="types-grid">
            {examples.map((example, index) => (
              <div key={index} className="type-card" style={{ borderLeftColor: example.color }}>
                <div className="type-header">
                  <div className="type-icon" style={{ color: example.color }}>
                    {example.icon}
                  </div>
                  <div className="type-info">
                    <h3>{example.title}</h3>
                    <p className="type-description">{example.description}</p>
                  </div>
                </div>

                <div className="type-example">
                  <h4>Ejemplo de uso:</h4>
                  <code>{example.example}</code>
                </div>

                <div className="type-features">
                  <h4>Incluye:</h4>
                  <ul>
                    {example.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consejos de uso */}
        <div className="guide-tips-section">
          <h2>Consejos para Mejores Resultados</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <Icons.Lightbulb size={24} />
              <h3>Sé específico</h3>
              <p>Mientras más específica sea tu idea, más detallada y útil será la respuesta de Mimir.</p>
            </div>
            <div className="tip-card">
              <Icons.Brain size={24} />
              <h3>Usa los prefijos</h3>
              <p>Los prefijos ayudan a Mimir a entender qué tipo de respuesta necesitas.</p>
            </div>
            <div className="tip-card">
              <Icons.History size={24} />
              <h3>Revisa el historial</h3>
              <p>Todas las respuestas se guardan. Puedes consultarlas cuando quieras.</p>
            </div>
            <div className="tip-card">
              <Icons.Rocket size={24} />
              <h3>Actúa sobre las ideas</h3>
              <p>Mimir te da planes realizables. El siguiente paso es ponerlos en acción.</p>
            </div>
          </div>
        </div>

        {/* Ejemplos prácticos */}
        <div className="guide-examples-section">
          <h2>Ejemplos Prácticos</h2>
          <div className="examples-list">
            <div className="example-item">
              <strong>❌ Vago:</strong> "Quiero aprender algo nuevo"
              <br />
              <strong>✅ Específico:</strong> "aprender: desarrollo web con React y Node.js"
            </div>
            <div className="example-item">
              <strong>❌ Vago:</strong> "Tengo una idea de negocio"
              <br />
              <strong>✅ Específico:</strong> "negocio: plataforma de intercambio de libros usados"
            </div>
            <div className="example-item">
              <strong>❌ Vago:</strong> "Quiero hacer un proyecto"
              <br />
              <strong>✅ Específico:</strong> "proyecto: app móvil para tracking de hábitos saludables"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuideView;
