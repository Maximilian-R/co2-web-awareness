import { IReport } from "@/hooks/useCO2";
import styles from "@/styles/SystemSegments.module.css";
import { formatCO2 } from "@/utility/formats";

export default function SystemSegements({
  style,
  report,
}: {
  style: any;
  report: IReport;
}) {
  const { co2 } = report;
  return (
    <div className="card" style={style}>
      <h2>System segments</h2>
      <div className={styles.segments}>
        <Segement
          label="Consumer device use"
          percentage="52"
          value={co2 * 0.52}
          color={styles.color1}
        />
        <Segement
          label="Network use"
          percentage="14"
          value={co2 * 0.14}
          color={styles.color2}
        />
        <Segement
          label="Data center use"
          percentage="15"
          value={co2 * 0.15}
          color={styles.color3}
        />
        <Segement
          label="Hardware production"
          percentage="19"
          value={co2 * 0.19}
          color={styles.color4}
        />
      </div>
    </div>
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
        <div className={styles.value}>{formatCO2(value)}</div>
      </div>
    </div>
  );
}
