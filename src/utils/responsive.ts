import { defaultSize } from "./constant";

export const { innerWidth: width } = window;

type TResponsive = (szMx: number, szMn: number, scrMax?: number, scrMin?: number, scrReal?: number) => number;
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