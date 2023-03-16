import { IReport, IResultEvent } from "@/hooks/useCO2";
import styles from "@/styles/Statistics.module.css";
import { formatBytes, formatCO2 } from "@/utility/formats";
import { useRouter } from "next/router";
import { CSSProperties, useMemo } from "react";

export default function OverallSavings({
  style,
  report,
}: {
  style: CSSProperties | undefined;
  report: IReport;
}) {
  const router = useRouter();

  const saveTopThree = useMemo(() => {
    console.log('allsavings', report.overallsavings);
    let sortSavings = Object.entries(report.overallsavings)
      .sort((a, b) => b[1].details.overallSavingsBytes - a[1].details.overallSavingsBytes)
      .slice(0, 3);
    console.log('sortSavings', sortSavings);
    return sortSavings;
  }, [report]); 

  

  function TopThreeSavings() {
    return saveTopThree.map((item) => (
      <div key={item[0]} className="card">
        <label>{item[0]}</label>
        <div> {formatBytes(item[1].details.overallSavingsBytes, "MB")}</div>
        <span>Info:</span>
        <span> {item[1].description}</span>
      </div>
    ));
  }

  return (
    <div className={`card ${styles.container}`} style={style}>
      <h2>Top three savings</h2>
      <div className={styles.statistics}>
        <TopThreeSavings></TopThreeSavings>
      </div>
    </div>
  );
}
