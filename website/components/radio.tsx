import { useEffect, useState } from "react";
import styles from "@/styles/Radio.module.css";

export interface IRadio {
  value: any;
  name: string;
  items: string[];
  onChange: (value: string) => void;
}

export default function Radio({ name, items, value, onChange }: IRadio) {
  const [state, setState] = useState(value);

  useEffect(() => {
    setState(value);
  }, [value]);

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
