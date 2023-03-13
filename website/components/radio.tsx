import { useState } from "react";
import styles from "@/styles/Radio.module.css";

export interface IRadio {
  name: string;
  items: string[];
  onChange: (value: string) => void;
}

export default function Radio({ name, items, onChange }: IRadio) {
  const [state, setState] = useState(items[0]);

  const _onChange = (event: any) => {
    setState(event.target.value);
    onChange(event.target.value);
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
            onChange={_onChange}
          ></input>
          <span>{item}</span>
        </label>
      ))}
    </div>
  );
}
