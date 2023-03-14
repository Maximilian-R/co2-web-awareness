import styles from "@/styles/Parameters.module.css";
import { IParameters } from "@/utility/co2";
import Radio from "./radio";

export interface IOnChange {
  (property: string, value: any): void;
}

export default function Parameters({
  state,
  onChange,
}: {
  state: IParameters;
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
          <label>Returning views %</label>
          <div className={styles.parameter}>
            <input
              type="number"
              max="100"
              value={state.returningViewsPercentage}
              onChange={(event) =>
                onChange("returningViewsPercentage", event.target.value)
              }
            ></input>
          </div>
        </div>

        <div className="form-group">
          <label>Bytes per returning view %</label>
          <div className={styles.parameter}>
            <input
              type="number"
              max="100"
              value={state.returningBytesPercentage}
              onChange={(event) =>
                onChange("returningBytesPercentage", event.target.value)
              }
            ></input>
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
      </div>
    </form>
  );
}
