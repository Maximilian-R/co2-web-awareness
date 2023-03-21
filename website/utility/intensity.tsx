import json from "@/data/co2-emission-intensity-12.json";

export interface IIntensity {
  value: number; // g/kWh
  country: string;
  year: number;
}

const INTENSITY_DATA: IIntensity[] = json.results.bindings.map<IIntensity>(
  (result) => ({
    value: result.greenhouse_gas_emission_ghg_intensity.value ?? 0,
    country: result.member_state.value,
    year: result.year.value,
  })
);

export const INTENSITY_DATA_2021: IIntensity[] = INTENSITY_DATA.filter(
  (intensity) => intensity.year === 2021
);

INTENSITY_DATA_2021.sort((a, b) => a.value - b.value);

export const findByCountry = (value: string) => {
  return INTENSITY_DATA_2021.find((intensity) => intensity.country === value);
};
