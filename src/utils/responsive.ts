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