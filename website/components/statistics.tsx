import { IReport } from "@/hooks/useCO2";
import styles from "@/styles/Statistics.module.css";
import { formatBytes, formatCO2 } from "@/utility/formats";
import { useRouter } from "next/router";
import { CSSProperties } from "react";
import Card from "./card";
import Highlight from "./highlight";

export default function Statistics({
  style,
  report,
}: {
  style: CSSProperties | undefined;
  report: IReport;
}) {
  const router = useRouter();

  return (
    <Card className={styles.container} style={style}>
      <h2>Statistics</h2>
      <p>For one page view at {report.url} we found these stats</p>
      <div className={styles.statistics}>
        <Card>
          <label>CO2</label>
          <div>
            <Highlight>{formatCO2(report.emission.co2) ?? "--"}</Highlight>
          </div>
        </Card>
        <Card>
          <label>CO2 intensity</label>
          <div>
            <Highlight>
              {formatCO2(report.co2Intensity.value) ?? "--"}
              /kWh
            </Highlight>
          </div>
        </Card>
        <Card>
          <label>Transfered size</label>
          <div>
            <Highlight>{formatBytes(report.bytes) ?? "--"}</Highlight>
          </div>
        </Card>
      </div>
      <button
        className={styles.button}
        onClick={() => {
          router.push(
            {
              pathname: "/calculator",
              query: {
                bytes: report.bytes,
                unit: "B",
                country: report.co2Intensity.country,
              },
            },
            "/calculator"
          );
        }}
      >
        Copy to calculator
        <i aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM96 64H288c17.7 0 32 14.3 32 32v32c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32zm32 160a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM96 352a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM64 416c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM192 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm64-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM288 448a32 32 0 1 1 0-64 32 32 0 1 1 0 64z" />
          </svg>
        </i>
      </button>
    </Card>
  );
}
