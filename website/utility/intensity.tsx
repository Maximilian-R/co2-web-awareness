import json from "@/data/co2-emission-intensity-12.json";

export interface IIntensityObject<T> {
  value: T;
}

export interface IIntensityCountry {
  greenhouse_gas_emission_ghg_intensity: IIntensityObject<number>;
  member_state: IIntensityObject<string>;
  year: IIntensityObject<number>;
}

const INTENSITY_DATA: IIntensityCountry[] = json.results
  .bindings as IIntensityCountry[];

export const INTENSITY_DATA_2021: IIntensityCountry[] = INTENSITY_DATA.filter(
  (result) => result.year.value === 2021
);

INTENSITY_DATA_2021.sort(
  (a, b) =>
    a.greenhouse_gas_emission_ghg_intensity.value -
    b.greenhouse_gas_emission_ghg_intensity.value
);
