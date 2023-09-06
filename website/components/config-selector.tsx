export interface IConfigSelector {
  value: string;
  onChange: (value: string) => void;
}

export default function ConfigSelector({ value, onChange }: IConfigSelector) {
  const _onChange = (event: any) => {
    const value = event.target.value;
    if (value) onChange(value);
  };

  return (
    <select name="config-selector" onChange={_onChange} value={value}>
      <option key="mobile-config" value="mobile">
        Mobile
      </option>
      <option key="desktop-config" value="desktop">
        Desktop
      </option>
    </select>
  );
}
