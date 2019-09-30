/**
 * @description Splits a string input by the stringDelimiter and returns an array.
 * If non-string params are passed, an error is thrown for the invalid inputs.
 * @param {string} input 
 * @param {string} stringDelimiter 
 */ 
const parse = (input, stringDelimiter) => {    
    if (typeof(input) === "string" && typeof(stringDelimiter) === "string") {
        const delimiterRegex = new RegExp(stringDelimiter, "g")        
        return input.split(delimiterRegex);
    } else {
        throw new Error("Invalid input. Parameters must both be strings.");
    }
}

/**
  * @description Returns a number of the input if it is a valid string representation
  * of a number and is less than or equal to 1000. Otherwise, 0 is returned
  * @param {string} input 
  */
const isValidNumber = (input) => {
    const numberRegEx = new RegExp(/^-?\d+$/);
    if (typeof(input) === "string" && numberRegEx.test(input)){
        const number = parseInt(input, 10);
        return (number <= 1000) ? number : 0;
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

/**
 * @description Pushes negative values to negativeNumbersFound array. Returns true if current value
 * is negative, fase otherwise. Throws error if valuesEntered array has been evaluated completely 
 * and at least one negative number was found. Throws error for invalid params.
 * @param {number} value 
 * @param {array} negativeNumbersFound 
 * @param {number} index 
 * @param {array} valuesEntered 
 */
const getNegativeNumbers = (value, negativeNumbersFound, index, valuesEntered) => {
    if (typeof(value) === "number" && Array.isArray(negativeNumbersFound) 
        && typeof(index) === "number" && Array.isArray(valuesEntered)) {
        if (value < 0) {
            negativeNumbersFound.push(value);
            if (index !== valuesEntered.length-1) {
                return true;
            }
        } 
        if (index === valuesEntered.length-1 && negativeNumbersFound.length > 0) {
            throw new Error(`Negative numbers found. ${negativeNumbersFound.join(" ")}`);
        }
        return false;
    } else {
        throw new Error("Invalid parameters. Parameters must be: {value: number, negativeNumbersFound: array, index: number, valuesEntered: array}.");
    }
}

/**
 * @description Adds custome delimiter to delimiters array. Returns substring of input value 
 * containig numbers only.
 * @param {string} inputValue 
 * @param {array} delimiters 
 */
const setCustomDelimiter = (inputValue, delimiters) => {
    if (typeof(inputValue) === "string" && Array.isArray(delimiters)){
        if (inputValue.startsWith("//[")) {
            const endOfCustomDelimiter = inputValue.indexOf("]\\n");
            if (endOfCustomDelimiter >= 0) {
                const escapeRegex = new RegExp(/[-[\]{}()*+?.,\\^$|#\s]/, "g");
                let customDelimiter = inputValue.substring(3, endOfCustomDelimiter);
                const newDelimiters = customDelimiter.split("][");
                newDelimiters.forEach((delimiter) => {
                    const escapedDelimiter = delimiter.replace(escapeRegex, "\\$&")
                    delimiters.push(escapedDelimiter);
                });
                return inputValue.substring(endOfCustomDelimiter + 3);
            }
        }
        return inputValue;
    } else {
        throw new Error("Invalid parameters. Parameters must be: {inputValue: string, delimiters: array}.");
    }
}

export default {
    parse: parse,
    isValidNumber: isValidNumber,
    getEquation: getEquation,
    getNegativeNumbers: getNegativeNumbers,
    setCustomDelimiter: setCustomDelimiter,
}
