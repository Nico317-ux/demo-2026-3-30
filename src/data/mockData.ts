export const mockKpis = {
  ventasTotales_USD: 13222.43,
  volumenTotal_Galones: 802.50,
  valorInventarioPareto_USD: 9605.78,
  valorInventarioFueraPareto_USD: 2442.21,
  crecimientoMes_Porcentaje: 12.4,
};

export const mockVendedores = [
  { id: "V001", nombre: "Keller Ortega", region: "Capital", ventas_usd: 5197.10, galones: 346.0 },
  { id: "V002", nombre: "Carlos Martinez", region: "Oriente", ventas_usd: 583.54, galones: 20.0 },
  { id: "V003", nombre: "Liseth Brito", region: "Capital", ventas_usd: 107.85, galones: 4.0 },
  { id: "V004", nombre: "Jean Brazon", region: "Sin Asignar", ventas_usd: 0, galones: 12.0 },
  { id: "V005", nombre: "Mariannis Gandara", region: "Sin Asignar", ventas_usd: 0, galones: 18.0 },
  { id: "V006", nombre: "Jhonatan Lopez", region: "Sin Asignar", ventas_usd: 0, galones: 30.0 },
  { id: "V007", nombre: "Gabriel Villegas", region: "Capital", ventas_usd: 34.75, galones: 1.0 },
];

export const mockTopClientes = [
  { cliente: "Ferremundial Proto 2020 C.A.", region: "Capital", compras_usd: 3923.64, participacion_pct: 34.89, lastPurchase: "2026-03-28", status: "Activo" },
  { cliente: "Pinta Ofertas C.A.", region: "Oriente", compras_usd: 583.54, participacion_pct: 5.18, lastPurchase: "2026-03-25", status: "Re-compra" },
  { cliente: "Ferreteria Alfa 2021 C.A.", region: "Capital", compras_usd: 107.85, participacion_pct: 0.95, lastPurchase: "2026-03-20", status: "Activo" },
  { cliente: "Constructora y Multiservicios Maca 78, C.A.", region: "Táchira", compras_usd: -82.07, participacion_pct: -0.62, lastPurchase: "2026-02-15", status: "En Riesgo" },
  { cliente: "Servicios y Distribuciones Liscano, C.A.", region: "Sin Asignar", compras_usd: -131.63, participacion_pct: -0.99, lastPurchase: "2026-01-30", status: "En Riesgo" },
  { cliente: "Pinlacas Guatire, C.A.", region: "Capital", compras_usd: 0, participacion_pct: -1.24, lastPurchase: "2025-12-10", status: "Inactivo" },
];

export const mockVentasPorMarca = [
  { marca: "SUPER A", ventas_usd: 11903.83, galones: 754.5 },
  { marca: "PINTAMAS", ventas_usd: 583.54, galones: 20.0 },
  { marca: "PROTECCION DE METALES", ventas_usd: 89.76, galones: 3.0 },
];

export const mockVentasPorRegion = [
  { region: "Capital", ventas_usd: 12617.34, galones: 791.75 },
  { region: "Oriente", ventas_usd: 583.54, galones: 20.0 },
  { region: "Táchira", ventas_usd: -440.77, galones: -24.5 },
];

export const mockEstadisticasProductos = [
  {
    sku: "404400702006",
    descripcion: "PINTURA ESMALTE PINTAMAS BRILLANTE BLANCO GALON (3,78 L)",
    familia: "PINTURA ESMALTE",
    ventas_usd: 583.54,
    stock_actual: 0,
    status: "Critico"
  },
  {
    sku: "1804400101015",
    descripcion: "IMPERMEABILIZANTE MANTO FACIL PINTAMAS ROJO GAL 1/1 (3,78L)",
    familia: "IMPERMEABILIZANTES",
    ventas_usd: 0,
    stock_actual: 138,
    status: "Sano"
  },
  {
    sku: "100100101006",
    descripcion: "PINTURA CAUCHO SUPER A STANDAR MATE BLANCO GALON (3,78 L)",
    familia: "PINTURA CAUCHO",
    ventas_usd: 0,
    stock_actual: 40,
    status: "Atencion"
  },
  {
    sku: "100101405097",
    descripcion: "PINTURA CAUCHO SUPER A PROVINILICA SATINADO MARFIL P115 GAL 1/1",
    familia: "PINTURA CAUCHO",
    ventas_usd: 18.09,
    stock_actual: 1,
    status: "Critico"
  },
  {
    sku: "ROLLOS_SUPER_A",
    descripcion: "ROLLOS SUPER A TELA REFUERZO 1,10X50 MTS",
    familia: "ROLLOS",
    ventas_usd: 0,
    stock_actual: 94,
    status: "Sano"
  }
];
