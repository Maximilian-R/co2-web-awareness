import { bytesUnit, BytesUnit, unitValue } from "./formats";
import { IIntensity } from "./intensity";

export interface IEmission {
  co2: number; // g
  energy: number; //Wh
}

export interface IParameters {
  views: number;
  bytes: number;
  unit: BytesUnit;
  returningViewsPercentage: number;
  returningBytesPercentage: number;
  intensity: IIntensity;
}

export const SYSTEM_SEGMENT_PERCENTAGE_CONSUMER_DEIVCE_USE = 52;
export const SYSTEM_SEGMENT_PERCENTAGE_NETWORK_USE = 14;
export const SYSTEM_SEGMENT_PERCENTAGE_DATA_CENTER_USE = 15;
export const SYSTEM_SEGMENT_PERCENTAGE_HARDWARE_PRODUCTION = 19;
export const ANNUAL_AVG_ENERGY_KWH_PER_GB = 0.81;

export class CO2 {
  energy(bytes: number): number {
    return (bytes / unitValue("G")) * ANNUAL_AVG_ENERGY_KWH_PER_GB;
  }

  perByte(bytes: number, intensity: number): IEmission {
    const energykWh = this.energy(bytes);
    const carbon = energykWh * intensity;
    return { co2: carbon, energy: energykWh * unitValue("k") };
  }

  perYear({
    views,
    bytes,
    unit,
    intensity,
    returningViewsPercentage,
    returningBytesPercentage,
  }: IParameters): IEmission {
    const yearlyViews = views * 12;

    const fullViewsRatio = (100 - returningViewsPercentage) / 100;
    const cachedViewsRatio = returningViewsPercentage / 100;

    const fullViewBytes = bytes * bytesUnit(unit);
    const cachedViewBytes = fullViewBytes * (returningBytesPercentage / 100);

    const fullView = this.perByte(
      fullViewBytes * fullViewsRatio,
      intensity.value
    );
    const cachedView = this.perByte(
      cachedViewBytes * cachedViewsRatio,
      intensity.value
    );

    return {
      co2: (fullView.co2 + cachedView.co2) * yearlyViews,
      energy: (fullView.energy + cachedView.energy) * yearlyViews,
    };
  }

  toDrivingRange(grams: number) {
    const co2PerKm = 120;
    return (grams / co2PerKm) * unitValue("k");
  }

  toTreeAbsorption(grams: number) {
    const co2PerYear = 25 * unitValue("k");
    return grams / co2PerYear;
  }

  toTelevisionHours(energy: number) {
    const usageWh = 60;
    return energy / usageWh;
  }
}

export const co2 = new CO2();
