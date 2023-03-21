import { IReport } from "@/hooks/useCO2";
import styles from "@/styles/SystemSegments.module.css";
import {
  SYSTEM_SEGMENT_PERCENTAGE_CONSUMER_DEIVCE_USE,
  SYSTEM_SEGMENT_PERCENTAGE_DATA_CENTER_USE,
  SYSTEM_SEGMENT_PERCENTAGE_HARDWARE_PRODUCTION,
  SYSTEM_SEGMENT_PERCENTAGE_NETWORK_USE,
} from "@/utility/co2";
import { formatCO2 } from "@/utility/formats";
import { CSSProperties } from "react";
import Card from "./card";

export default function SystemSegements({
  style,
  report,
}: {
  style: CSSProperties | undefined;
  report: IReport;
}) {
  const { co2 } = report.emission;
  return (
    <Card style={style}>
      <h2>System segments</h2>
      <div className={styles.segments}>
        <Segement
          label="Consumer device use"
          percentage={SYSTEM_SEGMENT_PERCENTAGE_CONSUMER_DEIVCE_USE}
          value={co2}
          color={styles.color1}
        />
        <Segement
          label="Network use"
          percentage={SYSTEM_SEGMENT_PERCENTAGE_NETWORK_USE}
          value={co2}
          color={styles.color2}
        />
        <Segement
          label="Data center use"
          percentage={SYSTEM_SEGMENT_PERCENTAGE_DATA_CENTER_USE}
          value={co2}
          color={styles.color3}
        />
        <Segement
          label="Hardware production"
          percentage={SYSTEM_SEGMENT_PERCENTAGE_HARDWARE_PRODUCTION}
          value={co2}
          color={styles.color4}
        />
      </div>
    </Card>
  );
}

function Segement({ label, percentage, value, color }: any) {
  return (
    <div className={styles.segment}>
      <label>
        {label} ({percentage}%)
      </label>
      <div>
        <progress max="100" value={percentage} className={color}></progress>
        <div className={styles.value}>
          {formatCO2((value * percentage) / 100)}
        </div>
      </div>
    </div>
  );
}
