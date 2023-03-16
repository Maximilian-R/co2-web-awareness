import Head from "next/head";
import Menu from "@/components/menu";
import styles from "@/styles/Calculator.module.css";
import Parameters, { IOnChange } from "@/components/parameters";
import { useEffect, useState } from "react";
import { BytesUnit, formatCO2 } from "@/utility/formats";
import { calculateCO2, calculateCO2Driving, IParameters } from "@/utility/co2";
import { useRouter } from "next/router";
import { INTENSITY_DATA_2021 } from "@/utility/intensity";

const defaultState: IParameters = {
  views: 10000,
  bytes: 1000,
  country: INTENSITY_DATA_2021[0],
  returningViewsPercentage: 25,
  returningBytesPercentage: 2,
  unit: "kB",
};

export default function Calculator() {
  const router = useRouter();
  const [state, setState] = useState<IParameters>(defaultState);

  const onChange: IOnChange = (property: string, value: any) => {
    setState((state) => ({
      ...state,
      [property]: value,
    }));
  };

  useEffect(() => {
    const parameters: Partial<IParameters> = {};

    if (router.query.bytes)
      parameters.bytes = parseFloat(router.query.bytes as string);
    if (router.query.unit) parameters.unit = router.query.unit as BytesUnit;
    if (router.query.country)
      parameters.country = INTENSITY_DATA_2021.find(
        (country) => country.member_state.value === router.query.country
      );

    setState((prev) => ({ ...prev, ...parameters }));
  }, [router.query]);

  const co2 = calculateCO2(state);

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
            <span className="highlight">{formatCO2(co2, "kg")} of CO2</span>{" "}
            every year
          </div>
        </div>
        <div className="card">
          <div>
            That is similar to driving a petrol car for{" "}
            <span className="highlight">
              {+calculateCO2Driving(co2).toFixed(2)}km
            </span>{" "}
          </div>
        </div>
      </main>
    </>
  );
}
