export type DistanceUnit = "m" | "km";
export type WeightUnit = "g" | "kg" | "t";
export type BytesUnit = "B" | "kB" | "MB" | "GB" | "TB";
export type Unit = "" | "k" | "M" | "G" | "T";

export const unitValue = (unit: Unit) => {
  if (unit === "k") return 1000;
  if (unit === "M") return 1000000;
  if (unit === "G") return 1000000000;
  if (unit === "T") return 1000000000000;
  return 1;
};

export const bytesUnit = (unit: BytesUnit) => {
  return unitValue(unit.substring(0, 1) as Unit);
};

export const distanceUnit = (unit: DistanceUnit) => {
  return unitValue(unit.substring(0, 1) as Unit);
};

export const weightUnit = (unit: WeightUnit) => {
  if (unit === "kg") return 1000;
  if (unit === "t") return 1000000;
  return 1;
};

export const formatCO2 = (weight: number) => {
  let unit: WeightUnit = "g";
  if (weight >= weightUnit("kg")) unit = "kg";
  if (weight >= weightUnit("t")) unit = "t";
  const value = weight / weightUnit(unit);
  return `${formatDecimal(
    value,
    value < 0.1 ? 3 : value >= 100 ? 0 : 2
  )}${unit}`;
};

export const formatDistance = (distance: number) => {
  let unit: DistanceUnit = "m";
  if (distance >= distanceUnit("km")) unit = "km";
  const value = distance / distanceUnit(unit);
  return `${formatDecimal(value, value >= 100 ? 0 : 2)}${unit}`;
};

export const formatEnergy = (energy: number) => {
  let unit: Unit = "";
  if (energy >= unitValue("k")) unit = "k";
  if (energy >= unitValue("M")) unit = "M";
  if (energy >= unitValue("G")) unit = "G";
  if (energy >= unitValue("T")) unit = "T";
  const value = energy / unitValue(unit);
  return `${formatDecimal(value, value >= 100 ? 0 : 2)}${unit}Wh`;
};

export const formatBytes = (bytes: number) => {
  let unit: BytesUnit = "B";
  if (bytes >= bytesUnit("kB")) unit = "kB";
  if (bytes >= bytesUnit("MB")) unit = "MB";
  if (bytes >= bytesUnit("GB")) unit = "GB";
  if (bytes >= bytesUnit("TB")) unit = "TB";
  return `${formatDecimal(bytes / bytesUnit(unit))}${unit}`;
};

export const formatDecimal = (value: number, decimals: number = 2) => {
  return formatNumber(+value.toFixed(decimals));
};

export const formatNumber = (value: number) => {
  return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
