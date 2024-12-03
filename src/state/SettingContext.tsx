import React, { ReactNode, useEffect, useState } from "react";
import useStorage from "../hooks/useStorage";
import { responsive } from "../res/responsive";

interface InitialValuesSetting {
  customFontSize: number | string;
  incrementFontSize: () => void;
  decrementFontSize: () => void;
}

const defaultValue: InitialValuesSetting = {
  customFontSize: responsive(50, 24),
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
    const newFontSize = responsive(50+ unit, 24+ unit);
    console.log({newFontSize})
    setCustomFontSize(newFontSize);
    setItem("@customFontSize", newFontSize.toString());
  }

  const incrementFontSize = () => {
    changeFontSize(unitFontSize);
  };

  const decrementFontSize = () => {
    changeFontSize(-unitFontSize);
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
