import styles from "@/styles/Statistics.module.css";

export default function Statistics({ style }: any) {
  return (
    <div className={`card ${styles.container}`} style={style}>
      <h2>Statistics</h2>
      <p>
        While analyzing the result of one page view at seb.se we estimated these
        results:
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
      <button className={styles.button}>
        Copy to calculator
        <i aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM96 64H288c17.7 0 32 14.3 32 32v32c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32zm32 160a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM96 352a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM64 416c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM192 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm64-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM288 448a32 32 0 1 1 0-64 32 32 0 1 1 0 64z" />
          </svg>
        </i>
      </button>
    </div>
  );
}
