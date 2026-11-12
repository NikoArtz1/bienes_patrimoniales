import { jsPDF } from 'jspdf';

// ============================================================
// ANEXO "BIENES ADQUIRIDOS: AÑO XXXX"
// Formato imitando el listado impreso de la auditoría:
// A4 vertical, tipografía monoespaciada (Courier), agrupado por
// Departamento > Ubicación > Rubro > Tipo, con el detalle de
// cada bien en una línea aparte debajo.
// ============================================================

// ---- Ajustes de diseño (en mm / pt). Tocar acá para afinar el formato ----
const PAGINA = { ancho: 210, alto: 297, margenInferior: 14 };
const FUENTE = 'courier';
const TAM = { titulo: 11, anio: 14, columnas: 9, grupo: 9, item: 9, detalle: 8.5 };
const ALTO = { grupo: 5.5, item: 4.4, detalle: 3.8, separacionBloque: 2.5 };

// Posiciones horizontales (mm desde el borde izquierdo)
const X = {
  marco: 10,
  depCod: 12, depNom: 26,
  rubCod: 23, rubNom: 38,
  tipo: 26,
  cod: 27, desc: 52, fecha: 101,
  valorCompraDer: 143, valorResidDer: 170, cantDer: 186,
  detalle: 29, derecha: 191,
};

// Valor residual: NO está en la base. Regla supuesta a partir de la hoja
// de ejemplo (un año de amortización): 80 % equipos de computación (436)
// y 90 % el resto. CONFIRMAR con la entidad.
const factorResidual = (codRubro) => (String(codRubro).startsWith('436') ? 0.8 : 0.9);

// ---- Utilidades ----
const fmtNum = (n) =>
  Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const aFecha = (f) => {
  if (!f) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(f)); // evita el corrimiento de un día por zona horaria
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  const d = new Date(f);
  return isNaN(d) ? null : d;
};

const fmtFecha = (f) => {
  const d = aFecha(f);
  if (!d) return '';
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getMonth() + 1)}/${p(d.getDate())}/${String(d.getFullYear()).slice(-2)}`;
};

const limpiar = (t) =>
  String(t ?? '')
    .replace(/N[¤ø]/g, 'Nº')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();

// Lee los datos tanto del formato del backend (cod_/desc_) como del mock (id_/nombre_)
const normalizar = (b) => {
  const dep = b.departamento || {};
  const ubi = b.ubicacion || {};
  const rub = b.rubro || {};
  const tip = b.tipo || {};
  return {
    dep: { cod: String(dep.cod_departamento ?? dep.id_departamento ?? ''), nom: limpiar(dep.desc_departamento ?? dep.nombre_departamento ?? 'SIN ASIGNAR') },
    ubi: { cod: String(ubi.cod_ubicacion_bien ?? ubi.id_ubicacion ?? ''), nom: limpiar(ubi.desc_ubicacion_bien ?? ubi.nombre_ubicacion ?? 'SIN UBICACION') },
    rub: { cod: String(rub.cod_rubro_bien ?? rub.id_rubro ?? ''), nom: limpiar(rub.desc_rubro_bien ?? rub.nombre_rubro ?? 'SIN RUBRO') },
    tip: { cod: String(tip.cod_tipo_bien ?? tip.id_tipo ?? ''), nom: limpiar(tip.desc_tipo_bien ?? tip.nombre_tipo ?? 'GENERAL') },
    codBien: String(b.cod_bien ?? ''),
    descBien: limpiar(b.desc_bien),
    detalle: limpiar(b.desc_detallada),
    // El modelo actual solo tiene fecha_alta; si se agrega fecha_compra, se usa automáticamente
    fecha: b.fecha_compra ?? b.fecha_alta,
    valor: Number(b.valor_moneda ?? 0),
    residual: b.valor_residual,
    cant: b.cant_baja ?? 0,
  };
};

/**
 * Genera y descarga el PDF.
 * @param {Array} bienes  los bienes ya seleccionados para exportar
 *                        (formato del backend o del mock)
 */
export function generarPDFAnexo(bienes) {
  const items = bienes
    .map(normalizar)
    .sort((a, b) =>
      a.dep.cod.localeCompare(b.dep.cod) || a.ubi.cod.localeCompare(b.ubi.cod) ||
      a.rub.cod.localeCompare(b.rub.cod) || a.tip.cod.localeCompare(b.tip.cod) ||
      a.codBien.localeCompare(b.codBien));

  // Título: si todos los bienes son del mismo año se muestra "AÑO 2021";
  // si son de varios, "AÑOS 2019-2021".
  const anios = items.map((it) => aFecha(it.fecha)?.getFullYear()).filter(Boolean);
  const anioMin = anios.length ? Math.min(...anios) : null;
  const anioMax = anios.length ? Math.max(...anios) : null;
  const etiquetaAnio = anioMin === null ? '' : anioMin === anioMax ? 'AÑO ' : 'AÑOS ';
  const textoAnio = anioMin === null ? '' : anioMin === anioMax ? String(anioMin) : `${anioMin}-${anioMax}`;

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const dibujarEncabezado = () => {
    doc.setFont(FUENTE, 'bold');
    doc.setFontSize(12);
    doc.text('I.O.S.E.P.', X.marco + 2, 14);

    const t1 = `BIENES ADQUIRIDOS${etiquetaAnio ? ': ' + etiquetaAnio : ''}`;
    doc.setFontSize(TAM.titulo);
    const w1 = doc.getTextWidth(t1);
    doc.setFontSize(TAM.anio);
    const w2 = doc.getTextWidth(textoAnio);
    const x0 = PAGINA.ancho / 2 - (w1 + w2) / 2;
    doc.setFontSize(TAM.titulo);
    doc.text(t1, x0, 14);
    doc.setFontSize(TAM.anio);
    doc.text(textoAnio, x0 + w1, 14);

    doc.setFontSize(9);
    doc.text('ANEXO', 150, 11);

    doc.setFont(FUENTE, 'normal');
    doc.setFontSize(TAM.columnas);
    doc.text('Cod. de Bien', 18, 22);
    doc.text('Descripcion', X.desc, 22);
    doc.text('Fecha Compra', X.fecha - 9, 22);
    doc.text('Valor Compra', 119, 22);
    doc.text('Valor Resid.', 148, 22);
    doc.text('Cant', 180, 22);
    doc.setLineWidth(0.3);
    doc.line(X.marco, 24, PAGINA.ancho - X.marco, 24);
    return 31; // y donde empieza el contenido
  };

  let y = dibujarEncabezado();
  const prev = { dep: null, ubi: null, rub: null, tip: null };

  for (const it of items) {
    // Qué encabezados de grupo hay que imprimir antes de este bien
    const cambia = {};
    cambia.dep = it.dep.cod + it.dep.nom !== prev.dep;
    cambia.ubi = cambia.dep || it.ubi.cod + it.ubi.nom !== prev.ubi;
    cambia.rub = cambia.ubi || it.rub.cod + it.rub.nom !== prev.rub;
    cambia.tip = cambia.rub || it.tip.cod + it.tip.nom !== prev.tip;

    doc.setFont(FUENTE, 'normal');
    doc.setFontSize(TAM.detalle);
    const lineasDetalle = it.detalle ? doc.splitTextToSize(it.detalle, X.derecha - X.detalle) : [];

    const cantGrupos = ['dep', 'ubi', 'rub', 'tip'].filter((k) => cambia[k]).length;
    const necesario = cantGrupos * ALTO.grupo + ALTO.item + lineasDetalle.length * ALTO.detalle + ALTO.separacionBloque;
    if (y + necesario > PAGINA.alto - PAGINA.margenInferior) {
      doc.addPage();
      y = dibujarEncabezado();
    }

    doc.setFont(FUENTE, 'bold');
    doc.setFontSize(TAM.grupo);
    if (cambia.dep) { doc.text(it.dep.cod, X.depCod, y); doc.text(it.dep.nom, X.depNom, y); y += ALTO.grupo; }
    if (cambia.ubi) { doc.text(it.ubi.cod, X.depCod, y); doc.text(it.ubi.nom, X.depNom, y); y += ALTO.grupo; }
    if (cambia.rub) { doc.text(it.rub.cod, X.rubCod, y); doc.text(it.rub.nom, X.rubNom, y); y += ALTO.grupo; }
    if (cambia.tip) { doc.text(`${it.tip.cod} ${it.tip.nom}`, X.tipo, y); y += ALTO.grupo; }
    prev.dep = it.dep.cod + it.dep.nom;
    prev.ubi = it.ubi.cod + it.ubi.nom;
    prev.rub = it.rub.cod + it.rub.nom;
    prev.tip = it.tip.cod + it.tip.nom;

    // Línea del bien
    const residual = it.residual ?? it.valor * factorResidual(it.rub.cod);
    doc.setFont(FUENTE, 'normal');
    doc.setFontSize(TAM.item);
    doc.text(it.codBien, X.cod, y);
    doc.text(it.descBien.substring(0, 24), X.desc, y);
    doc.text(fmtFecha(it.fecha), X.fecha, y);
    doc.text(fmtNum(it.valor), X.valorCompraDer, y, { align: 'right' });
    doc.text(fmtNum(residual), X.valorResidDer, y, { align: 'right' });
    doc.text(fmtNum(it.cant), X.cantDer, y, { align: 'right' });
    y += ALTO.item;

    // Detalle en línea(s) aparte
    doc.setFontSize(TAM.detalle);
    lineasDetalle.forEach((linea) => {
      doc.text(linea, X.detalle, y);
      y += ALTO.detalle;
    });
    y += ALTO.separacionBloque;
  }

  if (items.length === 0) {
    doc.setFont(FUENTE, 'normal');
    doc.setFontSize(TAM.item);
    doc.text('No hay bienes seleccionados.', X.depCod, y);
  }

  doc.save(`Bienes_Seleccionados_${new Date().toISOString().slice(0, 10)}.pdf`);
}
