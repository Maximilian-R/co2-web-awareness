import Card from "@/components/card";
import styles from "@/styles/Intensity.module.css";
import { IIntensity, INTENSITY_DATA_2021 } from "@/utility/intensity";
import Page from "./page";

export default function Intensity() {
  return (
    <Page>
      <main>
        <h1>C02 Intensity</h1>
        <BarChart></BarChart>
      </main>
    </Page>
  );
}

function BarChart() {
  return (
    <Card>
      <h2>Country level</h2>
      <p>
        Greenhouse gas emission intensity is calculated as the ratio of CO2
        equivalent emissions from public electricity production
      </p>
      <div className={styles.barchart}>
        <div style={{ fontWeight: 700 }}>Country</div>
        <div style={{ fontWeight: 700 }}>g CO2/kWh</div>
        <div></div>
        {INTENSITY_DATA_2021.map((intensity) => (
          <Bar key={intensity.country} intensity={intensity}></Bar>
        ))}
      </div>
    </Card>
  );
}

function Bar({ intensity }: { intensity: IIntensity }) {
  const { country, value } = intensity;
  return (
    <>
      <div>{country}</div>
      <div>{value}</div>
      <div
        className={styles.bar}
        style={{
          width: `${(value / 1000) * 100}%`,
        }}
      ></div>
    </>
  );
}
