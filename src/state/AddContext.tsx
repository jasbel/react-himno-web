import { initSong } from "@/res/constant";
import { ISong } from "@/types/types";
import { createContext, useState } from "react";

interface IAddContext {
    state: ISong,
    updateState: (newValues: Partial<ISong>) => void,
  }
 // @ts-ignore
export const AddContext = createContext<IAddContext>({
    // state: initAdd, updateState: () => {}
  });
  
  export const AddProvider = ({ children }: any) => {
    const [state, setState] = useState<ISong>(initSong);
  
    const updateState = (newValues: Partial<ISong>) => {
      setState(prevState => ({
        ...prevState,
        ...newValues
      }));
    };
  
    return (
      <AddContext.Provider value={{ state, updateState }}>
        {children}
      </AddContext.Provider>
    );
  };