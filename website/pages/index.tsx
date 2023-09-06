import { useContext, useEffect, useState } from "react";
import { StateContext } from "@/contexts/state-context";
import styles from "@/styles/Home.module.css";
import useCO2, { IOptions, IReport } from "@/hooks/useCO2";
import { formatCO2, formatNumber } from "@/utility/formats";
import SystemSegements from "@/components/system-segments";
import Statistics from "@/components/statistics";
import OverallSavings from "@/components/overallsavings";
import ReportForm from "@/components/report-form";
import Page from "./page";
import Highlight from "@/components/highlight";
import Card from "@/components/card";
import { co2 } from "@/utility/co2";

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
    <Page>
      <main className={styles.main}>
        <Heading url={state?.report?.url}></Heading>
        <ReportForm
          options={options}
          isLoading={isGenerating}
          onChange={setOptions}
        ></ReportForm>
        {(isGenerating || error) && (
          <GeneratingStatus status={status} error={error}></GeneratingStatus>
        )}

        {state.report && <Report report={state.report}></Report>}
      </main>
    </Page>
  );
}

function Heading({ url }: { url?: string }) {
  return (
    <h1>
      {/* {url ? (
        <>
          Report for:{" "}
          <a href={"https://" + url} target="_blank">
            {url}
          </a>
        </>
      ) : (
        <>Report</>
      )} */}
      Site Analyzer
    </h1>
  );
}

function Report({ report }: { report: IReport }) {
  const yearlyEmission = co2.perYear({
    bytes: report.bytes,
    intensity: report.co2Intensity,
    returningBytesPercentage: 2,
    returningViewsPercentage: 25,
    unit: "B",
    views: 10000,
  });
  return (
    <div className={styles.grid}>
      {/* <Card style={{ gridArea: "a" }}>
        <p style={{ margin: 0, fontSize: "1.5em", lineHeight: "1.5" }}>
          A single page view produces{" "}
          <Highlight>{formatCO2(report.emission.co2)} CO2</Highlight> on your
          website. With <Highlight>{formatNumber(10000)}</Highlight> monthly
          page views this sums up to{" "}
          <Highlight>{formatCO2(yearlyEmission.co2)} CO2</Highlight> over a
          year.
        </p>
      </Card> */}
      <h2 style={{ margin: 0, gridArea: "a" }}>
        Results for:{" "}
        <a href={"https://" + report.url} target="_blank">
          {report.url}
        </a>
      </h2>
      <Statistics style={{ gridArea: "b" }} report={report}></Statistics>
      <SystemSegements
        style={{ gridArea: "c" }}
        report={report}
      ></SystemSegements>
      <OverallSavings
        style={{ gridArea: "d" }}
        report={report}
      ></OverallSavings>
      <Card style={{ gridArea: "e" }}>
        <h2>Screenshot</h2>
        <img
          src={report.image}
          style={{
            borderRadius: "0.25rem",
            maxHeight: "400px",
            maxWidth: "100%",
          }}
        />
      </Card>
    </div>
  );
}

export const GeneratingStatus = ({
  status,
  error,
}: {
  status: number;
  error: string;
}) => {
  return (
    <Card>
      <label>Generating... {Math.min(Math.max(status, 0), 100)}%</label>
      <progress
        max="100"
        value={status}
        className={`${styles.progress} ${error && styles.error}`}
      ></progress>
      {error && <p>{error}</p>}
    </Card>
  );
};
