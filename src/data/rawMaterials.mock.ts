import type { RawMaterial } from '../types';
import { skuRawMaterial } from './catalog';

const MOCK_RM_DESCRIPTIONS = [
  'RESINA ACRILICA',
  'BASE PINTURA ASFALTICA',
  'PIGMENTO OXIDO ROJO',
  'SOLVENTE MINERAL',
  'ESPESANTE',
  'CARGA CARBONATO',
  'ADITIVO ANTIESPUMANTE',
  'EMULSION VINILICA',
  'FUNGICIDA',
  'LATEX ACRILICO',
  'TITANIO RUTILE',
  'DISOLVENTE AROMATICO',
];

const MOCK_SUPPLIERS = ['Química Andina', 'Resinas del Lago', 'Pigmentos CA', 'Solventes Unidos', 'Importadora Norte'];

let seed = 303;
function seededRand() {
  seed = (seed * 48271) % 2147483647;
  return (seed & 2147483647) / 2147483647;
}
function srand(min: number, max: number) {
  return Math.floor(seededRand() * (max - min + 1)) + min;
}
function spick<T>(arr: T[]): T {
  return arr[srand(0, arr.length - 1)]!;
}

function buildRawMaterials(): RawMaterial[] {
  seed = 303;
  return MOCK_RM_DESCRIPTIONS.map((description, i) => {
    const currentStock = srand(200, 5000);
    const monthlyConsumption = srand(80, 2000);
    const rotationDays = Math.max(
      5,
      Math.round((currentStock / Math.max(1, monthlyConsumption)) * 30),
    );
    const unitCost = srand(2, 45) + seededRand();
    return {
      code: skuRawMaterial(i),
      description,
      unit: 'KG',
      currentStock,
      monthlyConsumption,
      rotationDays,
      lastPurchase: new Date(2026, 2, srand(1, 28)).toISOString().slice(0, 10),
      unitCost: Math.round(unitCost * 100) / 100,
      inventoryValue: Math.round(currentStock * unitCost),
      supplier: spick(MOCK_SUPPLIERS),
    };
  });
}

export const rawMaterialsMock: RawMaterial[] = buildRawMaterials();
