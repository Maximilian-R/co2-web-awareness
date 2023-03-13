import styles from "@/styles/Statistics.module.css";

export default function Statistics({ style }: any) {
  return (
    <div className="card" style={style}>
      <h2>Statistics</h2>
      <p>
        While analyzing the result of one page view for the targeted website, we
        found this
      </p>
      <div className={styles.statistics}>
        <div>
          <label>CO2</label>
          <div>0.40g</div>
        </div>
        <div>
          <label>CO2 intensity</label>
          <div>43.9g/kWh</div>
        </div>
        <div>
          <label>Transfered size</label>
          <div>4.8 MB</div>
        </div>
      </div>
    </div>
  );
}
