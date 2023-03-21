import {
  findByCountry,
  IIntensity,
  INTENSITY_DATA_2021,
} from "@/utility/intensity";

export interface ICountrySelector {
  value: IIntensity;
  onChange: (value: IIntensity) => void;
}

export default function CountrySelector({ value, onChange }: ICountrySelector) {
  const _onChange = (event: any) => {
    const value = event.target.value;
    const intensity = findByCountry(value);
    if (intensity) onChange(intensity);
  };

  return (
    <select name="country-selector" onChange={_onChange} value={value.country}>
      {INTENSITY_DATA_2021.map((intensity) => (
        <option key={intensity.country} value={intensity.country}>
          {intensity.country} - {intensity.value}
        </option>
      ))}
    </select>
  );
}
