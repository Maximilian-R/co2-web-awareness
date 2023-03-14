import styles from "@/styles/Parameters.module.css";
import { BytesUnit } from "@/utility/formats";
import Radio from "./radio";

export interface IOnChange {
  (property: string, value: any): void;
}

export interface IState {
  views: number;
  bytes: number;
  unit: BytesUnit;
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
    <form>
      <div>
        <div className="form-group">
          <label>Monthly views</label>
          <div className={styles.parameter}>
            <input
              type="number"
              value={state.views}
              onChange={(event) => onChange("views", event.target.value)}
            ></input>
          </div>
        </div>

        <div className="form-group">
          <label>Bytes per request</label>
          <div className={styles.parameter}>
            <input
              type="number"
              value={state.bytes}
              onChange={(event) => onChange("bytes", event.target.value)}
            ></input>
            <Radio
              name="unit-radio"
              value={state.unit}
              items={["B", "kB", "MB", "GB", "TB"]}
              onChange={(value) => onChange("unit", value)}
            ></Radio>
          </div>
        </div>

        <div className="form-group">
          <label>Country</label>
          <div className={styles.parameter}>
            <input
              value={state.country}
              onChange={(event) => onChange("country", event.target.value)}
            ></input>
          </div>
        </div>

        <div className="form-group">
          <label>Returning users %</label>
          <div className={styles.parameter}>
            <input
              type="number"
              max="100"
              value={state.returning}
              onChange={(event) => onChange("returning", event.target.value)}
            ></input>
          </div>
        </div>
      </div>
    </form>
  );
}
