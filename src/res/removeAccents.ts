export const removeAccents = <T = string>(str: T) => {
    return `${str}`.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
};
