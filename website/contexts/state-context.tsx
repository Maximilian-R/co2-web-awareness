import { IReport } from "@/hooks/useCO2";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export interface IState {
  state: IReport | undefined;
  setState: Dispatch<SetStateAction<IReport | undefined>>;
}

export const StateContext = createContext<IState>({} as IState);

export function StateContextProvider({ children }: any) {
  const [state, setState] = useState<IReport>();

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
}
