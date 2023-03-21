import { PropsWithChildren } from "react";

export default function Highlight({ children }: PropsWithChildren) {
  return <span className="highlight">{children}</span>;
}
