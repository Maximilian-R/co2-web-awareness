import { IParameters } from "@/utility/co2";
import CountrySelector from "./country-selector";
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
    <form className="grid">
      <div>
        <div className="form-group">
          <label>Monthly views</label>
          <div>
            <input
              type="number"
              value={state.views}
              onChange={(event) => onChange("views", event.target.value)}
            ></input>
          </div>
        </div>

        <div className="form-group">
          <label>Bytes per request</label>
          <div>
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
          <div>
            <input
              type="number"
              min="0"
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
          <div>
            <input
              type="number"
              min="0"
              max="100"
              value={state.returningBytesPercentage}
              onChange={(event) =>
                onChange("returningBytesPercentage", event.target.value)
              }
            ></input>
          </div>
        </div>

        <div className="form-group">
          <label>Country - CO2g/kWh</label>
          <div>
            <CountrySelector
              value={state.intensity}
              onChange={(intensity) => onChange("intensity", intensity)}
            ></CountrySelector>
          </div>
        </div>
      </div>
    </form>
  );
}
