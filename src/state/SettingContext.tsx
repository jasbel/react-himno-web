import React, { ReactNode, useEffect, useState } from "react";
import useStorage from "../hooks/useStorage";
import { responsiveCalc } from "@/utils/responsive";

interface InitialValuesSetting {
  customFontSize: number | string;
  incrementFontSize: () => void;
  decrementFontSize: () => void;
}

const defaultValue: InitialValuesSetting = {
  customFontSize: responsiveCalc(50, 24),
  incrementFontSize: () => {},
  decrementFontSize: () => {},
};

const unitFontSize = 3;

export const SettingContext = React.createContext<InitialValuesSetting>(defaultValue);

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const {setItem, getItem} = useStorage()
  const [customFontSize, setCustomFontSize] = useState(defaultValue.customFontSize);

  const getInitialSetting = async () => {
    const fz =await getItem("@customFontSize");
    if (fz) setCustomFontSize(parseInt(fz));
  }

  const changeFontSize = (unit: number) => {
    const newFontSize = responsiveCalc(50+ unit, 24+ unit);
    console.log({newFontSize})
    setCustomFontSize(newFontSize);
  }

   const incrementFontSize = async () => {
    const fz =await getItem("@customFontSize") ;
    const newFz = parseInt(fz||'12')+unitFontSize;
    setItem("@customFontSize",`${newFz}`);
    changeFontSize(newFz);
  };

  const decrementFontSize = async () => {
    const fz =await getItem("@customFontSize") ;
    const newFz = (parseInt(fz||'12') || 12)-unitFontSize;
    setItem("@customFontSize",`${newFz}`);
    changeFontSize(newFz);
  };

  useEffect(() => {
    getInitialSetting()
  }, [])
  

  return (
    <SettingContext.Provider value={{ customFontSize, incrementFontSize, decrementFontSize }}>
      {children}
    </SettingContext.Provider>
  );
};
