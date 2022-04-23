
export const widthScreen = innerWidth;

export const responsive = (maxValue: number, minValue: number, currentScreen: number = widthScreen, maxScreen = 1440, minScreen = 360) => {

    let currentValue;

    currentValue = (minValue + (maxValue - minValue) * (currentScreen - minScreen) / (maxScreen - minScreen));

    return currentValue;
};

export const percent = (valuePercent: number) => {
    return widthScreen * valuePercent / 100;
};
