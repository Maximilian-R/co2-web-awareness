import Head from "next/head";
import Menu from "@/components/menu";
import styles from "@/styles/Intensity.module.css";
import { IIntensityCountry, INTENSITY_DATA_2021 } from "@/utility/intensity";

export default function Intensity() {
  return (
    <>
      <Head>
        <title>CO2 Web Awareness</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu></Menu>
      <main>
        <h1>C02 Intensity</h1>
        <BarChart></BarChart>
      </main>
    </>
  );
}

function BarChart() {
  return (
    <div className="card">
      <h2>Country level</h2>
      <p>
        Greenhouse gas emission intensity (g CO2/kWh) is calculated as the ratio
        of CO2 equivalent emissions from public electricity production
      </p>
      <div className={styles.barchart}>
        <div style={{ fontWeight: 700 }}>Country</div>
        <div style={{ fontWeight: 700 }}>g CO2/kWh</div>
        <div></div>
        {INTENSITY_DATA_2021.map((country) => (
          <Bar key={country.member_state.value} country={country}></Bar>
        ))}
      </div>
    </div>
  );
}

function Bar({ country }: { country: IIntensityCountry }) {
  return (
    <>
      <div>{country.member_state.value}</div>
      <div>{country.greenhouse_gas_emission_ghg_intensity.value}</div>
      <div
        className={styles.bar}
        style={{
          width: `${
            (country.greenhouse_gas_emission_ghg_intensity.value / 1000) * 100
          }%`,
        }}
      ></div>
    </>
  );
}
