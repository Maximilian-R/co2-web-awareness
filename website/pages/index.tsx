import Head from "next/head";
import Menu from "@/components/menu";
import styles from "@/styles/Home.module.css";
import SystemSegements from "@/components/system-segments";
import Statistics from "@/components/statistics";

import OverallSavings from "@/components/overallsavings";


import useCO2, { IReport, IResultEvent } from "@/hooks/useCO2";
=======
import { useContext, useEffect, useState } from "react";
import useCO2, { IOptions, IReport } from "@/hooks/useCO2";

import { formatCO2 } from "@/utility/formats";
import { StateContext } from "@/contexts/state-context";
import ReportForm from "@/components/report-form";

export default function Home() {
  const { state, setState } = useContext(StateContext);
  const [options, setOptions] = useState<IOptions>(state.options);
  const {
    state: report,
    status,
    isGenerating,
    error,
  } = useCO2(options, state?.report);

  useEffect(() => {
    setState({ options, report });
  }, [options, report, setState]);

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
        <Heading url={state?.report?.url}></Heading>
        <ReportForm
          options={options}
          isLoading={isGenerating}
          onChange={setOptions}
        ></ReportForm>
        {isGenerating && (
          <Progressbar status={status} error={error}></Progressbar>
        )}

         {state.report && <Report report={state.report}></Report>}
        {state.report && <OverallStatistics report={state.report}></OverallStatistics>}

       

      </main>
    </>
  );
}

function Heading({ url }: { url?: string }) {
  return (
    <h1>
      {url ? (
        <>
          Report for:{" "}
          <a href={url} target="_blank">
            {url}
          </a>
        </>
      ) : (
        <>Report</>
      )}
    </h1>
  );
}

function Report({ report }: { report: IReport }) {
  return (
    <div className={styles.grid}>
      <div className="card" style={{ gridArea: "a" }}>
        <p style={{ margin: 0 }}>
          About{" "}
          <span className="highlight">{formatCO2(report.co2)} of CO2</span> is
          produced every time someone visits this web page
        </p>
      </div>
      <Statistics style={{ gridArea: "b" }} report={report}></Statistics>
      <SystemSegements
        style={{ gridArea: "c" }}
        report={report}
      ></SystemSegements>
    </div>
  );
}


function OverallStatistics({ report }: { report: IReport }) {
  return (
    <div>
      <OverallSavings style={{ gridArea: "d" }} report={report}></OverallSavings>
    </div>
  )
}

export const Progressbar = ({
  status,
  error,
}: {
  status: number;
  error: string;
}) => {
  return (
    <div className="card">
      <label>Generating... {Math.min(Math.max(status, 0), 100)}%</label>
      <progress
        max="100"
        value={status}
        className={`${styles.progress} ${error && styles.error}`}
      ></progress>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
