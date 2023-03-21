import { IReport, ISaving } from "@/hooks/useCO2";
import styles from "@/styles/Statistics.module.css";
import { formatBytes } from "@/utility/formats";

import { CSSProperties, useMemo } from "react";
import Card from "./card";

const sortByBytes = (a: ISaving, b: ISaving) => {
  return b.details.overallSavingsBytes - a.details.overallSavingsBytes;
};

export default function OverallSavings({
  style,
  report,
}: {
  style: CSSProperties | undefined;
  report: IReport;
}) {
  const topThree = useMemo(() => {
    return report.savings.sort(sortByBytes).slice(0, 3);
  }, [report]);

  return (
    <Card className={styles.container} style={style}>
      <h2>Potential savings</h2>
      {topThree.length > 0 ? (
        <div className={styles.savings}>
          {topThree.map((item) => (
            <Saving key={item.title} item={item}></Saving>
          ))}
        </div>
      ) : (
        <p>Could not idenitfy any potential savings</p>
      )}
    </Card>
  );
}

function Saving({ item }: { item: ISaving }) {
  const description = item.description.split("[")[0];
  return (
    <Card className={styles.saving}>
      <div>
        <label>{item.title}</label>
        <div> {formatBytes(item.details.overallSavingsBytes)}</div>
      </div>
      <div className={styles.info}>{description}</div>
    </Card>
  );
}
