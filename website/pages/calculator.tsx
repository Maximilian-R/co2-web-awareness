import Head from "next/head";
import Menu from "@/components/menu";
import styles from "@/styles/Calculator.module.css";
import Parameters from "@/components/parameters";

export default function Calculator() {
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
          <Parameters></Parameters>
        </div>
        <div className="card">
          <div>
            Produces <span className="highlight">0.0kg of CO2</span> every year
          </div>
        </div>
      </main>
    </>
  );
}
