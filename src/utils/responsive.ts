export const { innerWidth: width } = window;


const widthScreen = innerWidth;

export const responsiveCalc = (maxValue: number, minValue: number, currentScreen: number = widthScreen, maxScreen = 1440, minScreen = 360) => {
    let currentValue;
    currentValue = (minValue + (maxValue - minValue) * (currentScreen - minScreen) / (maxScreen - minScreen));
    return `calc( ${minValue}px + (${maxValue} - ${minValue}) * ((100vw - ${minScreen}px) / (${maxScreen} - ${minScreen})))`;
};
