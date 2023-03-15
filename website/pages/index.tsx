import Head from "next/head";
import Menu from "@/components/menu";
import styles from "@/styles/Home.module.css";
import SystemSegements from "@/components/system-segments";
import Statistics from "@/components/statistics";
import OverallSavings from "@/components/overallsavings";
import { useContext, useEffect, useRef, useState } from "react";

import useCO2, { IReport, IResultEvent } from "@/hooks/useCO2";
import { formatCO2 } from "@/utility/formats";
import { IState, StateContext } from "@/contexts/state-context";

export default function Home() {
  const { state: contextState, setState: setContextState } =
    useContext(StateContext);
  const [url, setUrl] = useState<string>(contextState?.url ?? "");
  const { state, status, isGenerating, error } = useCO2(url, contextState);

  useEffect(() => {
    setContextState(state);
  }, [state, setContextState]);

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
        <Heading url={contextState?.url}></Heading>
        <ReportForm
          url={url}
          isLoading={isGenerating}
          onChange={setUrl}
        ></ReportForm>
        {isGenerating && (
          <Progressbar status={status} error={error}></Progressbar>
        )}
        {contextState && <Report report={contextState}></Report>}
        {contextState && <OverallStatistics report={contextState}></OverallStatistics>}
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


function ReportForm({
  url,
  isLoading,
  onChange,
}: {
  url: string;
  isLoading: boolean;
  onChange: (value: string) => void;
}) {
  const [_url, _setUrl] = useState<string>(url);

  return (
    <div className="card" style={{ gridArea: "a" }}>
      <h2>Create a report</h2>
      <p>Estimate your web page carbon footprint</p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onChange(_url);
        }}
      >
        <div>
          <div className="form-group">
            <label>Url</label>
            <input
              value={_url}
              onChange={(event) => _setUrl(event.target.value)}
            ></input>
          </div>
        </div>

        <button type="submit" disabled={isLoading}>
          Generate
          <i aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M174.7 45.1C192.2 17 223 0 256 0s63.8 17 81.3 45.1l38.6 61.7 27-15.6c8.4-4.9 18.9-4.2 26.6 1.7s11.1 15.9 8.6 25.3l-23.4 87.4c-3.4 12.8-16.6 20.4-29.4 17l-87.4-23.4c-9.4-2.5-16.3-10.4-17.6-20s3.4-19.1 11.8-23.9l28.4-16.4L283 79c-5.8-9.3-16-15-27-15s-21.2 5.7-27 15l-17.5 28c-9.2 14.8-28.6 19.5-43.6 10.5c-15.3-9.2-20.2-29.2-10.7-44.4l17.5-28zM429.5 251.9c15-9 34.4-4.3 43.6 10.5l24.4 39.1c9.4 15.1 14.4 32.4 14.6 50.2c.3 53.1-42.7 96.4-95.8 96.4L320 448v32c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-64-64c-9.4-9.4-9.4-24.6 0-33.9l64-64c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2v32l96.2 0c17.6 0 31.9-14.4 31.8-32c0-5.9-1.7-11.7-4.8-16.7l-24.4-39.1c-9.5-15.2-4.7-35.2 10.7-44.4zm-364.6-31L36 204.2c-8.4-4.9-13.1-14.3-11.8-23.9s8.2-17.5 17.6-20l87.4-23.4c12.8-3.4 26 4.2 29.4 17L182 241.2c2.5 9.4-.9 19.3-8.6 25.3s-18.2 6.6-26.6 1.7l-26.5-15.3L68.8 335.3c-3.1 5-4.8 10.8-4.8 16.7c-.1 17.6 14.2 32 31.8 32l32.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32.2 0C42.7 448-.3 404.8 0 351.6c.1-17.8 5.1-35.1 14.6-50.2l50.3-80.5z" />
            </svg>
          </i>
        </button>
      </form>
    </div>
  );
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
