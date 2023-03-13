import styles from "@/styles/Parameters.module.css";
import Radio from "./radio";

export interface IOnChange {
  (property: string, value: any): void;
}

export interface IState {
  views: number;
  bytes: number;
  unit: "KB" | "MB" | "GB";
  country: string;
  returning: number;
}

export default function Parameters({
  state,
  onChange,
}: {
  state: IState;
  onChange: IOnChange;
}) {
  return (
    <div className={styles.parameters}>
      <div className={styles.parameter}>
        <label>Monthly views</label>
        <div>
          <input
            type="number"
            value={state.views}
            onChange={(event) => onChange("views", event.target.value)}
          ></input>
        </div>
      </div>

      <div className={styles.parameter}>
        <label>Bytes per request</label>
        <div>
          <input
            type="number"
            value={state.bytes}
            onChange={(event) => onChange("bytes", event.target.value)}
          ></input>
          <Radio
            name="unit-radio"
            items={["KB", "MB", "GB"]}
            onChange={(value) => onChange("unit", value)}
          ></Radio>
        </div>
      </div>

      <div className={styles.parameter}>
        <label>Country</label>
        <div>
          <input
            value={state.country}
            onChange={(event) => onChange("country", event.target.value)}
          ></input>
        </div>
      </div>

      <div className={styles.parameter}>
        <label>Returning users</label>
        <div>
          <input
            type="number"
            max="100"
            value={state.returning}
            onChange={(event) => onChange("returning", event.target.value)}
          ></input>
        </div>
      </div>
    </div>
  );
}
