import React, { ReactNode, useEffect, useState } from "react";
import useStorage from "../hooks/useStorage";
import { responsiveCalc } from "@/utils/responsive";

interface InitialValuesSetting {
  customFontSize: number | string;
  incrementFontSize: () => void;
  decrementFontSize: () => void;
}
const getFontCalc = (unit: number = 0) => {
  const custom = Math.pow(1.125, unit)
  const customFontSizeInit = responsiveCalc(22*custom, 16*custom)
  return customFontSizeInit
}


const defaultValue: InitialValuesSetting = {
  customFontSize: getFontCalc(),
  incrementFontSize: () => {},
  decrementFontSize: () => {},
};

const unitFontSize = 1;

export const SettingContext = React.createContext<InitialValuesSetting>(defaultValue);

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const {setItem, getItem} = useStorage()
  const [customFontSize, setCustomFontSize] = useState(defaultValue.customFontSize);

  const getInitialSetting = async () => {
    const fz =await getItem("@customFontSize");
    if (fz) setCustomFontSize(getFontCalc(parseInt(fz)));
  }

  const changeFontSize = (unit: number) => {
    const newFontSize = getFontCalc(unit);
    console.log("newFontsize", newFontSize, unit)
    setCustomFontSize(newFontSize);
  }

   const incrementFontSize = async () => {
    const fz =await getItem("@customFontSize") ;
    const newFz = parseInt(fz||'0')+unitFontSize;
    setItem("@customFontSize",`${newFz}`);
    changeFontSize(newFz);
  };

  const decrementFontSize = async () => {
    const fz =await getItem("@customFontSize") ;
    const newFz = Math.max(0, (parseInt(fz||'0') || 0)-unitFontSize);
    setItem("@customFontSize",`${newFz}`);
    changeFontSize(newFz);
  };

  useEffect(() => {
    getItem("@customFontSize").then(v => {
    console.log("getItem", v)

    })
    console.log("customFontSize", customFontSize)
    getInitialSetting()
  }, [])
  

  return (
    <SettingContext.Provider value={{ customFontSize, incrementFontSize, decrementFontSize }}>
      {children}
    </SettingContext.Provider>
  );
};
