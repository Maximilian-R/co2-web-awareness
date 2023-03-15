import { co2, averageIntensity } from "@tgwf/co2";
import { BytesUnit, bytesUnitDecimal, unitDecimal } from "./formats";

export const INTENSITY_SWE = parseFloat(averageIntensity.data.SWE);
// const options = {
//   gridIntensity: {
//     device: intensity,
//     network: intensity,
//     dataCenter: intensity,
//   },
// };

export const ENERGY_KWH = 0.81;

export const sustainableWebDesign = {
  perByte: (bytes: number, intensity: number) => {
    const energy = (bytes / unitDecimal("G")) * ENERGY_KWH;
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
  country: string;
}

export const calculateCO2 = (parameters: IParameters) => {
  const firstViews =
    ((100 - parameters.returningViewsPercentage) / 100) * parameters.views;
  const returningViews =
    (parameters.returningViewsPercentage / 100) * parameters.views;

  const firstBytes = parameters.bytes * bytesUnitDecimal(parameters.unit);
  const returningBytes =
    firstBytes * (parameters.returningBytesPercentage / 100);

  const firstCO2 =
    sustainableWebDesign.perByte(firstBytes, INTENSITY_SWE) * firstViews;
  const returningCO2 =
    sustainableWebDesign.perByte(returningBytes, INTENSITY_SWE) *
    returningViews;

  return firstCO2 + returningCO2;
};
