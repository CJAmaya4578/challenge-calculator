/**
 * @description Splits a string input by the stringDelimiter and returns an array.
 * If non-string params are passed, an error is thrown for the invalid inputs.
 * @param {string} input 
 * @param {string} stringDelimiter 
 */ 
const parse = (input, stringDelimiter) => {    
    if (typeof(input) === "string" && typeof(stringDelimiter) === "string") {
        return input.split(stringDelimiter);
    } else {
        throw new Error("Invalid input. Parameters must both be strings.");
    }
}
 /**
  * @description Returns a number of the input if it is a valid string representation
  * of a number. Otherwise, 0 is returned
  * @param {string} input 
  */
const isNumber = (input) => {
    const numberRegEx = new RegExp(/^-?\d+$/);
    if (typeof(input) === "string" && numberRegEx.test(input)){
        return parseInt(input, 10);
    } 
    return 0;
}

/**
 * @description Returns a string representing the equation with the value 
 * added to the end. A '+' is added if there are more elements in the array. 
 * Else, if the valuesEntered array contains 1 item, a ' + 0' is added.
 * Throws error for invalid param types.
 * @param {number} value 
 * @param {string} equation 
 * @param {array} valuesEntered 
 * @param {number} index 
 */
const getEquation = (value, equation, valuesEntered, index) => {
    if (typeof(value) === "number" && typeof(equation) === "string"
        && Array.isArray(valuesEntered) && typeof(index) === "number") {
        equation = `${equation + value}`;
        if (index !== valuesEntered.length-1) {
            equation = `${equation} + `;
        } else if (index === 0){
            equation = `${equation} + 0`;
        }
        return equation;
    } else {
        throw new Error("Invalid parameters. Parameters must be: {value: number, equation: string, valuesEntered: array, index: number}.");
    }
}

export default {
    parse: parse,
    isNumber: isNumber,
    getEquation: getEquation,
}
