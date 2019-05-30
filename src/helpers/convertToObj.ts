export const convertToObj= data => data.reduce((accumulator, currentValue) => {
    accumulator[currentValue.property] = currentValue.value;
    return accumulator;
}, {});
