import styles from "@/styles/SystemSegments.module.css";

export default function SystemSegements({ style }: any) {
  return (
    <div className="card" style={style}>
      <h2>System segments</h2>
      <div className={styles.segments}>
        <Segement
          label="Consumer device use"
          percentage="52"
          value="0.90"
          color={styles.color1}
        />
        <Segement
          label="Network use"
          percentage="14"
          value="0.28"
          color={styles.color2}
        />
        <Segement
          label="Data center use"
          percentage="15"
          value="0.18"
          color={styles.color3}
        />
        <Segement
          label="Hardware production"
          percentage="19"
          value="0.01"
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
        <div className={styles.value}>{`${+value}g`}</div>
      </div>
    </div>
  );
}
