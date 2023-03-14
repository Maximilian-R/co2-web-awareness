import { co2 } from "@tgwf/co2";
import { BytesUnit, bytesUnitDecimal } from "./formats";

export const sustainableWebDesign = new co2();

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

  const firstCO2 = sustainableWebDesign.perByte(firstBytes) * firstViews;
  const returningCO2 =
    sustainableWebDesign.perByte(returningBytes) * returningViews;

  return firstCO2 + returningCO2;
};
