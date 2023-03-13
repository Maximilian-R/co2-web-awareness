import styles from "@/styles/Parameters.module.css";
import { useState } from "react";

export default function Parameters({
  data = { views: 10000, bytes: 100000, country: "SE", returning: 25 },
}: any) {
  return (
    <div className={styles.parameters}>
      <div className={styles.parameter}>
        <label>Monthly views</label>
        <div>
          <input type="number" value={data.views}></input>
        </div>
      </div>

      <div className={styles.parameter}>
        <label>Bytes per request</label>
        <div>
          <input type="number" value={data.bytes}></input>
          <RadioGroup name="unit-radio" items={["KB", "MB", "GB"]}></RadioGroup>
        </div>
      </div>

      <div className={styles.parameter}>
        <label>Country</label>
        <div>
          <input value={data.country}></input>
        </div>
      </div>

      <div className={styles.parameter}>
        <label>Returning users</label>
        <div>
          <input type="number" max="100" value={data.returning}></input>
        </div>
      </div>
    </div>
  );
}

function RadioGroup({ name, items }: { name: string; items: any[] }) {
  const [state, setState] = useState(items[0]);

  const onChange = (event: any) => {
    setState(event.currentTarget.value);
  };

  return (
    <div className={styles.radioGroup}>
      {items.map((item) => (
        <label className={styles.radio} key={item}>
          <input
            type="radio"
            checked={item === state}
            name={name}
            value={item}
            onChange={onChange}
          ></input>
          <span>{item}</span>
        </label>
      ))}
    </div>
  );
}
