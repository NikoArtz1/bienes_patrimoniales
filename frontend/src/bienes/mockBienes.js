export const MOCK_BIENES = [
  {
    id_bien: 1,
    cod_bien: "BIEN-2026-001",
    desc_bien: "Notebook Lenovo ThinkPad",
    desc_detallada: "Procesador i7, 16GB RAM, 512GB SSD. Asignada al área técnica.",
    rubro: { id_rubro: 2, nombre_rubro: "Tecnología" },
    tipo: { id_tipo: 5, nombre_tipo: "Equipos Informáticos" },
    departamento: { id_departamento: 1, nombre_departamento: "Sistemas" },
    responsable: { id_responsable: 10, nombre_responsable: "Carlos Gómez" },
    ubicacion: { id_ubicacion: 3, nombre_ubicacion: "Oficina Central - Piso 2" },
    fecha_alta: "2026-03-15T10:30:00",
    moneda: "ARS",
    valor_moneda: 1500000.00
  },
  {
    id_bien: 2,
    cod_bien: "BIEN-2026-002",
    desc_bien: "Escritorio de Madera L",
    desc_detallada: "Escritorio ejecutivo con cajonera integrada, color marrón oscuro.",
    rubro: { id_rubro: 1, nombre_rubro: "Mobiliario" },
    tipo: { id_tipo: 2, nombre_tipo: "Muebles de Oficina" },
    departamento: { id_departamento: 4, nombre_departamento: "Administración" },
    responsable: { id_responsable: 12, nombre_responsable: "Ana Martínez" },
    ubicacion: { id_ubicacion: 1, nombre_ubicacion: "Planta Baja - Sector A" },
    fecha_alta: "2026-04-01T08:15:00",
    moneda: "ARS",
    valor_moneda: 320000.00
  }
];