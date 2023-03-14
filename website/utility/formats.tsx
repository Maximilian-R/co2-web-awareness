export type WeightUnit = "g" | "kg";
export type BytesUnit = "B" | "kB" | "MB" | "GB" | "TB";
export type Unit = "" | "k" | "M" | "G" | "T";

export const formatCO2 = (weight: number, unit: WeightUnit = "g") => {
  const divider = unit === "kg" ? 1000 : 1;
  return `${+(weight / divider).toFixed(2)}${unit}`;
};

export const formatBytes = (bytes: number, unit: BytesUnit = "B") => {
  let divider = 1;
  if (unit === "kB") divider = 1000;
  if (unit === "MB") divider = 1000000;
  if (unit === "GB") divider = 1000000000;
  return `${+(bytes / divider).toFixed(2)}${unit}`;
};

export const unitDecimal = (unit: Unit) => {
  if (unit === "k") return 1000;
  if (unit === "M") return 1000000;
  if (unit === "G") return 1000000000;
  if (unit === "T") return 1000000000000;
  return 1;
};

export const bytesUnitDecimal = (unit: BytesUnit) => {
  return unitDecimal(unit.substring(0, 1) as Unit);
};
