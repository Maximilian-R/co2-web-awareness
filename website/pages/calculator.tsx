import Head from "next/head";
import Menu from "@/components/menu";
import styles from "@/styles/Calculator.module.css";
import Parameters, { IOnChange, IState } from "@/components/parameters";
import { useState } from "react";

const getUnitMultiplier = (unit: string) => {
  if (unit === "kB") return 1000;
  if (unit === "MB") return 1000000;
  if (unit === "GB") return 1000000000;
  return 1;
};

export default function Calculator() {
  const [state, setState] = useState<IState>({
    views: 10000,
    bytes: 1000,
    country: "SE",
    returning: 25,
    unit: "KB",
  });

  const onChange: IOnChange = (property: string, value: any) => {
    setState((state) => ({
      ...state,
      [property]: value,
    }));
  };

  const calculation = () => {
    return (
      ((state.views * (state.bytes * getUnitMultiplier(state.unit))) /
        state.returning) *
      0.0001
    );
  };

  return (
    <>
      <Head>
        <title>CO2 Web Awareness</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu></Menu>
      <main className={styles.main}>
        <h1>Calculator</h1>

        <div className="card">
          <h2>Yearly emissions</h2>
          <Parameters onChange={onChange} state={state}></Parameters>
        </div>
        <div className="card">
          <div>
            Produces{" "}
            <span className="highlight">
              {+calculation().toFixed(2)}kg of CO2
            </span>{" "}
            every year
          </div>
        </div>
      </main>
    </>
  );
}
