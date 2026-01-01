import { defaultSize } from "./constant";

export const { innerWidth: width } = window;

type TResponsive = (szMx: number, szMn: number, scrMax?: number, scrMin?: number, scrReal?: number) => number;
type TResponsiveStr = (szMx: number, szMn: number, scrMax?: number, scrMin?: number, scrReal?: number) => string;
export const responsive: TResponsive = (
  sizeMax,
  sizeMin,
  screenMax = defaultSize.widthMax,
  screenMin = defaultSize.widthMin,
  screenReal = width,
) => {
  // if (sizeMin === undefined) return sizeMax;
  const cWidth = sizeMin + ((sizeMax - sizeMin) * (screenReal - screenMin)) / (screenMax - screenMin);

  return cWidth;
};

const widthScreen = innerWidth;

export const responsiveCalc = (maxValue: number, minValue: number, currentScreen: number = widthScreen, maxScreen = 1440, minScreen = 360) => {
    let currentValue;
    currentValue = (minValue + (maxValue - minValue) * (currentScreen - minScreen) / (maxScreen - minScreen));
    return `calc( ${minValue}px + (${maxValue} - ${minValue}) * ((100vw - ${minScreen}px) / (${maxScreen} - ${minScreen})))`;
};

export const responsiveStr: TResponsiveStr = (
  sizeMax,
  sizeMin,
  screenMax = defaultSize.widthMax,
  screenMin = defaultSize.widthMin,
  screenReal = width,
) => {
  // if (sizeMin === undefined) return sizeMax;
  const cWidth = `calc(${sizeMin}px + (${sizeMax} - ${sizeMin}) * ((100vw - ${screenMin}px)) / (${screenMax} - ${screenMin}))`;

  return cWidth;
};