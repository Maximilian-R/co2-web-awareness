import { co2, averageIntensity } from "@tgwf/co2";
import { BytesUnit, bytesUnitDecimal, unitDecimal } from "./formats";
import { IIntensityCountry } from "./intensity";

export const INTENSITY_SWE = parseFloat(averageIntensity.data.SWE);
// const options = {
//   gridIntensity: {
//     device: intensity,
//     network: intensity,
//     dataCenter: intensity,
//   },
// };

export const ANNUAL_AVG_ENERGY_KWH_PER_GB = 0.81;

export const sustainableWebDesign = {
  perByte: (bytes: number, intensity: number) => {
    const energy = (bytes / unitDecimal("G")) * ANNUAL_AVG_ENERGY_KWH_PER_GB;
    const carbon = energy * intensity;
    return carbon;
  },
};
//export const sustainableWebDesign = new co2();

export interface IParameters {
  views: number;
  bytes: number;
  unit: BytesUnit;
  returningViewsPercentage: number;
  returningBytesPercentage: number;
  country: IIntensityCountry;
}

export const calculateCO2 = (parameters: IParameters) => {
  const views = parameters.views * 12;
  const firstViews =
    ((100 - parameters.returningViewsPercentage) / 100) * views;
  const returningViews = (parameters.returningViewsPercentage / 100) * views;

  const firstBytes = parameters.bytes * bytesUnitDecimal(parameters.unit);
  const returningBytes =
    firstBytes * (parameters.returningBytesPercentage / 100);

  const firstCO2 =
    sustainableWebDesign.perByte(
      firstBytes,
      parameters.country.greenhouse_gas_emission_ghg_intensity.value
    ) * firstViews;
  const returningCO2 =
    sustainableWebDesign.perByte(
      returningBytes,
      parameters.country.greenhouse_gas_emission_ghg_intensity.value
    ) * returningViews;

  return firstCO2 + returningCO2;
};

export const calculateCO2Driving = (grams: number) => {
  const co2PerKm = 120;
  return grams / co2PerKm;
};

export const calculateCO2TreeAbsorption = (grams: number) => {
  const co2PerYear = 25 * 1000;
  return grams / co2PerYear;
};
