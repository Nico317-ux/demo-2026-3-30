/** Shared mock catalog — display strings may be Spanish (client demo) */
export const MOCK_PRODUCT_NAMES = [
  'IMPERMEABILIZANTE FIBRATADO 19L',
  'IMPERMEABILIZANTE ACRÍLICO 4L',
  'MANTO FÁCIL VERDE CTE',
  'PINTURA LATEX INTERIOR 4L',
  'PINTURA LATEX EXTERIOR 19L',
  'ESMALTE ANTICORROSIVO 1L',
  'ESMALTE BRILLANTE 4L',
  'RECUBRIMIENTO EPÓXICO 19L',
  'SELLADOR ACRÍLICO 4L',
  'BASE PINTURA ASFALTICA 19L',
  'PINTURA TRÁFICO AMARILLO 19L',
  'BARNIZ MARINO 1L',
  'IMPERMEABILIZANTE FIBRATADO 4L',
  'PRIMER ANTICORROSIVO 4L',
  'PASTA MURO INTERIOR 28KG',
] as const;

export const MOCK_SELLERS = [
  'Carlos Mendez',
  'Angel Alviarez',
  'Maria Torres',
  'Luis Rojas',
  'Diana Castillo',
  'Pedro Gomez',
  'Ana Valera',
  'Jorge Rivas',
] as const;

export const MOCK_REGIONS = ['Caracas', 'Valencia', 'Maracaibo', 'Barquisimeto', 'Oriente'] as const;

export const MOCK_PRODUCT_LINES = [
  'Impermeabilizantes',
  'Pinturas Arquitectónicas',
  'Esmaltes Industriales',
  'Recubrimientos Especiales',
  'Selladores',
] as const;

export const MOCK_CUSTOMERS = [
  'Ferremundial',
  'Distribuidora El Tigre',
  'Ferreterías Unidas',
  'Construcciones Bolívar',
  'Materiales del Centro',
  'Pinturas Express',
  'Decoraciones MM',
  'Surtidora Nacional',
  'Revestimientos CA',
  'AcabadosPro',
] as const;

export const SALES_MONTH_KEYS = [
  '2025-10',
  '2025-11',
  '2025-12',
  '2026-01',
  '2026-02',
  '2026-03',
] as const;

export function skuFinishedGoods(index: number): string {
  return `PT-${String(index + 1).padStart(3, '0')}`;
}

export function skuRawMaterial(index: number): string {
  return `MP-${String(index + 1).padStart(3, '0')}`;
}
