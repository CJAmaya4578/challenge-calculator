/**
 * @description Takes a string input and splits the string by the stringDelimiter.
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
  * @description Takes a string input and returns an Int of the input if its a valid string 
  * representation of a number. Otherwise, 0 is returned
  * @param {string} input 
  */
const isNumber = (input) => {
    const numberRegEx = new RegExp(/^-?\d+$/);
    if (typeof(input) === "string" && numberRegEx.test(input)){
        return parseInt(input, 10);
    } 
    return 0;
}

export default {
    parse: parse,
    isNumber: isNumber
}
