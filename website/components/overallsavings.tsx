import { IReport } from "@/hooks/useCO2";
import styles from "@/styles/Statistics.module.css";
import { formatBytes, formatCO2 } from "@/utility/formats";
import { useRouter } from "next/router";
import { CSSProperties } from "react";

export default function OverallSavings({
  style,
  report,
}: {
  style: CSSProperties | undefined;
  report: IReport;
}) {
  const router = useRouter();

  return (
    <div className={`card ${styles.container}`} style={style}>
      <h2>Overallsavings</h2>
    </div>
  );
}
