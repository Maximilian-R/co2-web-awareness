import { IReport } from "@/hooks/useCO2";
import styles from "@/styles/Statistics.module.css";
import { formatBytes } from "@/utility/formats";
import { CSSProperties, useMemo } from "react";

export default function OverallSavings({
  style,
  report,
}: {
  style: CSSProperties | undefined;
  report: IReport;
}) {
  const saveTopThree = useMemo(() => {
    let sortSavings = Object.entries(report.overallsavings)
      .sort(
        (a, b) =>
          b[1].details.overallSavingsBytes - a[1].details.overallSavingsBytes
      )
      .slice(0, 3)
      .map((item) => item[1]);
    return sortSavings;
  }, [report]);

  return (
    <div className={`card ${styles.container}`} style={style}>
      <h2>Top three savings</h2>
      <div className={styles.savings}>
        {saveTopThree.map((item) => (
          <Saving key={item.title} item={item}></Saving>
        ))}
      </div>
    </div>
  );
}

function Saving({ item }: { item: any }) {
  console.log(item);
  return (
    <div className={`card ${styles.saving}`}>
      <div>
        <label>{item.title}</label>
        <div> {formatBytes(item.details.overallSavingsBytes, "MB")}</div>
      </div>
      <div className={styles.info}>{item.description}</div>
    </div>
  );
}
