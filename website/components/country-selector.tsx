// import { useEffect, useState } from "react";
// import styles from "@/styles/Radio.module.css";
import { IIntensityCountry, INTENSITY_DATA_2021 } from "@/utility/intensity";

export interface ICountrySelector {
  value: IIntensityCountry;
  onChange: (value: IIntensityCountry) => void;
}

export default function CountrySelector({ value, onChange }: ICountrySelector) {
  const _onChange = (event: any) => {
    const value = event.target.value;
    const country = INTENSITY_DATA_2021.find(
      (country) => country.member_state.value === value
    );
    if (country) onChange(country);
  };

  return (
    <select
      name="country-selector"
      onChange={_onChange}
      value={value.member_state.value}
    >
      {INTENSITY_DATA_2021.map((country) => (
        <option
          key={country.member_state.value}
          value={country.member_state.value}
        >
          {country.member_state.value} -{" "}
          {country.greenhouse_gas_emission_ghg_intensity.value}
        </option>
      ))}
    </select>
  );
}
