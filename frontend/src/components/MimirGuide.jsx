import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from './Icons';
import MimirLogo from '../images/MimirLogo.png';

function MimirGuide() {
  return (
    <div className="mimir-guide-compact">
      <div className="guide-header-compact">
        <div className="mimir-branding">
          <img src={MimirLogo} alt="Mimir" className="mimir-logo-small" />
          <div className="mimir-intro">
            <h3>Mimir AI Assistant</h3>
            <p>Transforma tus ideas en planes realizables</p>
          </div>
        </div>
        <Link to="/guide" className="full-guide-btn">
          <Icons.Info size={16} />
          Ver Guía Completa
        </Link>
      </div>

      <div className="quick-tips">
        <div className="tip-item">
          <Icons.Book size={16} />
          <span><code>aprender:</code> para planes de aprendizaje</span>
        </div>
        <div className="tip-item">
          <Icons.Rocket size={16} />
          <span><code>proyecto:</code> para planes de proyecto</span>
        </div>
        <div className="tip-item">
          <Icons.Briefcase size={16} />
          <span><code>negocio:</code> para análisis de negocio</span>
        </div>
        <div className="tip-item">
          <Icons.Lightbulb size={16} />
          <span>Sin prefijo para ideas creativas</span>
        </div>
      </div>
    </div>
  );
}

export default MimirGuide;
