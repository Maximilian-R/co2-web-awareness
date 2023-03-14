import Head from "next/head";
import Menu from "@/components/menu";
import styles from "@/styles/Calculator.module.css";
import Parameters, { IOnChange } from "@/components/parameters";
import { useEffect, useState } from "react";
import { formatCO2 } from "@/utility/formats";
import { calculateCO2, IParameters } from "@/utility/co2";
import { useRouter } from "next/router";

export default function Calculator() {
  const router = useRouter();
  const [state, setState] = useState<IParameters>({
    views: 10000,
    bytes: 1000,
    country: "SE",
    returningViewsPercentage: 25,
    returningBytesPercentage: 50,
    unit: "kB",
  });

  const onChange: IOnChange = (property: string, value: any) => {
    setState((state) => ({
      ...state,
      [property]: value,
    }));
  };

  useEffect(() => {
    setState((prev) => ({ ...prev, ...router.query }));
  }, [router.query]);

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
              {formatCO2(calculateCO2(state), "kg")} of CO2
            </span>{" "}
            every year
          </div>
        </div>
      </main>
    </>
  );
}
