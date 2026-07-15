import React, { useState, useEffect } from 'react';
import Login from './bienes/Login';
import TablaBienes from './bienes/TablaBienes';
// Importamos el logo institucional
import logoInstitucional from './assets/logoiosep.webp'; 

function App() {
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  useEffect(() => {
    const sesionGuardada = localStorage.getItem('sesion_patrimonio');
    if (sesionGuardada === 'activo') {
      setEstaAutenticado(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setEstaAutenticado(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('sesion_patrimonio');
    setEstaAutenticado(false);
  };

  if (!estaAutenticado) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    /* FONDO DEGRADADO COMPLETO Y FIJO (Azul Oscuro a Azul Medio) */
    <div style={{ 
      minHeight: '100vh', 
      width: '100%',
      background: 'linear-gradient(135deg, #3C5177 0%, rgba(0,0,0,0.2) 100%)',
      backgroundAttachment: 'fixed', 
      paddingBottom: '5px',
      boxSizing: 'border-box',
      margin: 0
    }}>
      
      {/* CONTENEDOR PRINCIPAL DEL SISTEMA */}
      <main style={{ padding: '40px 40px 0 40px' }}>
        
        {/* NUEVA FILA INSTITUCIONAL EN EL CONTENIDO (Reemplaza a la barra superior) */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '30px',
          width: '100%'
        }}>
          {/* LADO IZQUIERDO: Logo y Título alineados */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img 
              src={logoInstitucional} 
              alt="IOSEP" 
              style={{ 
                height: '100px', /* Un tamaño claro y nítido */
                width: 'auto', 
                objectFit: 'contain'
              }} 
            />
            <h1 style={{ 
              margin: 0, 
              fontSize: '1.6rem', 
              fontWeight: 'bold', 
              letterSpacing: '0.5px',
              color: '#EBF1F6', /* Blanco azulado claro que combina excelente */
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              Sistema de Gestión de Bienes Patrimoniales
            </h1>
          </div>

          {/* LADO DERECHO: Botón Cerrar Sesión */}
          <button 
            onClick={handleLogout}
            style={{ 
              backgroundColor: '#e53e3e', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '6px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.95rem',
              transition: 'background-color 0.2s, transform 0.1s',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c53030'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e53e3e'}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Cerrar Sesión 🚪
          </button>
        </div>

        {/* COMPONENTE PRINCIPAL (Tu Formulario y Tabla Originales) */}
        <TablaBienes />
      </main>
    </div>
  );
}

export default App;