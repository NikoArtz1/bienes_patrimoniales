import React, { useState } from 'react';
import styles from './Login.module.css';
import logoInstitucional from '../assets/logoiosep.webp'; 

function Login({ onLoginSuccess }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!usuario.trim() || !password.trim()) {
      setError('Por favor, ingresá tu usuario y contraseña.');
      return;
    }

    if (usuario === 'admin' && password === 'iosep2026') {
      localStorage.setItem('sesion_patrimonio', 'activo');
      onLoginSuccess();
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className={styles.contenedorLogin}>
      <div className={styles.tarjetaLogin}>
        
        <div className={styles.contenedorLogo}>
          <img src={logoInstitucional} alt="Logo IOSEP" className={styles.logoImg} />
        </div>

        <p className={styles.subtitulo}>
          Sistema de Gestión de Bienes Patrimoniales
        </p>

        {error && <div className={styles.mensajeError}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.grupoInput}>
            <label>Usuario</label>
            <input 
              type="text" 
              value={usuario} 
              onChange={(e) => setUsuario(e.target.value)} 
              className={styles.inputControl}
              placeholder="Ingrese su usuario"
            />
          </div>

          <div className={styles.grupoInput}>
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={styles.inputControl}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className={styles.btnIngresar}>
            Ingresar al Sistema
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;