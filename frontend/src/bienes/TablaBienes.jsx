import React, { useState } from 'react';
import { MOCK_BIENES } from './mockBienes';
import styles from './Bienes.module.css';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';

// Importamos las librerías de exportación
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const LISTA_RUBROS = [
  { id: 412, nombre: "EDIFICIOS, INSTALACIONES Y TERRENOS" },
  { id: 420, nombre: "TRABAJO PUBLICO" },
  { id: 430, nombre: "MAQUINARIAS Y EQUIPOS" },
  { id: 432, nombre: "EQUIPOS DE TRANSPORTE, TRACCION Y ELEVAC" },
  { id: 433, nombre: "EQUIPO SANITARIO Y DE LABORATORIO" },
  { id: 434, nombre: "EQUIPOS DE COMUNICACION Y SEÑALAMIENTO" },
  { id: 435, nombre: "EQUIPO EDUCACIONAL Y RECREATIVO" },
  { id: 436, nombre: "EQUIPOS DE COMPUTACION" },
  { id: 437, nombre: "EQUIPOS DE OFICINA Y MUEBLES" },
  { id: 438, nombre: "HERRAMIENTAS Y REPUESTOS" },
  { id: 451, nombre: "LIBROS REVISTAS Y ELEMENTOS COLECCIONABL" },
  { id: 460, nombre: "OBRAS DE ARTE" },
  { id: 480, nombre: "ACTIVOS INTANGIBLES" },
  { id: 481, nombre: "PROGRAMAS DE COMPUTACION" },
  { id: 499, nombre: "OTROS BIENES VARIOS" }
];

const TIPOS_BIEN_499 = [
  { cod: "499-001", nombre: "DESTRUCTORA" }, { cod: "499-002", nombre: "LECTOR" },
  { cod: "499-003", nombre: "CAMARA" }, { cod: "499-004", nombre: "SOLDADOR" },
  { cod: "499-005", nombre: "MATAFUEGO" }, { cod: "499-006", nombre: "ELEVADOR DE TENSION" },
  { cod: "499-007", nombre: "REJAS" }, { cod: "499-008", nombre: "ALARMA" },
  { cod: "499-009", nombre: "SISTEMA DE VIDEO" }, { cod: "499-010", nombre: "BOLSO" },
  { cod: "499-011", nombre: "PAVA ELECTRICA" }, { cod: "499-012", nombre: "TENSIOMETRO" },
  { cod: "499-013", nombre: "TERMOMETRO" }, { cod: "499-014", nombre: "TIMBRE" },
  { cod: "499-015", nombre: "CONTENEDOR" }, { cod: "499-016", nombre: "ESTETOSCOPIO" },
  { cod: "499-017", nombre: "BALANZA" }, { cod: "499-018", nombre: "MAQUINA" },
  { cod: "499-019", nombre: "TIJERA" }, { cod: "499-020", nombre: "TELA" },
  { cod: "499-021", nombre: "ESCALERA" }, { cod: "499-022", nombre: "BOMBA DE AGUA" },
  { cod: "499-023", nombre: "CONTROL REMOTO" }, { cod: "499-024", nombre: "ESTABILIZADOR" },
  { cod: "499-025", nombre: "ROTULADOR" }, { cod: "499-026", nombre: "ANAFE" },
  { cod: "499-027", nombre: "PAVA" }, { cod: "499-028", nombre: "PUERTA" },
  { cod: "499-029", nombre: "ESCALERA" }, { cod: "499-030", nombre: "TERMOMETRO" },
  { cod: "499-031", nombre: "CONTENEDOR" }, { cod: "499-032", nombre: "SILLA" },
  { cod: "499-033", nombre: "KIT" }, { cod: "499-034", nombre: "GARRAFA" },
  { cod: "499-035", nombre: "OTROS" }, { cod: "499-036", nombre: "MANGUERA" },
  { cod: "499-037", nombre: "HERRAMIENTAS" }, { cod: "499-040", nombre: "LINTERNA" },
  { cod: "499-041", nombre: "BANDERA" }, { cod: "499-042", nombre: "MASTIL" },
  { cod: "499-043", nombre: "ESTERILIZADOR" }, { cod: "499-044", nombre: "TOILETTE" },
  { cod: "499-045", nombre: "SOPORTE" }, { cod: "499-046", nombre: "CALCULADORA" },
  { cod: "499-047", nombre: "CORTINA" }, { cod: "499-048", nombre: "COMPRESOR" },
  { cod: "499-049", nombre: "RADIO" }, { cod: "499-050", nombre: "CONOS" },
  { cod: "499-051", nombre: "TORRE UV" }, { cod: "499-052", nombre: "CABINA" },
  { cod: "499-053", nombre: "TOTEM" }, { cod: "499-054", nombre: "OXIMETRO" },
  { cod: "499-055", nombre: "IPHONE" }, { cod: "499-056", nombre: "ROUTER" },
  { cod: "499-057", nombre: "AIRE ACONDICIONADO" }, { cod: "499-058", nombre: "VENTILADOR" }
];

const obtenerFechaHoraActual = () => {
  const ahora = new Date();
  ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset());
  return ahora.toISOString().slice(0, 16);
};

const formatearFechaMostrar = (fechaString) => {
  if (!fechaString) return 'Sin fecha';
  const fecha = new Date(fechaString);
  return fecha.toLocaleString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
};

function TablaBienes() {
  const [bienes, setBienes] = useState(() => 
    MOCK_BIENES.map(b => ({ ...b, estado: b.estado || 'Alta', fecha_alta: b.fecha_alta || new Date().toISOString() }))
  );

  const [codBien, setCodBien] = useState('');
  const [descBien, setDescBien] = useState('');
  const [descDetallada, setDescDetallada] = useState('');
  const [rubroSeleccionado, setRubroSeleccionado] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [responsable, setResponsable] = useState('');
  const [valorMoneda, setValorMoneda] = useState('');
  const [fechaAltaForm, setFechaAltaForm] = useState(obtenerFechaHoraActual());

  const [bienParaImprimir, setBienParaImprimir] = useState(null);
  const [incluirBarras, setIncluirBarras] = useState(true);
  const [incluirQR, setIncluirQR] = useState(true);
  const lanzarImpresion = () => {
    window.print();
  };

  const handleRubroChange = (e) => {
    const valor = e.target.value;
    setRubroSeleccionado(valor);
    setTipoSeleccionado('');
  };

  const toggleEstado = (idBien) => {
    setBienes(bienes.map(bien => {
      if (bien.id_bien === idBien) {
        return { ...bien, estado: bien.estado === 'Alta' ? 'Baja' : 'Alta', fecha_alta: new Date().toISOString() };
      }
      return bien;
    }));
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!codBien || !descBien || !valorMoneda || !rubroSeleccionado) {
      alert("Por favor, completá los campos obligatorios.");
      return;
    }

    const objetoRubro = LISTA_RUBROS.find(r => r.id === parseInt(rubroSeleccionado));
    let objetoTipo = { id_tipo: 0, nombre_tipo: 'General' };
    if (rubroSeleccionado === "499" && tipoSeleccionado) {
      const encontrado = TIPOS_BIEN_499.find(t => t.cod === tipoSeleccionado);
      if (encontrado) objetoTipo = { id_tipo: encontrado.cod, nombre_tipo: encontrado.nombre };
    }

    const nuevoBien = {
      id_bien: bienes.length + 1,
      cod_bien: codBien,
      desc_bien: descBien,
      desc_detallada: descDetallada,
      rubro: { id_rubro: objetoRubro.id, nombre_rubro: objetoRubro.nombre },
      tipo: objetoTipo,
      departamento: { nombre_departamento: departamento || 'Sin asignar' },
      responsable: { nombre_responsable: responsable || 'Sin asignar' },
      ubicacion: { nombre_ubicacion: 'Oficina Central' },
      fecha_alta: new Date(fechaAltaForm).toISOString(),
      moneda: 'ARS',
      valor_moneda: parseFloat(valorMoneda),
      estado: 'Alta'
    };

    setBienes([...bienes, nuevoBien]);
    setCodBien(''); setDescBien(''); setDescDetallada(''); setRubroSeleccionado(''); setTipoSeleccionado(''); setDepartamento(''); setResponsable(''); setValorMoneda(''); setFechaAltaForm(obtenerFechaHoraActual());
  };

  // ==========================================
  // EXPORTAR A EXCEL (.XLSX)
  // ==========================================
  const exportarAExcel = () => {
    // Mapeamos los datos para que salgan planos y limpios en la hoja de cálculo
    const datosExcel = bienes.map(b => ({
      'Código': b.cod_bien,
      'Descripción': b.desc_bien,
      'Detalle Adicional': b.desc_detallada || '',
      'Rubro ID': b.rubro?.id_rubro || '',
      'Nombre Rubro': b.rubro?.nombre_rubro || '',
      'Tipo Código': b.tipo?.id_tipo || 'General',
      'Tipo Nombre': b.tipo?.nombre_tipo || 'General',
      'Departamento': b.departamento?.nombre_departamento || 'Sin asignar',
      'Responsable': b.responsable?.nombre_responsable || 'Sin asignar',
      'Moneda': b.moneda,
      'Valor': b.valor_moneda || 0,
      'Estado Actual': b.estado,
      'Última Modificación': formatearFechaMostrar(b.fecha_alta)
    }));

    const hoja = XLSX.utils.json_to_sheet(datosExcel);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Inventario Bienes');
    
    // Descarga automática del archivo
    XLSX.writeFile(libro, `Inventario_Patrimonial_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  // ==========================================
  // EXPORTAR A PDF (.PDF)
  // ==========================================
  const exportarAPDF = () => {
    const doc = new jsPDF('landscape'); // Apaisado para que entren bien todas las columnas

    // Título institucional
    doc.setFontSize(16);
    doc.text('IOSEP - INVENTARIO GENERAL DE BIENES PATRIMONIALES', 14, 15);
    
    doc.setFontSize(10);
    doc.text(`Fecha de Reporte: ${new Date().toLocaleString('es-AR')}`, 14, 22);

    // Definición de las columnas de la tabla del PDF
    const columnas = ['Código', 'Descripción', 'Rubro', 'Departamento', 'Responsable', 'Valor', 'Estado', 'Último Cambio'];
    
    // Filas ordenadas
    const filas = bienes.map(b => [
      b.cod_bien,
      b.desc_bien + (b.tipo && b.tipo.nombre_tipo !== 'General' ? ` (Tipo: ${b.tipo.nombre_tipo})` : ''),
      b.rubro ? `${b.rubro.id_rubro}` : 'N/A',
      b.departamento?.nombre_departamento || 'Sin asignar',
      b.responsable?.nombre_responsable || 'Sin asignar',
      `${b.moneda} ${b.valor_moneda ? b.valor_moneda.toLocaleString() : '0'}`,
      b.estado,
      formatearFechaMostrar(b.fecha_alta)
    ]);

    // Generar la tabla estilizada automáticamente
    doc.autoTable({
      head: [columnas],
      body: filas,
      startY: 28,
      theme: 'grid',
      headStyles: { fillColor: [60, 81, 119], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 8, cellPadding: 3 },
      columnStyles: { 1: { cellWidth: 50 } } // Le da más espacio a la descripción
    });

    // Descarga automática
    doc.save(`Inventario_Patrimonial_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  return (
    <div className={styles.contenedor}>
      
      {/* --- FORMULARIO DE ALTA --- */}
      <div className={styles.tarjetaFormulario}>
        <h3>Registrar Nuevo Bien Patrimonial</h3>
        <form onSubmit={handleGuardar} className={styles.gridForm}>
          <div className={styles.grupoInput}>
            <label>Código del Bien (*):</label>
            <input type="text" value={codBien} onChange={(e) => setCodBien(e.target.value)} className={styles.inputControl} placeholder="Ej: BIEN-2026-003" />
          </div>
          <div className={styles.grupoInput}>
            <label>Descripción Corta (*):</label>
            <input type="text" value={descBien} onChange={(e) => setDescBien(e.target.value)} className={styles.inputControl} placeholder="Ej: Monitor Samsung 24" />
          </div>
          <div className={`${styles.grupoInput} ${styles.campoFull}`}>
            <label>Descripción Detallada:</label>
            <textarea value={descDetallada} onChange={(e) => setDescDetallada(e.target.value)} className={styles.inputControl} style={{ height: '60px', resize: 'vertical' }} placeholder="Especificaciones técnicas..." />
          </div>
          <div className={styles.grupoInput}>
            <label>Rubro (*):</label>
            <select value={rubroSeleccionado} onChange={handleRubroChange} className={styles.inputControl} style={{ cursor: 'pointer' }}>
              <option value="">-- Seleccione un Rubro --</option>
              {LISTA_RUBROS.map((rubro) => <option key={rubro.id} value={rubro.id}>{rubro.id} - {rubro.nombre}</option>)}
            </select>
          </div>
          <div className={styles.grupoInput}>
            <label>Tipo de Bien:</label>
            <select value={tipoSeleccionado} onChange={(e) => setTipoSeleccionado(e.target.value)} className={styles.inputControl} disabled={rubroSeleccionado !== "499"} style={{ cursor: rubroSeleccionado === "499" ? 'pointer' : 'not-allowed' }}>
              {rubroSeleccionado !== "499" ? <option value="">Habilitado solo para Rubro 499</option> : <> <option value="">-- Seleccione Tipo --</option> {TIPOS_BIEN_499.map((tipo) => <option key={tipo.cod} value={tipo.cod}>{tipo.cod} - {tipo.nombre}</option>)} </>}
            </select>
          </div>
          <div className={styles.grupoInput}>
            <label>Departamento:</label>
            <input type="text" value={departamento} onChange={(e) => setDepartamento(e.target.value)} className={styles.inputControl} placeholder="Ej: Contabilidad" />
          </div>
          <div className={styles.grupoInput}>
            <label>Responsable:</label>
            <input type="text" value={responsable} onChange={(e) => setResponsable(e.target.value)} className={styles.inputControl} placeholder="Ej: Juan Pérez" />
          </div>
          <div className={styles.grupoInput}>
            <label>Fecha de Alta (*):</label>
            <input type="datetime-local" value={fechaAltaForm} onChange={(e) => setFechaAltaForm(e.target.value)} className={styles.inputControl} />
          </div>
          <div className={styles.grupoInput}>
            <label>Valor (ARS) (*):</label>
            <input type="number" value={valorMoneda} onChange={(e) => setValorMoneda(e.target.value)} className={styles.inputControl} placeholder="Ej: 450000" />
          </div>
          <div className={styles.campoFull} style={{ marginTop: '10px' }}>
            <button type="submit" className={styles.btnGuardar}>Guardar Bien</button>
          </div>
        </form>
      </div>

      {/* --- ENCABEZADO DE TABLA Y BOTONERA DE EXPORTACIÓN --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <h2 className={styles.tituloTabla} style={{ margin: 0 }}>Listado de Bienes Patrimoniales</h2>
        
        {/* BOTONES DE EXPORTACIÓN */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={exportarAExcel}
            style={{ padding: '8px 16px', backgroundColor: '#1F7246', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            📊 Exportar Excel
          </button>
          <button 
            onClick={exportarAPDF}
            style={{ padding: '8px 16px', backgroundColor: '#A32424', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            📄 Exportar PDF
          </button>
        </div>
      </div>

      {/* --- TABLA DE BIENES --- */}
      <table className={styles.tablaBienes} style={{ marginTop: '15px' }}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Descripción / Tipo</th>
            <th>Rubro</th>
            <th>Departamento</th>
            <th>Responsable</th>
            <th>Valor / Cambio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {bienes.map((bien) => (
            <tr key={bien.id_bien}>
              <td className={styles.codigoDestacado}>{bien.cod_bien}</td>
              <td>
                <strong>{bien.desc_bien}</strong>
                {bien.tipo && bien.tipo.nombre_tipo !== 'General' && (
                  <span className={styles.textoSecundario} style={{ color: '#2b6cb0', fontWeight: 'bold' }}>
                    Tipo: {bien.tipo.id_tipo} - {bien.tipo.nombre_tipo}
                  </span>
                )}
                {bien.desc_detallada && <span className={styles.textoSecundario}>{bien.desc_detallada}</span>}
              </td>
              <td>{bien.rubro ? <span><strong>{bien.rubro.id_rubro}</strong> - <small>{bien.rubro.nombre_rubro}</small></span> : <span style={{ color: '#999' }}>Sin rubro</span>}</td>
              <td>{bien.departamento?.nombre_departamento}</td>
              <td>{bien.responsable?.nombre_responsable}</td>
              <td>
                <strong>{bien.moneda} {bien.valor_moneda ? bien.valor_moneda.toLocaleString() : '0'}</strong>
                <span className={styles.textoSecundario} style={{ fontStyle: 'italic', color: '#555', marginTop: '4px' }}>🕒 {formatearFechaMostrar(bien.fecha_alta)}</span>
              </td>
              <td style={{ textAlign: 'center' }}>
                <button onClick={() => toggleEstado(bien.id_bien)} style={{ padding: '6px 14px', borderRadius: '20px', border: 'none', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer', backgroundColor: bien.estado === 'Alta' ? '#C6F6D5' : '#FED7D7', color: bien.estado === 'Alta' ? '#22543D' : '#742A2A' }}>
                  {bien.estado}
                </button>
              </td>
              <td style={{ textAlign: 'center' }}>
                <button onClick={() => setBienParaImprimir(bien)} style={{ padding: '6px 12px', backgroundColor: '#3C5177', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>
                  🖨️ Etiquetas
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- MODAL FLOTANTE DE ETIQUETAS --- */}
      {bienParaImprimir && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', maxWidth: '450px', width: '90%', color: '#333', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            <h3 style={{ marginTop: 0, borderBottom: '2px solid #3C5177', paddingBottom: '8px', color: '#3C5177' }}>Configurar Etiqueta</h3>
            <div style={{ display: 'flex', gap: '20px', backgroundColor: '#f7fafc', padding: '10px', borderRadius: '6px', marginBottom: '15px', border: '1px solid #e2e8f0' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>
                <input type="checkbox" checked={incluirBarras} onChange={(e) => setIncluirBarras(e.target.checked)} style={{ transform: 'scale(1.1)', cursor: 'pointer' }} /> Código de Barras
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>
                <input type="checkbox" checked={incluirQR} onChange={(e) => setIncluirQR(e.target.checked)} style={{ transform: 'scale(1.1)', cursor: 'pointer' }} /> Código QR
              </label>
            </div>
            <div id="seccion-etiqueta" style={{ border: '2px dashed #333', padding: '15px', borderRadius: '6px', textAlign: 'center', backgroundColor: '#fafafa', margin: '15px 0' }}>
              <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#000' }}>IOSEP - BIEN PATRIMONIAL</h4>
              <p style={{ margin: '0 0 15px 0', fontSize: '0.9rem', fontWeight: 'bold' }}>{bienParaImprimir.desc_bien}</p>
              {incluirBarras && <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}><Barcode value={bienParaImprimir.cod_bien} width={1.5} height={45} fontSize={13} /></div>}
              {incluirQR && <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', padding: '10px', width: 'fit-content', margin: '0 auto', border: '1px solid #ddd' }}><QRCode value={`Patrimonio IOSEP\nCódigo: ${bienParaImprimir.cod_bien}\nDescripción: ${bienParaImprimir.desc_bien}`} size={100} /></div>}
              <p style={{ margin: '10px 0 0 0', fontSize: '0.8rem', color: '#555' }}>Resp: {bienParaImprimir.responsable?.nombre_responsable}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
              <button onClick={() => { setBienParaImprimir(null); setIncluirBarras(true); setIncluirQR(true); }} style={{ padding: '8px 16px', backgroundColor: '#e2e8f0', color: '#333', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Cerrar</button>
              <button onClick={lanzarImpresion} disabled={!incluirBarras && !incluirQR} style={{ padding: '8px 16px', backgroundColor: '#5A83B3', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', opacity: (!incluirBarras && !incluirQR) ? 0.5 : 1 }}>Imprimir</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #seccion-etiqueta, #seccion-etiqueta * { visibility: visible; }
          #seccion-etiqueta { position: absolute; left: 0; top: 0; width: 100%; border: none; background: white; }
        }
      `}</style>

    </div>
  );
}

export default TablaBienes;