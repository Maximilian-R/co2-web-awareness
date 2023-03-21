import { ScriptProps } from "next/script";

export default function Card({ children, className, style }: ScriptProps) {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
}
