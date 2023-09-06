import { IOptions, IReport } from "@/hooks/useCO2";
import { INTENSITY_DATA_2021 } from "@/utility/intensity";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export interface IState {
  report: IReport | undefined;
  options: IOptions;
}
export interface IContextState {
  state: IState;
  setState: Dispatch<SetStateAction<IState>>;
}

export const StateContext = createContext<IContextState>({});

export function StateContextProvider({ children }: any) {
  const [state, setState] = useState<IState>({
    options: {
      url: "",
      intensity: INTENSITY_DATA_2021[0],
      config: "mobile",
    },
    report: undefined,
  });

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
}
