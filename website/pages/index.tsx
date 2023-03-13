import Head from "next/head";
import Menu from "@/components/menu";
import styles from "@/styles/Home.module.css";
import SystemSegements from "@/components/system-segments";
import Statistics from "@/components/statistics";

export default function Home() {
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
        <h1>
          Report for:{" "}
          <a href="seb.se" target="_blank">
            seb.se
          </a>
        </h1>

        <div className={styles.grid}>
          <div className="card" style={{ gridArea: "a" }}>
            <p style={{ margin: 0 }}>
              About <span className="highlight">0.0g of CO2</span> is produced
              every time someone visits this web page.
            </p>
          </div>

          <Statistics style={{ gridArea: "b" }}></Statistics>

          <SystemSegements style={{ gridArea: "c" }}></SystemSegements>
        </div>
      </main>
    </>
  );
}
