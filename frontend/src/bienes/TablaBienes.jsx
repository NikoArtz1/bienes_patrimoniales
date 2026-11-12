import React, { useState } from 'react';
import { MOCK_BIENES } from './mockBienes';
import styles from './Bienes.module.css';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';

// Importamos las librerías de exportación
import { generarPDFAnexo } from './exportarPDFAnexo';
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

const TIPOS_BIEN_BASE_499 = [
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

const LISTA_DEPARTAMENTOS_BASE = [
  { cod: "01", nombre: "PRESIDENCIA" },
  { cod: "02", nombre: "GERENCIA GENERAL" },
  { cod: "03", nombre: "GERENCIA CONTABLE" },
  { cod: "04", nombre: "GERENCIA PRESTACIONAL" },
  { cod: "05", nombre: "GERENCIA COMERCIAL" },
  { cod: "06", nombre: "GERENCIA MEDICA" },
  { cod: "07", nombre: "CASA CENTRAL" }
];

const LISTA_RESPONSABLES_BASE = [
  { cod: "0009", nombre: "DRA. MARTA GOMEZ" },
  { cod: "0002", nombre: "ESTELA KHAIRALLA" },
  { cod: "0003", nombre: "ROXANA LUNA" },
  { cod: "0004", nombre: "CPN.. JUAN JOSE SIRAGUSA" },
  { cod: "0005", nombre: "ETELVINA PELAEZ" },
  { cod: "0006", nombre: "DRA. NANCY PILAN" },
  { cod: "0007", nombre: "ANA M DE FIGUEROA" },
  { cod: "0008", nombre: "ADRIANA BAARRIONUEVO" },
  { cod: "0010", nombre: "CPN. JOSE L. ACOSTA" },
  { cod: "0011", nombre: "JUAN JOSE SIRAGUSA" },
  { cod: "0012", nombre: "HUGO PEREZ" },
  { cod: "0013", nombre: "JAVIER FERNANDEZ" },
  { cod: "0014", nombre: "MANUEL H ALVAREZ" },
  { cod: "0015", nombre: "LUIS CISNEROS" },
  { cod: "0016", nombre: "ORLANDO CUCKLA" },
  { cod: "0017", nombre: "DRA. CARMEN FARFAN" },
  { cod: "0020", nombre: "RENE ESPINDOLA" },
  { cod: "0021", nombre: "NANCY SUAREZ" },
  { cod: "0022", nombre: "ALFREDO DANTE RICARTTI" },
  { cod: "0023", nombre: "ANABEL CANO" },
  { cod: "0053", nombre: "MARIA SALVATIERRA" },
  { cod: "0024", nombre: "DANIELA BOLZON" },
  { cod: "0025", nombre: "MARTA AGUIRRE" },
  { cod: "0026", nombre: "EDUARDO YANUZZI" },
  { cod: "0027", nombre: "REINA RODRIGUEZ" },
  { cod: "0028", nombre: "JUAN ALBERTO TAUIL" },
  { cod: "0029", nombre: "MARCELA CASTRO" },
  { cod: "0030", nombre: "GUSTAVO GONZALEZ" },
  { cod: "0031", nombre: "BONAHORA OMAR" },
  { cod: "0032", nombre: "PINTO PATRICIA VERONICA" },
  { cod: "0033", nombre: "DR. CARLOS GOMEZ ZANNI" },
  { cod: "0034", nombre: "JOSE LLANOS" },
  { cod: "0035", nombre: "SANTILLAN ORLANDO" },
  { cod: "0036", nombre: "DRA. PEREZ" },
  { cod: "0037", nombre: "SANTILLAN ELENA" },
  { cod: "0038", nombre: "SILVIA SANCHEZ" },
  { cod: "0039", nombre: "GIAGISCHIA MARIO" },
  { cod: "0040", nombre: "HORACIO ARAUJO" },
  { cod: "0041", nombre: "MIGUEL HERRERA" },
  { cod: "0042", nombre: "ALICIA GONZALEZ" },
  { cod: "0043", nombre: "TEODORA FALCIONE DE LUCIO" },
  { cod: "0044", nombre: "DR. CARLOS OLIVERA" },
  { cod: "0045", nombre: "JORGE ARIAS" },
  { cod: "0046", nombre: "CPN. ALBERTO TAUIL" },
  { cod: "0047", nombre: "GUSTAVO CASTILLO" },
  { cod: "0048", nombre: "JOSE MUÑOZ" },
  { cod: "0049", nombre: "ANA VILLEGAS" },
  { cod: "0050", nombre: "CAMPOS RAMON" },
  { cod: "0051", nombre: "MIGUEL LOPEZ" },
  { cod: "0052", nombre: "CLARA VON ZEILAU" },
  { cod: "0054", nombre: "ALBERTO PAZ" },
  { cod: "0055", nombre: "CPN. DIEGO CORTES" },
  { cod: "0117", nombre: "LINA FERNANDEZ FULCO" },
  { cod: "0056", nombre: "GUILLERMO FERREYRA" },
  { cod: "0057", nombre: "GRACIELA M. DE CORONA" },
  { cod: "0058", nombre: "MARIA AVILA DE BARRIENTOS" },
  { cod: "0059", nombre: "RAMONA DE FRANICHEVICH" },
  { cod: "0060", nombre: "MARIA SALVATIERRA DE MUÑOZ" },
  { cod: "0061", nombre: "MABEL SIERRA" },
  { cod: "0062", nombre: "ANTONELLE VERCELLI" },
  { cod: "0063", nombre: "SILVIA PEREZ" },
  { cod: "0064", nombre: "CRISTINA BOBBA DE SIRAGUSA" },
  { cod: "0065", nombre: "MARTA ARENAS" },
  { cod: "0066", nombre: "MARCELA BOIX" },
  { cod: "0067", nombre: "DRA. ESTHER PADILLA DE ALVAREZ" },
  { cod: "0068", nombre: "HUGO FABIAN DIAZ" },
  { cod: "0069", nombre: "MARIANA PALMERO" },
  { cod: "0070", nombre: "ING DANIEL LEIVA" },
  { cod: "0071", nombre: "ALEJANDRA MASSUH" },
  { cod: "0072", nombre: "ADRIANA NAJARRO" },
  { cod: "0073", nombre: "MARTA ESTELA GOMEZ" },
  { cod: "0074", nombre: "CRISTIAN NASIF" },
  { cod: "0075", nombre: "ENZO REARTE" },
  { cod: "0076", nombre: "SANCHEZ NELIDA" },
  { cod: "0077", nombre: "DR. GABRIEL CORBALAN" },
  { cod: "0078", nombre: "DIEGO MAURICIO PONCE" },
  { cod: "0079", nombre: "CRISTIAN GONZALEZ" },
  { cod: "0080", nombre: "MERCEDES FERREYRA" },
  { cod: "0081", nombre: "GRACIELA BANCO" },
  { cod: "0082", nombre: "DR LUIS DANIEL CORTIGIANI" },
  { cod: "0083", nombre: "OMAR ORIETA" },
  { cod: "0084", nombre: "DR KURAN JOSE" },
  { cod: "0085", nombre: "OCON GABRIEL" },
  { cod: "0086", nombre: "PEREYRA MARCELO" },
  { cod: "0087", nombre: "ANDREA NAJIM KARAN" },
  { cod: "0088", nombre: "JOSE DOMINGO FIGUEROA" },
  { cod: "0089", nombre: "CLEMENTE MARTA" },
  { cod: "0090", nombre: "ARANDA JUAN CARLOS" },
  { cod: "0091", nombre: "WALTER ROBERTO AGUERO" },
  { cod: "0092", nombre: "IRMA BARRAZA" },
  { cod: "0093", nombre: "VALERIA VELARDE" },
  { cod: "0094", nombre: "RAMIRO A FERNANDEZ" },
  { cod: "0095", nombre: "FELISA BEATRIZ CRESPO" },
  { cod: "0096", nombre: "RAFAELA MILET" },
  { cod: "0097", nombre: "RUIZ ALVELDA" },
  { cod: "0098", nombre: "GONZALEZ FERNANDO DANIEL" },
  { cod: "0099", nombre: "JUSTO PASTOR SANDEZ" },
  { cod: "0100", nombre: "DRA GRACIELA BEATRIZ YOLES" },
  { cod: "0101", nombre: "ROLANDO DEL VALLE COMPER" },
  { cod: "0102", nombre: "DR. RAUL DIVI" },
  { cod: "0132", nombre: "ALVARO LUNA" },
  { cod: "0104", nombre: "RAMON CAMPOS" },
  { cod: "0105", nombre: "MIGUEL ANGEL RODRIGUEZ" },
  { cod: "0106", nombre: "CLARA VON ZEILAU" },
  { cod: "0107", nombre: "HUGO MARTINEZ" },
  { cod: "0108", nombre: "DIEGO CORRAL" },
  { cod: "0109", nombre: "CRISTINA DE GONZALEZ" },
  { cod: "0110", nombre: "EDUARDO SPAT" },
  { cod: "0111", nombre: "JOSE VARELA" },
  { cod: "0103", nombre: "DOLORES SILVA" },
  { cod: "0112", nombre: "CAMPOS TRINIDAD" },
  { cod: "0113", nombre: "CPN SANTOS" },
  { cod: "0114", nombre: "DRA. MENEGATTI CRISTINA" },
  { cod: "0115", nombre: "SRA CAPILLA" },
  { cod: "0116", nombre: "SRA SECCO" },
  { cod: "0118", nombre: "DRA CACERES" },
  { cod: "0119", nombre: "DR DESTEFANI" },
  { cod: "0120", nombre: "SR SALEGAS" },
  { cod: "0121", nombre: "LINA LEGUIZAMON" },
  { cod: "0122", nombre: "SRA SANDEZ" },
  { cod: "0123", nombre: "CPN BARTOLINI" },
  { cod: "0124", nombre: "SR GOMEZ" },
  { cod: "0125", nombre: "DR FARES" },
  { cod: "0126", nombre: "CARLOS GOMEZ" },
  { cod: "0127", nombre: "ADRIANA CALVO" },
  { cod: "0128", nombre: "RICARDO NAZAR" },
  { cod: "0129", nombre: "ELIZABETH GOMEZ" },
  { cod: "0130", nombre: "ROSA FERNANDEZ" },
  { cod: "0131", nombre: "SRA. DE ROBLES" },
  { cod: "0133", nombre: "CPN SUSANA FARIAS" },
  { cod: "0134", nombre: "SRA. DE ROLDAN" },
  { cod: "0135", nombre: "CHAZARRETA ALFREDO" },
  { cod: "0136", nombre: "CPN RAUL AYUCH" },
  { cod: "0137", nombre: "MARY SAYAGO" },
  { cod: "0138", nombre: "VALERIA VELARDEZ" },
  { cod: "0139", nombre: "OLGA SGOIFO" },
  { cod: "0140", nombre: "BONAHORA MIRIAM" },
  { cod: "0141", nombre: "ANA LOCASCIO" },
  { cod: "0142", nombre: "LOLITA ABDALA" },
  { cod: "0143", nombre: "OSCAR CARDENAS" },
  { cod: "0001", nombre: "ADRIANA PERALTA" },
  { cod: "0145", nombre: "JUAN ROLANDO CAMPER" },
  { cod: "0144", nombre: "ALVARO JOSE LUNA" },
  { cod: "0146", nombre: "JONATHAN REGUEIRA" },
  { cod: "0147", nombre: "PAOLA JOZAMI" },
  { cod: "0148", nombre: "DR RODRIGUEZ" },
  { cod: "0149", nombre: "SILVIA BARBUR" },
  { cod: "0150", nombre: "SEBASTIAN BARRAZA" },
  { cod: "0151", nombre: "MARIA E TARCHINI" },
  { cod: "0152", nombre: "OSVALDO OLIVA" },
  { cod: "0153", nombre: "FLAVIA VELENZUELA" },
  { cod: "0154", nombre: "ALICIA ALEGRE" },
  { cod: "0155", nombre: "DR CARLOS EDUARDO BELTRAN" },
  { cod: "0156", nombre: "CONTADOR ALVAREZ" },
  { cod: "0157", nombre: "ADRIANA JUAREZ" },
  { cod: "0158", nombre: "JUAN CARLOS WASHINGTON" },
  { cod: "0159", nombre: "ANALIA MERCEDES ARCE" },
  { cod: "0160", nombre: "ZIGALINI MARIA PAOLA" },
  { cod: "0161", nombre: "ARNALDO SUAREZ" },
  { cod: "0162", nombre: "RODRIGUEZ KRASTEFF" },
  { cod: "0163", nombre: "NESTOR CEJAS" },
  { cod: "0164", nombre: "ENRIQUE TREJO" },
  { cod: "0165", nombre: "GABRIELA PALAZZI" },
  { cod: "0166", nombre: "KARINA GALVAN" },
  { cod: "0167", nombre: "MARTA ROMINA DIAZ GIL" },
  { cod: "0168", nombre: "DRA. SUSANA GONZALEZ" },
  { cod: "0169", nombre: "LUCIA SOSA" },
  { cod: "0170", nombre: "RAMON ALGAÑARAZ" },
  { cod: "0171", nombre: "CLAUDIA ALBINOTO" },
  { cod: "0172", nombre: "BRAVO ROMULO" },
  { cod: "0173", nombre: "RUBEN CARRIZO" },
  { cod: "0174", nombre: "BONAHORA SEBASTIAN" },
  { cod: "0175", nombre: "ANDREA HOFKAMP" },
  { cod: "0176", nombre: "RAQUEL B. NASIF" },
  { cod: "0177", nombre: "GUILLERMO ATTEBURY" },
  { cod: "0178", nombre: "AQUILES CORVALAN" },
  { cod: "0179", nombre: "MARIO ROBLES" }
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
    MOCK_BIENES.map(b => ({ ...b, estado: b.estado || 'Alta', fecha_alta: b.fecha_alta || new Date().toISOString(), factura: b.factura || '', valor: b.valor !== undefined ? b.valor : (b.valor_moneda || 0) }))
  );
  
  // Estados para Rubros
  const [rubros, setRubros] = useState(LISTA_RUBROS);
  const [mostrarModalRubro, setMostrarModalRubro] = useState(false);
  const [nuevoRubroCod, setNuevoRubroCod] = useState('');
  const [nuevoRubroNombre, setNuevoRubroNombre] = useState('');

  // Estados para Tipos de Bien (Rubro 499)
  const [tiposBien, setTiposBien] = useState(TIPOS_BIEN_BASE_499);
  const [mostrarModalTipo, setMostrarModalTipo] = useState(false);
  const [mostrarModalEditarTipo, setMostrarModalEditarTipo] = useState(false);
  const [nuevoTipoNombre, setNuevoTipoNombre] = useState('');
  const [nombreEditadoTipo, setNombreEditadoTipo] = useState('');

  // Estados para Departamentos
  const [departamentos, setDepartamentos] = useState(LISTA_DEPARTAMENTOS_BASE);
  const [mostrarModalDepto, setMostrarModalDepto] = useState(false);
  const [mostrarModalEditarDepto, setMostrarModalEditarDepto] = useState(false);
  const [nuevoDeptoNombre, setNuevoDeptoNombre] = useState('');
  const [nombreEditadoDepto, setNombreEditadoDepto] = useState('');

  // Estados para Responsables
  const [responsables, setResponsables] = useState(LISTA_RESPONSABLES_BASE);
  const [mostrarModalEditarResp, setMostrarModalEditarResp] = useState(false);
  const [nombreEditadoResp, setNombreEditadoResp] = useState('');

  // Estados para Edición de un Bien Existente
  const [bienAEditar, setBienAEditar] = useState(null);
  const [editCod, setEditCod] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editDetalle, setEditDetalle] = useState('');
  const [editRubro, setEditRubro] = useState('');
  const [editTipo, setEditTipo] = useState('');
  const [editDepto, setEditDepto] = useState('');
  const [editResp, setEditResp] = useState('');
  const [editValor, setEditValor] = useState('');
  const [editFechaAlta, setEditFechaAlta] = useState('');
  const [editFactura, setEditFactura] = useState('');
  const [editEstado, setEditEstado] = useState('');

  const [descBien, setDescBien] = useState('');
  const [descDetallada, setDescDetallada] = useState('');
  const [rubroSeleccionado, setRubroSeleccionado] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');
  const [responsableSeleccionado, setResponsableSeleccionado] = useState('');
  const [valorMoneda, setValorMoneda] = useState('');
  const [cantidadLote, setCantidadLote] = useState('1');
  const [facturaImagen, setFacturaImagen] = useState('');
  const [fechaAltaForm, setFechaAltaForm] = useState(obtenerFechaHoraActual());

  const [bienParaImprimir, setBienParaImprimir] = useState(null);
  const [incluirBarras, setIncluirBarras] = useState(true);
  const [incluirQR, setIncluirQR] = useState(true);
  
  // --- BUSCADOR GLOBAL ---
  const [busqueda, setBusqueda] = useState('');

  const calcularCodigoGenerado = (rubroId, tipoCod) => {
    if (!rubroId) return '';
    const parteRubro = rubroId.toString();
    
    let parteTipo = "000";
    if (rubroId.toString() === "499" && tipoCod) {
      parteTipo = tipoCod.replace('499-', '').padStart(3, '0');
    }

    const cantidadExistente = bienes.filter(b => {
      return b.rubro?.id_rubro?.toString() === rubroId.toString();
    }).length + 1;

    const parteCantidad = String(cantidadExistente).padStart(5, '0');
    return `${parteRubro}${parteTipo}${parteCantidad}`;
  };

  const codigoBienActual = calcularCodigoGenerado(rubroSeleccionado, tipoSeleccionado);

  const bienesFiltrados = bienes.filter(bien => {
    const termino = busqueda.toLowerCase().trim();
    if (!termino) return true;

    const textoCompleto = [
      bien.cod_bien,
      bien.desc_bien,
      bien.desc_detallada,
      bien.rubro?.id_rubro,
      bien.rubro?.nombre_rubro,
      bien.tipo?.id_tipo,
      bien.tipo?.nombre_tipo,
      bien.departamento?.nombre_departamento,
      bien.responsable?.nombre_responsable,
      bien.moneda,
      bien.valor,
      bien.estado
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return textoCompleto.includes(termino);
  });

  // --- CÁLCULO DE CONTADORES DINÁMICOS PARA EL FILTRADO ---
  const totalBienesFiltrados = bienesFiltrados.length;
  const totalAltasFiltradas = bienesFiltrados.filter(b => b.estado === 'Alta').length;
  const totalBajasFiltradas = bienesFiltrados.filter(b => b.estado === 'Baja').length;

  // --- SELECCIÓN PARA EXPORTAR ---
  const [seleccionados, setSeleccionados] = useState([]);

  const toggleSeleccion = (id) =>
    setSeleccionados((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const todosVisiblesSeleccionados =
    bienesFiltrados.length > 0 && bienesFiltrados.every((b) => seleccionados.includes(b.id_bien));

  const toggleTodosVisibles = () => {
    const idsVisibles = bienesFiltrados.map((b) => b.id_bien);
    setSeleccionados((prev) =>
      todosVisiblesSeleccionados
        ? prev.filter((id) => !idsVisibles.includes(id))
        : [...new Set([...prev, ...idsVisibles])]
    );
  };

  const lanzarImpresion = () => {
    window.print();
  };

  // --- MANEJADOR DE CARGA DE IMAGEN (FACTURA) ---
  const handleImagenFacturaChange = (e, esEdicion = false) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onloadend = () => {
        if (esEdicion) {
          setEditFactura(lector.result);
        } else {
          setFacturaImagen(lector.result);
        }
      };
      lector.readAsDataURL(archivo);
    }
  };

  // --- MANEJADORES DE RUBRO ---
  const handleRubroChange = (e) => {
    const valor = e.target.value;
    if (valor === 'nuevo') {
      setMostrarModalRubro(true);
      return;
    }
    setRubroSeleccionado(valor);
    setTipoSeleccionado('');
  };

  const guardarNuevoRubro = () => {
    if (!nuevoRubroCod || !nuevoRubroNombre) {
      alert('Por favor, ingresa el código y el nombre del rubro.');
      return;
    }
    const nuevoRubro = { id: parseInt(nuevoRubroCod), nombre: nuevoRubroNombre.toUpperCase() };
    setRubros([...rubros, nuevoRubro].sort((a, b) => a.id - b.id)); 
    setRubroSeleccionado(nuevoRubro.id.toString());
    setNuevoRubroCod('');
    setNuevoRubroNombre('');
    setMostrarModalRubro(false);
  };

  const eliminarRubro = () => {
    if (!rubroSeleccionado) {
      alert("Por favor, selecciona el rubro que deseas eliminar.");
      return;
    }
    const rubroAELiminar = rubros.find(r => r.id.toString() === rubroSeleccionado);
    if (window.confirm(`¿Estás seguro de eliminar el rubro "${rubroAELiminar.id} - ${rubroAELiminar.nombre}"?`)) {
      setRubros(rubros.filter(r => r.id.toString() !== rubroSeleccionado));
      setRubroSeleccionado('');
      setTipoSeleccionado('');
    }
  };

  // --- MANEJADORES DE TIPO DE BIEN ---
  const handleTipoChange = (e) => {
    const valor = e.target.value;
    if (valor === 'nuevo') {
      setNuevoTipoNombre('');
      setMostrarModalTipo(true);
      return;
    }
    setTipoSeleccionado(valor);
  };

  const guardarNuevoTipo = () => {
    if (!nuevoTipoNombre.trim()) {
      alert('Por favor, ingresa el nombre del tipo de bien.');
      return;
    }
    const nuevoCod = `499-${String(tiposBien.length + 1).padStart(3, '0')}`;
    const nuevoItem = { cod: nuevoCod, nombre: nuevoTipoNombre.trim().toUpperCase() };
    setTiposBien([...tiposBien, nuevoItem]);
    setTipoSeleccionado(nuevoCod);
    setNuevoTipoNombre('');
    setMostrarModalTipo(false);
  };

  const guardarEdicionTipo = () => {
    if (!nombreEditadoTipo.trim()) {
      alert('Por favor, ingresa un nombre válido.');
      return;
    }
    const nombreMayus = nombreEditadoTipo.trim().toUpperCase();
    setTiposBien(tiposBien.map(t => t.cod === tipoSeleccionado ? { ...t, nombre: nombreMayus } : t));
    setMostrarModalEditarTipo(false);
  };

  const eliminarTipoBien = () => {
    if (!tipoSeleccionado) {
      alert("Por favor, selecciona un tipo de bien para eliminar.");
      return;
    }
    const tipoAELiminar = tiposBien.find(t => t.cod === tipoSeleccionado);
    if (window.confirm(`¿Estás seguro de eliminar el tipo de bien "${tipoAELiminar.cod} - ${tipoAELiminar.nombre}"?`)) {
      setTiposBien(tiposBien.filter(t => t.cod !== tipoSeleccionado));
      setTipoSeleccionado('');
    }
  };

  // --- MANEJADORES DE DEPARTAMENTO ---
  const handleDeptoChange = (e) => {
    const valor = e.target.value;
    if (valor === 'nuevo') {
      setNuevoDeptoNombre('');
      setMostrarModalDepto(true);
      return;
    }
    setDepartamentoSeleccionado(valor);
  };

  const guardarNuevoDepto = () => {
    if (!nuevoDeptoNombre.trim()) {
      alert('Por favor, ingresa el nombre del departamento.');
      return;
    }
    const nuevoCod = String(departamentos.length + 1).padStart(2, '0');
    const nuevoItem = { cod: nuevoCod, nombre: nuevoDeptoNombre.trim().toUpperCase() };
    setDepartamentos([...departamentos, nuevoItem]);
    setDepartamentoSeleccionado(nuevoItem.nombre);
    setNuevoDeptoNombre('');
    setMostrarModalDepto(false);
  };

  const guardarEdicionDepto = () => {
    if (!nombreEditadoDepto.trim()) {
      alert('Por favor, ingresa un nombre válido.');
      return;
    }
    const nombreMayus = nombreEditadoDepto.trim().toUpperCase();
    setDepartamentos(departamentos.map(d => d.nombre === departamentoSeleccionado ? { ...d, nombre: nombreMayus } : d));
    setDepartamentoSeleccionado(nombreMayus);
    setMostrarModalEditarDepto(false);
  };

  const eliminarDepartamento = () => {
    if (!departamentoSeleccionado) {
      alert("Por favor, selecciona un departamento para eliminar.");
      return;
    }
    const deptoAELiminar = departamentos.find(d => d.nombre === departamentoSeleccionado);
    if (window.confirm(`¿Estás seguro de eliminar el departamento "${deptoAELiminar ? deptoAELiminar.cod + ' - ' : ''}${departamentoSeleccionado}"?`)) {
      setDepartamentos(departamentos.filter(d => d.nombre !== departamentoSeleccionado));
      setDepartamentoSeleccionado('');
    }
  };

  // --- MANEJADORES DE RESPONSABLE ---
  const handleRespChange = (e) => {
    setResponsableSeleccionado(e.target.value);
  };

  const guardarEdicionResp = () => {
    if (!nombreEditadoResp.trim()) {
      alert('Por favor, ingresa un nombre válido.');
      return;
    }
    const nombreMayus = nombreEditadoResp.trim().toUpperCase();
    setResponsables(responsables.map(r => r.nombre === responsableSeleccionado ? { ...r, nombre: nombreMayus } : r));
    setResponsableSeleccionado(nombreMayus);
    setMostrarModalEditarResp(false);
  };

  // --- EDICIÓN DE BIEN ---
  const abrirModalEdicionBien = (bien) => {
    setBienAEditar(bien);
    setEditCod(bien.cod_bien || '');
    setEditDesc(bien.desc_bien || '');
    setEditDetalle(bien.desc_detallada || '');
    setEditRubro(bien.rubro?.id_rubro?.toString() || '');
    setEditTipo(bien.tipo?.id_tipo && bien.tipo?.id_tipo !== 'General' ? bien.tipo.id_tipo : '');
    setEditDepto(bien.departamento?.nombre_departamento || '');
    setEditResp(bien.responsable?.nombre_responsable || '');
    
    // Obtener el valor utilizando 'valor' o respaldando con 'valor_moneda'
    const valActual = bien.valor !== undefined && bien.valor !== null ? bien.valor : (bien.valor_moneda !== undefined && bien.valor_moneda !== null ? bien.valor_moneda : '');
    setEditValor(valActual !== '' ? valActual.toString() : '');
    
    let fechaLocalStr = obtenerFechaHoraActual();
    if (bien.fecha_alta) {
      try {
        const fechaObj = new Date(bien.fecha_alta);
        fechaObj.setMinutes(fechaObj.getMinutes() - fechaObj.getTimezoneOffset());
        fechaLocalStr = fechaObj.toISOString().slice(0, 16);
      } catch (err) {
        console.error(err);
      }
    }
    setEditFechaAlta(fechaLocalStr);
    setEditFactura(bien.factura || '');
    setEditEstado(bien.estado || 'Alta');
  };

  const guardarCambiosBienEditado = (e) => {
    e.preventDefault();
    if (!editCod || !editDesc || !editRubro || editValor === '') {
      alert("Por favor, completa los campos obligatorios (incluyendo el valor).");
      return;
    }

    const objetoRubro = rubros.find(r => r.id.toString() === editRubro);
    let objetoTipo = { id_tipo: 'General', nombre_tipo: 'General' };
    if (editRubro === "499" && editTipo) {
      const encontrado = tiposBien.find(t => t.cod === editTipo);
      if (encontrado) objetoTipo = { id_tipo: encontrado.cod, nombre_tipo: encontrado.nombre };
    }

    setBienes(bienes.map(b => {
      if (b.id_bien === bienAEditar.id_bien) {
        return {
          ...b,
          cod_bien: editCod,
          desc_bien: editDesc,
          desc_detallada: editDetalle,
          rubro: { id_rubro: objetoRubro.id, nombre_rubro: objetoRubro.nombre },
          tipo: objetoTipo,
          departamento: { nombre_departamento: editDepto || 'Sin asignar' },
          responsable: { nombre_responsable: editResp || 'Sin asignar' },
          valor: parseFloat(editValor),
          factura: editFactura,
          estado: editEstado,
          fecha_alta: editFechaAlta ? new Date(editFechaAlta).toISOString() : b.fecha_alta
        };
      }
      return b;
    }));

    setBienAEditar(null);
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
    if (!codigoBienActual || !descBien || !valorMoneda || !rubroSeleccionado) {
      alert("Por favor, completá los campos obligatorios y seleccione Rubro.");
      return;
    }

    const cantidadItems = parseInt(cantidadLote) || 1;
    if (cantidadItems < 1) {
      alert("La cantidad debe ser al menos 1.");
      return;
    }

    const objetoRubro = rubros.find(r => r.id === parseInt(rubroSeleccionado));
    let objetoTipo = { id_tipo: 'General', nombre_tipo: 'General' };
    if (rubroSeleccionado === "499" && tipoSeleccionado) {
      const encontrado = tiposBien.find(t => t.cod === tipoSeleccionado);
      if (encontrado) objetoTipo = { id_tipo: encontrado.cod, nombre_tipo: encontrado.nombre };
    }

    let nuevosBienesTemp = [...bienes];
    const fechaGeneracion = new Date(fechaAltaForm).toISOString();

    for (let i = 0; i < cantidadItems; i++) {
      const parteRubro = rubroSeleccionado.toString();
      let parteTipo = "000";
      if (rubroSeleccionado.toString() === "499" && tipoSeleccionado) {
        parteTipo = tipoSeleccionado.replace('499-', '').padStart(3, '0');
      }

      const cantidadExistente = nuevosBienesTemp.filter(b => {
        return b.rubro?.id_rubro?.toString() === rubroSeleccionado.toString();
      }).length + 1;

      const parteCantidad = String(cantidadExistente).padStart(5, '0');
      const codigoGeneradoLote = `${parteRubro}${parteTipo}${parteCantidad}`;

      const nuevoBienItem = {
        id_bien: nuevosBienesTemp.length + 1,
        cod_bien: codigoGeneradoLote,
        desc_bien: descBien,
        desc_detallada: descDetallada,
        rubro: { id_rubro: objetoRubro.id, nombre_rubro: objetoRubro.nombre },
        tipo: objetoTipo,
        departamento: { nombre_departamento: departamentoSeleccionado || 'Sin asignar' },
        responsable: { nombre_responsable: responsableSeleccionado || 'Sin asignar' },
        ubicacion: { nombre_ubicacion: 'Oficina Central' },
        fecha_alta: fechaGeneracion,
        moneda: 'ARS',
        valor: parseFloat(valorMoneda),
        factura: facturaImagen,
        estado: 'Alta'
      };

      nuevosBienesTemp.push(nuevoBienItem);
    }

    setBienes(nuevosBienesTemp);
    setDescBien(''); setDescDetallada(''); setRubroSeleccionado(''); setTipoSeleccionado(''); setDepartamentoSeleccionado(''); setResponsableSeleccionado(''); setValorMoneda(''); setCantidadLote('1'); setFacturaImagen(''); setFechaAltaForm(obtenerFechaHoraActual());
  };

  const exportarAExcel = () => {
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
      'Valor': b.valor || 0,
      'Tiene Factura': b.factura ? 'Sí' : 'No',
      'Estado Actual': b.estado,
      'Última Modificación': formatearFechaMostrar(b.fecha_alta)
    }));

    const hoja = XLSX.utils.json_to_sheet(datosExcel);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Inventario Bienes');
    XLSX.writeFile(libro, `Inventario_Patrimonial_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  const exportarAPDF = () => {
 
    const elegidos = bienes.filter((b) => seleccionados.includes(b.id_bien));
    if (elegidos.length === 0) {
      alert('Seleccioná al menos un bien para exportar.');
      return;
    }
    generarPDFAnexo(elegidos);

    const doc = new jsPDF('landscape');
    doc.setFontSize(16);
    doc.text('IOSEP - INVENTARIO GENERAL DE BIENES PATRIMONIALES', 14, 15);
    doc.setFontSize(10);
    doc.text(`Fecha de Reporte: ${new Date().toLocaleString('es-AR')}`, 14, 22);

    const columnas = ['Código', 'Descripción', 'Rubro', 'Departamento', 'Responsable', 'Valor', 'Estado', 'Último Cambio'];
    const filas = bienes.map(b => [
      b.cod_bien,
      b.desc_bien + (b.tipo && b.tipo.nombre_tipo !== 'General' ? ` (Tipo: ${b.tipo.nombre_tipo})` : ''),
      b.rubro ? `${b.rubro.id_rubro}` : 'N/A',
      b.departamento?.nombre_departamento || 'Sin asignar',
      b.responsable?.nombre_responsable || 'Sin asignar',
      `${b.moneda} ${b.valor ? b.valor.toLocaleString() : '0'}`,
      b.estado,
      formatearFechaMostrar(b.fecha_alta)
    ]);

    doc.autoTable({
      head: [columnas],
      body: filas,
      startY: 28,
      theme: 'grid',
      headStyles: { fillColor: [60, 81, 119], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 8, cellPadding: 3 },
      columnStyles: { 1: { cellWidth: 50 } }
    });

    doc.save(`Inventario_Patrimonial_${new Date().toISOString().slice(0,10)}.pdf`);

  };

  return (
    <div className={styles.contenedor}>
      
      {/* --- FORMULARIO DE ALTA --- */}
      <div className={styles.tarjetaFormulario}>
        <h3>Registrar Nuevo Bien Patrimonial</h3>
        <form onSubmit={handleGuardar} className={styles.gridForm}>
          
          <div className={styles.grupoInput}>
            <label>Código del Bien :</label>
            <input 
              type="text" 
              value={codigoBienActual} 
              readOnly 
              className={styles.inputControl} 
              style={{ backgroundColor: '#e9ecef', fontWeight: 'bold', color: '#3c5177', cursor: 'not-allowed' }} 
              placeholder="Seleccione Rubro y Tipo..." 
            />
          </div>

          <div className={styles.grupoInput}>
            <label>Descripción :</label>
            <input type="text" value={descBien} onChange={(e) => setDescBien(e.target.value)} className={styles.inputControl} placeholder="Ej: Monitor Samsung 24" />
          </div>
          <div className={`${styles.grupoInput} ${styles.campoFull}`}>
            <label>Descripción Detallada:</label>
            <textarea value={descDetallada} onChange={(e) => setDescDetallada(e.target.value)} className={styles.inputControl} style={{ height: '60px', resize: 'vertical' }} placeholder="Especificaciones técnicas..." />
          </div>

          {/* RUBRO */}
          <div className={styles.grupoInput}>
            <label>Rubro:</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select 
                value={rubroSeleccionado} 
                onChange={handleRubroChange} 
                className={styles.inputControl} 
                style={{ cursor: 'pointer', flex: 1 }}
              >
                <option value="">-- Seleccione un Rubro --</option>
                <option value="nuevo" style={{ fontWeight: 'bold', color: '#0056b3' }}>
                  + Agregar nuevo rubro...
                </option>
                {rubros.map((rubro) => (
                  <option key={rubro.id} value={rubro.id}>
                    {rubro.id} - {rubro.nombre}
                  </option>
                ))}
              </select>

              <button 
                type="button" 
                onClick={eliminarRubro}
                disabled={!rubroSeleccionado || rubroSeleccionado === 'nuevo'}
                style={{
                  padding: '0 12px',
                  backgroundColor: (!rubroSeleccionado || rubroSeleccionado === 'nuevo') ? '#e2e8f0' : '#A32424',
                  color: (!rubroSeleccionado || rubroSeleccionado === 'nuevo') ? '#a0aec0' : 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: (!rubroSeleccionado || rubroSeleccionado === 'nuevo') ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Eliminar rubro seleccionado"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* TIPO DE BIEN */}
          <div className={styles.grupoInput}>
            <label>Tipo de Bien:</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select 
                value={tipoSeleccionado} 
                onChange={handleTipoChange} 
                className={styles.inputControl} 
                disabled={rubroSeleccionado !== "499"} 
                style={{ cursor: rubroSeleccionado === "499" ? 'pointer' : 'not-allowed', flex: 1 }}
              >
                {rubroSeleccionado !== "499" ? (
                  <option value="">Habilitado solo para Rubro 499</option>
                ) : (
                  <>
                    <option value="">-- Seleccione Tipo --</option>
                    <option value="nuevo" style={{ fontWeight: 'bold', color: '#0056b3' }}>+ Nuevo Tipo de Bien...</option>
                    {tiposBien.map((tipo) => (
                      <option key={tipo.cod} value={tipo.cod}>{tipo.cod} - {tipo.nombre}</option>
                    ))}
                  </>
                )}
              </select>

              <button 
                type="button" 
                onClick={() => {
                  const actual = tiposBien.find(t => t.cod === tipoSeleccionado);
                  if (actual) {
                    setNombreEditadoTipo(actual.nombre);
                    setMostrarModalEditarTipo(true);
                  } else {
                    alert("Seleccione un tipo de bien para editar.");
                  }
                }}
                disabled={rubroSeleccionado !== "499" || !tipoSeleccionado}
                style={{
                  padding: '0 12px',
                  backgroundColor: (rubroSeleccionado !== "499" || !tipoSeleccionado) ? '#e2e8f0' : '#D68910',
                  color: (rubroSeleccionado !== "499" || !tipoSeleccionado) ? '#a0aec0' : 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: (rubroSeleccionado !== "499" || !tipoSeleccionado) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Editar tipo de bien seleccionado"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>

              <button 
                type="button" 
                onClick={eliminarTipoBien}
                disabled={rubroSeleccionado !== "499" || !tipoSeleccionado}
                style={{
                  padding: '0 12px',
                  backgroundColor: (rubroSeleccionado !== "499" || !tipoSeleccionado) ? '#e2e8f0' : '#A32424',
                  color: (rubroSeleccionado !== "499" || !tipoSeleccionado) ? '#a0aec0' : 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: (rubroSeleccionado !== "499" || !tipoSeleccionado) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Eliminar tipo de bien seleccionado"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* DEPARTAMENTO */}
          <div className={styles.grupoInput}>
            <label>Departamento:</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select 
                value={departamentoSeleccionado} 
                onChange={handleDeptoChange} 
                className={styles.inputControl} 
                style={{ cursor: 'pointer', flex: 1 }}
              >
                <option value="">-- Seleccione Departamento --</option>
                <option value="nuevo" style={{ fontWeight: 'bold', color: '#0056b3' }}>+ Nuevo Departamento...</option>
                {departamentos.map((depto) => (
                  <option key={depto.cod} value={depto.nombre}>{depto.cod} - {depto.nombre}</option>
                ))}
              </select>

              <button 
                type="button" 
                onClick={() => {
                  const actual = departamentos.find(d => d.nombre === departamentoSeleccionado);
                  if (actual) {
                    setNombreEditadoDepto(actual.nombre);
                    setMostrarModalEditarDepto(true);
                  } else {
                    alert("Seleccione un departamento para editar.");
                  }
                }}
                disabled={!departamentoSeleccionado}
                style={{
                  padding: '0 12px',
                  backgroundColor: !departamentoSeleccionado ? '#e2e8f0' : '#D68910',
                  color: !departamentoSeleccionado ? '#a0aec0' : 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: !departamentoSeleccionado ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Editar departamento seleccionado"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>

              <button 
                type="button" 
                onClick={eliminarDepartamento}
                disabled={!departamentoSeleccionado}
                style={{
                  padding: '0 12px',
                  backgroundColor: !departamentoSeleccionado ? '#e2e8f0' : '#A32424',
                  color: !departamentoSeleccionado ? '#a0aec0' : 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: !departamentoSeleccionado ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Eliminar departamento seleccionado"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* RESPONSABLE */}
          <div className={styles.grupoInput}>
            <label>Responsable:</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select 
                value={responsableSeleccionado} 
                onChange={handleRespChange} 
                className={styles.inputControl} 
                style={{ cursor: 'pointer', flex: 1 }}
              >
                <option value="">-- Seleccione Responsable --</option>
                {responsables.map((resp) => (
                  <option key={resp.cod} value={resp.nombre}>{resp.cod} - {resp.nombre}</option>
                ))}
              </select>

              <button 
                type="button" 
                onClick={() => {
                  const actual = responsables.find(r => r.nombre === responsableSeleccionado);
                  if (actual) {
                    setNombreEditadoResp(actual.nombre);
                    setMostrarModalEditarResp(true);
                  } else {
                    alert("Seleccione un responsable para editar.");
                  }
                }}
                disabled={!responsableSeleccionado}
                style={{
                  padding: '0 12px',
                  backgroundColor: !responsableSeleccionado ? '#e2e8f0' : '#D68910',
                  color: !responsableSeleccionado ? '#a0aec0' : 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: !responsableSeleccionado ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Editar responsable seleccionado"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.grupoInput}>
            <label>Fecha de Alta:</label>
            <input type="datetime-local" value={fechaAltaForm} onChange={(e) => setFechaAltaForm(e.target.value)} className={styles.inputControl} />
          </div>

          <div className={styles.grupoInput}>
            <label>Valor Unitario (ARS):</label>
            <input type="number" value={valorMoneda} onChange={(e) => setValorMoneda(e.target.value)} className={styles.inputControl} placeholder="Ej: 450000" />
          </div>

          <div className={styles.grupoInput}>
            <label>Cantidad de Bienes :</label>
            <input 
              type="number" 
              min="1" 
              value={cantidadLote} 
              onChange={(e) => setCantidadLote(e.target.value)} 
              className={styles.inputControl} 
              placeholder="Ej: 100" 
            />
          </div>

          <div className={styles.grupoInput}>
            <label>Facturación :</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleImagenFacturaChange(e, false)} 
                className={styles.inputControl}
                style={{ padding: '6px', cursor: 'pointer', fontSize: '0.85rem' }} 
              />
              {facturaImagen && (
                <a href={facturaImagen} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: '#1F7246', fontWeight: 'bold', textDecoration: 'underline', whiteSpace: 'nowrap' }}>
                  Ver Imagen
                </a>
              )}
            </div>
          </div>

          <div className={styles.campoFull} style={{ marginTop: '10px' }}>
            <button 
              type="submit" 
              className={styles.btnGuardar}
              style={{ transition: 'background-color 0.2s', cursor: 'pointer' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#155231'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1F7246'}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>

      {/* --- BUSCADOR --- */}
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f3f6', border: '1px solid #ccc', borderRadius: '8px', padding: '8px 12px', marginTop: '30px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <input
          type="text"
          placeholder="Buscar bienes..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent', fontSize: '1rem', color: '#333' }}
        />
      </div>

      {/* --- TARJETA DE RESUMEN Y CONTADORES DE FILTRADO --- */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '180px', backgroundColor: '#3c5177', color: 'white', padding: '12px 18px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.9 }}>Total Filtrados</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '4px' }}>{totalBienesFiltrados}</span>
        </div>
        <div style={{ flex: 1, minWidth: '180px', backgroundColor: '#22543D', color: '#C6F6D5', padding: '12px 18px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.9 }}>Bienes de Alta</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '4px' }}>{totalAltasFiltradas}</span>
        </div>
        <div style={{ flex: 1, minWidth: '180px', backgroundColor: '#742A2A', color: '#FED7D7', padding: '12px 18px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.9 }}>Bienes de Baja</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '4px' }}>{totalBajasFiltradas}</span>
        </div>
      </div>

      {/* --- ENCABEZADO DE TABLA Y BOTONERA DE EXPORTACIÓN --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <h2 className={styles.tituloTabla} style={{ margin: 0 }}>Listado de Bienes Patrimoniales</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={exportarAExcel} 
            style={{ padding: '8px 16px', backgroundColor: '#1F7246', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'background-color 0.2s' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#155231'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#1F7246'}
          >
            Exportar Excel
          </button>
          <button 
<<<<<<< Updated upstream
            onClick={exportarAPDF}
            disabled={seleccionados.length === 0}
            style={{ padding: '8px 16px', backgroundColor: '#A32424', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: seleccionados.length === 0 ? 'not-allowed' : 'pointer', opacity: seleccionados.length === 0 ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
             Exportar PDF ({seleccionados.length})
=======
            onClick={exportarAPDF} 
            style={{ padding: '8px 16px', backgroundColor: '#A32424', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'background-color 0.2s' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#821B1B'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#A32424'}
          >
            Exportar PDF
>>>>>>> Stashed changes
          </button>
        </div>
      </div>

<<<<<<< Updated upstream
      {/* --- TABLA DE BIENES --- */}
      <table className={styles.tablaBienes} style={{ marginTop: '15px' }}>
        <thead>
          <tr>
            <th style={{ width: '40px', textAlign: 'center' }}>
              <input
                type="checkbox"
                checked={todosVisiblesSeleccionados}
                onChange={toggleTodosVisibles}
                title="Seleccionar / quitar todos los bienes visibles"
              />
            </th>
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
        {bienesFiltrados.map((bien) => (
            <tr key={bien.id_bien}>
              <td style={{ textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={seleccionados.includes(bien.id_bien)}
                  onChange={() => toggleSeleccion(bien.id_bien)}
                />
              </td>
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
                   Etiquetas
                </button>
              </td>
=======
      {/* --- TABLA DE BIENES PROFESIONAL CON TODOS LOS CAMPOS VISIBLES --- */}
      <div style={{ overflowX: 'auto', marginTop: '15px' }}>
        <table className={styles.tablaBienes} style={{ width: '100%', minWidth: '1200px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px 10px', textAlign: 'left' }}>Código</th>
              <th style={{ padding: '12px 10px', textAlign: 'left' }}>Descripción / Detalle</th>
              <th style={{ padding: '12px 10px', textAlign: 'left' }}>Rubro</th>
              <th style={{ padding: '12px 10px', textAlign: 'left' }}>Tipo de Bien</th>
              <th style={{ padding: '12px 10px', textAlign: 'left' }}>Departamento</th>
              <th style={{ padding: '12px 10px', textAlign: 'left' }}>Responsable</th>
              <th style={{ padding: '12px 10px', textAlign: 'right' }}>Valor (ARS)</th>
              <th style={{ padding: '12px 10px', textAlign: 'center' }}>Factura</th>
              <th style={{ padding: '12px 10px', textAlign: 'center' }}>Fecha de Alta</th>
              <th style={{ padding: '12px 10px', textAlign: 'center' }}>Estado</th>
              <th style={{ padding: '12px 10px', textAlign: 'center' }}>Acciones</th>
>>>>>>> Stashed changes
            </tr>
          </thead>
          <tbody>
            {bienesFiltrados.map((bien) => (
              <tr key={bien.id_bien} style={{ borderBottom: '1px solid #e2e8f0', transition: 'background-color 0.2s' }}>
                <td style={{ padding: '12px 10px', verticalAlign: 'middle' }}>
                  <span className={styles.codigoDestacado} style={{ fontWeight: 'bold', color: '#3C5177', whiteSpace: 'nowrap' }}>
                    {bien.cod_bien}
                  </span>
                </td>
                <td style={{ padding: '12px 10px', verticalAlign: 'middle' }}>
                  <div style={{ fontWeight: '600', color: '#2d3748' }}>{bien.desc_bien}</div>
                  {bien.desc_detallada && (
                    <div style={{ fontSize: '0.82rem', color: '#718096', marginTop: '2px' }}>
                      {bien.desc_detallada}
                    </div>
                  )}
                </td>
                <td style={{ padding: '12px 10px', verticalAlign: 'middle' }}>
                  {bien.rubro ? (
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#2b6cb0' }}>{bien.rubro.id_rubro}</span>
                      <div style={{ fontSize: '0.78rem', color: '#4a5568' }}>{bien.rubro.nombre_rubro}</div>
                    </div>
                  ) : (
                    <span style={{ color: '#a0aec0' }}>Sin rubro</span>
                  )}
                </td>
                <td style={{ padding: '12px 10px', verticalAlign: 'middle' }}>
                  {bien.tipo && bien.tipo.nombre_tipo !== 'General' ? (
                    <div>
                      <span style={{ fontWeight: '600', color: '#2b6cb0', fontSize: '0.85rem' }}>{bien.tipo.id_tipo}</span>
                      <div style={{ fontSize: '0.78rem', color: '#4a5568' }}>{bien.tipo.nombre_tipo}</div>
                    </div>
                  ) : (
                    <span style={{ color: '#a0aec0', fontSize: '0.85rem' }}>General</span>
                  )}
                </td>
                <td style={{ padding: '12px 10px', verticalAlign: 'middle', fontSize: '0.9rem', color: '#2d3748' }}>
                  {bien.departamento?.nombre_departamento || 'Sin asignar'}
                </td>
                <td style={{ padding: '12px 10px', verticalAlign: 'middle', fontSize: '0.9rem', color: '#2d3748' }}>
                  {bien.responsable?.nombre_responsable || 'Sin asignar'}
                </td>
                <td style={{ padding: '12px 10px', verticalAlign: 'middle', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <strong style={{ color: '#1a202c' }}>
                    {bien.moneda || 'ARS'} {bien.valor !== undefined && bien.valor !== null ? bien.valor.toLocaleString('es-AR') : '0'}
                  </strong>
                </td>
                <td style={{ padding: '12px 10px', verticalAlign: 'middle', textAlign: 'center' }}>
                  {bien.factura ? (
                    <a 
                      href={bien.factura} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        fontSize: '0.8rem', 
                        backgroundColor: '#e6fffa', 
                        color: '#234e52', 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontWeight: 'bold', 
                        textDecoration: 'none', 
                        border: '1px solid #b2f5ea',
                        display: 'inline-block' 
                      }}
                      title="Ver Factura adjunta"
                    >
                      📄 Ver
                    </a>
                  ) : (
                    <span style={{ color: '#a0aec0', fontSize: '0.85rem' }}>Sin factura</span>
                  )}
                </td>
                <td style={{ padding: '12px 10px', verticalAlign: 'middle', textAlign: 'center', fontSize: '0.82rem', color: '#4a5568', whiteSpace: 'nowrap' }}>
                  {formatearFechaMostrar(bien.fecha_alta)}
                </td>
                <td style={{ padding: '12px 10px', verticalAlign: 'middle', textAlign: 'center' }}>
                  <button 
                    onClick={() => toggleEstado(bien.id_bien)} 
                    style={{ 
                      padding: '5px 12px', 
                      borderRadius: '20px', 
                      border: 'none', 
                      fontWeight: 'bold', 
                      fontSize: '0.8rem', 
                      cursor: 'pointer', 
                      backgroundColor: bien.estado === 'Alta' ? '#C6F6D5' : '#FED7D7', 
                      color: bien.estado === 'Alta' ? '#22543D' : '#742A2A',
                      transition: 'all 0.2s'
                    }}
                    title="Clic para cambiar estado"
                  >
                    {bien.estado}
                  </button>
                </td>
                <td style={{ padding: '12px 10px', verticalAlign: 'middle', textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                    <button 
                      onClick={() => abrirModalEdicionBien(bien)} 
                      style={{ padding: '6px 10px', backgroundColor: '#D68910', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#B7750D'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#D68910'}
                      title="Editar bien"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button 
                      onClick={() => setBienParaImprimir(bien)} 
                      style={{ padding: '6px 10px', backgroundColor: '#3C5177', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', transition: 'background-color 0.2s' }} 
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#2C3E5D'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#3C5177'}
                      title="Generar Etiquetas"
                    >
                      Etiquetas
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL FLOTANTE PARA EDITAR BIEN --- */}
      {bienAEditar && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1050 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', maxWidth: '500px', width: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0, borderBottom: '2px solid #3C5177', paddingBottom: '8px', color: '#3C5177' }}>Editar Bien Patrimonial</h3>
            <form onSubmit={guardarCambiosBienEditado}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>Código del Bien (*):</label>
                <input type="text" value={editCod} onChange={(e) => setEditCod(e.target.value)} className={styles.inputControl} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>Descripción Corta (*):</label>
                <input type="text" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} className={styles.inputControl} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>Descripción Detallada:</label>
                <textarea value={editDetalle} onChange={(e) => setEditDetalle(e.target.value)} className={styles.inputControl} style={{ height: '50px', resize: 'vertical' }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>Rubro (*):</label>
                <select value={editRubro} onChange={(e) => setEditRubro(e.target.value)} className={styles.inputControl}>
                  <option value="">-- Seleccione Rubro --</option>
                  {rubros.map(r => <option key={r.id} value={r.id}>{r.id} - {r.nombre}</option>)}
                </select>
              </div>
              {editRubro === "499" && (
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>Tipo de Bien:</label>
                  <select value={editTipo} onChange={(e) => setEditTipo(e.target.value)} className={styles.inputControl}>
                    <option value="">-- Seleccione Tipo --</option>
                    {tiposBien.map(t => <option key={t.cod} value={t.cod}>{t.cod} - {t.nombre}</option>)}
                  </select>
                </div>
              )}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>Departamento:</label>
                <select value={editDepto} onChange={(e) => setEditDepto(e.target.value)} className={styles.inputControl}>
                  <option value="">-- Seleccione Departamento --</option>
                  {departamentos.map(d => <option key={d.cod} value={d.nombre}>{d.cod} - {d.nombre}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>Responsable:</label>
                <select value={editResp} onChange={(e) => setEditResp(e.target.value)} className={styles.inputControl}>
                  <option value="">-- Seleccione Responsable --</option>
                  {responsables.map(r => <option key={r.cod} value={r.nombre}>{r.cod} - {r.nombre}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>Valor (ARS) (*):</label>
                <input type="number" value={editValor} onChange={(e) => setEditValor(e.target.value)} className={styles.inputControl} placeholder="Ej: 450000" />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>Fecha de Alta:</label>
                <input type="datetime-local" value={editFechaAlta} onChange={(e) => setEditFechaAlta(e.target.value)} className={styles.inputControl} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>Estado:</label>
                <select value={editEstado} onChange={(e) => setEditEstado(e.target.value)} className={styles.inputControl}>
                  <option value="Alta">Alta</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>Facturación (Imagen de Factura):</label>
                <input type="file" accept="image/*" onChange={(e) => handleImagenFacturaChange(e, true)} className={styles.inputControl} style={{ padding: '6px', fontSize: '0.85rem' }} />
                {editFactura && (
                  <div style={{ marginTop: '6px' }}>
                    <a href={editFactura} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: '#1F7246', fontWeight: 'bold', textDecoration: 'underline' }}>
                      Ver Factura Actual
                    </a>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setBienAEditar(null)} 
                  style={{ padding: '8px 16px', backgroundColor: '#e2e8f0', color: '#333', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#cbd5e1'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#e2e8f0'}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '8px 16px', backgroundColor: '#1F7246', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#155231'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#1F7246'}
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL FLOTANTE PARA NUEVO RUBRO --- */}
      {mostrarModalRubro && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1050 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', maxWidth: '400px', width: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            <h3 style={{ marginTop: 0, borderBottom: '2px solid #3C5177', paddingBottom: '8px', color: '#3C5177' }}>Agregar Nuevo Rubro</h3>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Código del Rubro:</label>
              <input type="number" value={nuevoRubroCod} onChange={(e) => setNuevoRubroCod(e.target.value)} className={styles.inputControl} placeholder="Ej: 500" />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre del Rubro:</label>
              <input type="text" value={nuevoRubroNombre} onChange={(e) => setNuevoRubroNombre(e.target.value)} className={styles.inputControl} placeholder="Ej: MOBILIARIO NUEVO" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                type="button" 
                onClick={() => setMostrarModalRubro(false)} 
                style={{ padding: '8px 16px', backgroundColor: '#e2e8f0', color: '#333', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#cbd5e1'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e2e8f0'}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                onClick={guardarNuevoRubro} 
                style={{ padding: '8px 16px', backgroundColor: '#1F7246', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#155231'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#1F7246'}
              >
                Guardar Rubro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL FLOTANTE PARA NUEVO TIPO DE BIEN --- */}
      {mostrarModalTipo && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1050 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', maxWidth: '400px', width: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            <h3 style={{ marginTop: 0, borderBottom: '2px solid #3C5177', paddingBottom: '8px', color: '#3C5177' }}>Agregar Nuevo Tipo de Bien</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre del Tipo de Bien:</label>
              <input type="text" value={nuevoTipoNombre} onChange={(e) => setNuevoTipoNombre(e.target.value)} className={styles.inputControl} placeholder="Ej: ESCANER LASER" autoFocus />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                type="button" 
                onClick={() => setMostrarModalTipo(false)} 
                style={{ padding: '8px 16px', backgroundColor: '#e2e8f0', color: '#333', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#cbd5e1'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e2e8f0'}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                onClick={guardarNuevoTipo} 
                style={{ padding: '8px 16px', backgroundColor: '#1F7246', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#155231'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#1F7246'}
              >
                Guardar Tipo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL FLOTANTE PARA EDITAR TIPO DE BIEN --- */}
      {mostrarModalEditarTipo && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1050 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', maxWidth: '400px', width: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            <h3 style={{ marginTop: 0, borderBottom: '2px solid #3C5177', paddingBottom: '8px', color: '#3C5177' }}>Editar Tipo de Bien</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre del Tipo de Bien:</label>
              <input type="text" value={nombreEditadoTipo} onChange={(e) => setNombreEditadoTipo(e.target.value)} className={styles.inputControl} autoFocus />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                type="button" 
                onClick={() => setMostrarModalEditarTipo(false)} 
                style={{ padding: '8px 16px', backgroundColor: '#e2e8f0', color: '#333', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#cbd5e1'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e2e8f0'}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                onClick={guardarEdicionTipo} 
                style={{ padding: '8px 16px', backgroundColor: '#3C5177', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2C3E5D'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3C5177'}
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL FLOTANTE PARA NUEVO DEPARTAMENTO --- */}
      {mostrarModalDepto && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1050 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', maxWidth: '400px', width: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            <h3 style={{ marginTop: 0, borderBottom: '2px solid #3C5177', paddingBottom: '8px', color: '#3C5177' }}>Agregar Nuevo Departamento</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre del Departamento:</label>
              <input type="text" value={nuevoDeptoNombre} onChange={(e) => setNuevoDeptoNombre(e.target.value)} className={styles.inputControl} placeholder="Ej: LOGISTICA" autoFocus />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                type="button" 
                onClick={() => setMostrarModalDepto(false)} 
                style={{ padding: '8px 16px', backgroundColor: '#e2e8f0', color: '#333', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#cbd5e1'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e2e8f0'}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                onClick={guardarNuevoDepto} 
                style={{ padding: '8px 16px', backgroundColor: '#1F7246', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#155231'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#1F7246'}
              >
                Guardar Departamento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL FLOTANTE PARA EDITAR DEPARTAMENTO --- */}
      {mostrarModalEditarDepto && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1050 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', maxWidth: '400px', width: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            <h3 style={{ marginTop: 0, borderBottom: '2px solid #3C5177', paddingBottom: '8px', color: '#3C5177' }}>Editar Departamento</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre del Departamento:</label>
              <input type="text" value={nombreEditadoDepto} onChange={(e) => setNombreEditadoDepto(e.target.value)} className={styles.inputControl} autoFocus />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                type="button" 
                onClick={() => setMostrarModalEditarDepto(false)} 
                style={{ padding: '8px 16px', backgroundColor: '#e2e8f0', color: '#333', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#cbd5e1'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e2e8f0'}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                onClick={guardarEdicionDepto} 
                style={{ padding: '8px 16px', backgroundColor: '#3C5177', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2C3E5D'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3C5177'}
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL FLOTANTE PARA EDITAR RESPONSABLE --- */}
      {mostrarModalEditarResp && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1050 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', maxWidth: '400px', width: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            <h3 style={{ marginTop: 0, borderBottom: '2px solid #3C5177', paddingBottom: '8px', color: '#3C5177' }}>Editar Responsable</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre del Responsable:</label>
              <input type="text" value={nombreEditadoResp} onChange={(e) => setNombreEditadoResp(e.target.value)} className={styles.inputControl} autoFocus />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                type="button" 
                onClick={() => setMostrarModalEditarResp(false)} 
                style={{ padding: '8px 16px', backgroundColor: '#e2e8f0', color: '#333', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#cbd5e1'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e2e8f0'}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                onClick={guardarEdicionResp} 
                style={{ padding: '8px 16px', backgroundColor: '#3C5177', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2C3E5D'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3C5177'}
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}

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
              <p style={{ margin: '0 0 5px 0', fontSize: '0.95rem', fontWeight: 'bold' }}>{bienParaImprimir.desc_bien}</p>
              <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: '#4a5568', fontWeight: '600' }}>Depto: {bienParaImprimir.departamento?.nombre_departamento || 'Sin asignar'}</p>
              {incluirBarras && <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}><Barcode value={bienParaImprimir.cod_bien} width={1.5} height={42} fontSize={13} /></div>}
              {incluirQR && <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', padding: '8px', width: 'fit-content', margin: '0 auto', border: '1px solid #ddd' }}><QRCode value={`Patrimonio IOSEP\nCódigo: ${bienParaImprimir.cod_bien}\nBien: ${bienParaImprimir.desc_bien}\nDepto: ${bienParaImprimir.departamento?.nombre_departamento}`} size={90} /></div>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
              <button 
                onClick={() => { setBienParaImprimir(null); setIncluirBarras(true); setIncluirQR(true); }} 
                style={{ padding: '8px 16px', backgroundColor: '#e2e8f0', color: '#333', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#cbd5e1'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e2e8f0'}
              >
                Cerrar
              </button>
              <button 
                onClick={lanzarImpresion} 
                disabled={!incluirBarras && !incluirQR} 
                style={{ padding: '8px 16px', backgroundColor: '#5A83B3', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', opacity: (!incluirBarras && !incluirQR) ? 0.5 : 1, transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => { if (incluirBarras || incluirQR) e.target.style.backgroundColor = '#4A6F9D'; }}
                onMouseLeave={(e) => { if (incluirBarras || incluirQR) e.target.style.backgroundColor = '#5A83B3'; }}
              >
                Imprimir
              </button>
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