import { useContext } from "react";
import { SettingContext } from "../state/SettingContext";

export const useSetting = () => {
  const {customFontSize, decrementFontSize, incrementFontSize} = useContext(SettingContext)
  console.log({customFontSize})
  return {customFontSize, decrementFontSize, incrementFontSize};
};
