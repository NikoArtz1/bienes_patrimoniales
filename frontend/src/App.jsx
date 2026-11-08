import React, { useState, useEffect } from 'react';
import Login from './bienes/Login';
import TablaBienes from './bienes/TablaBienes';
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
    <div style={{ 
      minHeight: '100vh', 
      width: '100%',
      margin: 0,
      padding: 0,
      overflowX: 'hidden',
      background: 'linear-gradient(135deg, #1A2536 0%, #3C5177 100%)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    }}>
      
      {/* CABECERA FIJA */}
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        marginRight: '17px', // 👈 deja espacio para la barra de scroll
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg,#3C5177 0%,#1A2536 100%)',
        padding: '20px 40px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
      }}>
        {/* IZQUIERDA: Logo */}
        <img 
          src={logoInstitucional} 
          alt="IOSEP" 
          style={{ 
            height: '100px',
            width: 'auto',
            objectFit: 'contain'
          }} 
        />

        {/* CENTRO: Título */}
        <h1 style={{ 
          margin: 0, 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          letterSpacing: '1px',
          color: '#EBF1F6',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          textAlign: 'center',
          flex: 1,
          textTransform: 'uppercase',
          fontFamily: 'Roboto, Arial, sans-serif'

        }}>
          Sistema de Gestión de Bienes Patrimoniales
        </h1>

        {/* DERECHA: Botón */}
        <button 
          onClick={handleLogout}
          style={{ 
            backgroundColor: 'white',
            color: '#1A2536',
            border: '2px solid #1A2536',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.95rem',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            marginRight: '40px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0';
            e.currentTarget.style.color = '#1A2536';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = '#1A2536';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.backgroundColor = '#1A2536';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'scale(0.96)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main style={{ 
        padding: '140px 40px 40px 40px' // 👈 espacio para que el contenido no se tape
      }}>
        <TablaBienes />
      </main>
    </div>
  );
}

export default App;

