import CalculatorHelper from '../helpers/Calculator.helper';

describe("Calculator.helper.js", () => {
    describe("parse", () => {
        it("Should split '10,wef4' by ',' and return ['10', 'wef4']", () => {
            const expected = ['10', 'wef4'];
            const result = CalculatorHelper.parse('10,wef4', ',');
            expect(typeof(result)).toBe('object');
            expect(result.length).toBe(2);
            expect(result).toStrictEqual(expected);
        });

        it("Should split '' by ',' and return ['']", () => {
            const expected = [''];
            const result = CalculatorHelper.parse('', ',');
            expect(typeof(result)).toBe('object');
            expect(result.length).toBe(1);
            expect(result).toStrictEqual(expected);
        });

        it("Should split '3d,34' by '' and return ['3', 'd', ',', '3', '4']", () => {
            const expected = ['3', 'd', ',', '3', '4'];
            const result = CalculatorHelper.parse('3d,34', '');
            expect(typeof(result)).toBe('object');
            expect(result.length).toBe(5);
            expect(result).toStrictEqual(expected);
        });
        
        it("Should split '1\\n2,3' by '\\n' and ',' and return ['1', '2', '3']", () => {
            const expected = ['1', '2', '3'];
            const delimiters = ["\\\\n", ","];
            const result = CalculatorHelper.parse('1\\n2,3', delimiters.join("|"));
            expect(typeof(result)).toBe('object');
            expect(result.length).toBe(3);
            expect(result).toStrictEqual(expected);
        });         

        it("Should throw error for non-string input", () => {
            const result = () => CalculatorHelper.parse(undefined, '54');
            expect(result).toThrowError("Invalid input. Parameters must both be strings.");
        });

        it("Should throw error for non-string delimiter", () => {
            const result = () => CalculatorHelper.parse('102,4', 2);
            expect(result).toThrowError("Invalid input. Parameters must both be strings.");
        });
    });

    describe("isValidNumber", () => {
        it("Should return 34 for input '34'", () => {
            const expected = 34;
            const result = CalculatorHelper.isValidNumber('34');
            expect(typeof(result)).toBe('number');
            expect(result).toStrictEqual(expected);
        });

        it("Should return -8 for input '-8'", () => {
            const expected = -8;
            const result = CalculatorHelper.isValidNumber('-8');
            expect(typeof(result)).toBe('number');
            expect(result).toStrictEqual(expected);
        });

        it("Should return 0 for input '!2d'", () => {
            const expected = 0;
            const result = CalculatorHelper.isValidNumber('!2d');
            expect(typeof(result)).toBe('number');
            expect(result).toStrictEqual(expected);
        });

        it("Should return 0 for non-string input undefined", () => {
            const expected = 0;
            const result = CalculatorHelper.isValidNumber(undefined);
            expect(typeof(result)).toBe('number');
            expect(result).toStrictEqual(expected);
        });
        
        it("Should return 0 for input ''", () => {
            const expected = 0;
            const result = CalculatorHelper.isValidNumber('');
            expect(typeof(result)).toBe('number');
            expect(result).toStrictEqual(expected);
        });

        it("Should return 0 for input '1001'", () => {
            const expected = 0;
            const result = CalculatorHelper.isValidNumber("1001");
            expect(typeof(result)).toBe('number');
            expect(result).toStrictEqual(expected);
        });

        it("Should return 1000 for input '1000'", () => {
            const expected = 1000;
            const result = CalculatorHelper.isValidNumber("1000");
            expect(typeof(result)).toBe('number');
            expect(result).toStrictEqual(expected);
        });
    });

    describe("getEquation", () => {
        it("Should return '10 + 0' when valuesEntered is [10]", () => {
            const expected = "10 + 0";
            const value = 10, equation = "", valuesEntered = [10], index = 0;
            const result = CalculatorHelper.getEquation(value, equation, valuesEntered, index);
            expect(result).toStrictEqual(expected);
        });

        it("Should return '10 + 20 + ' when valuesEntered is [10, 20, 30] and index is 1", () => {
            const expected = "10 + 20 + ";
            const value = 20, equation = "10 + ", valuesEntered = [10, 20, 30], index = 1;
            const result = CalculatorHelper.getEquation(value, equation, valuesEntered, index);
            expect(result).toStrictEqual(expected);
        });

        it("Should return '10 + 20 + 30 ' when valuesEntered is [10, 20, 30] and index is 2", () => {
            const expected = "10 + 20 + 30";
            const value = 30, equation = "10 + 20 + ", valuesEntered = [10, 20, 30], index = 2;
            const result = CalculatorHelper.getEquation(value, equation, valuesEntered, index);
            expect(result).toStrictEqual(expected);
        });

        it("Should throw error for non-number value", () => {
            const expected = "Invalid parameters. Parameters must be: {value: number, equation: string, valuesEntered: array, index: number}.";
            const value = "20", equation = "10 + ", valuesEntered = [10, 20, 30], index = 1;
            const result = () => CalculatorHelper.getEquation(value, equation, valuesEntered, index);
            expect(result).toThrowError(expected);
        });

        it("Should throw error for non-string equation", () => {
            const expected = "Invalid parameters. Parameters must be: {value: number, equation: string, valuesEntered: array, index: number}.";
            const value = 20, equation = 10, valuesEntered = [10, 20, 30], index = 1;
            const result = () => CalculatorHelper.getEquation(value, equation, valuesEntered, index);
            expect(result).toThrowError(expected);
        });

        it("Should throw error for non-array valuesEntered", () => {
            const expected = "Invalid parameters. Parameters must be: {value: number, equation: string, valuesEntered: array, index: number}.";
            const value = 20, equation = "10 + ", valuesEntered = undefined, index = 1;
            const result = () => CalculatorHelper.getEquation(value, equation, valuesEntered, index);
            expect(result).toThrowError(expected);
        });

        it("Should throw error for non-number index", () => {
            const expected = "Invalid parameters. Parameters must be: {value: number, equation: string, valuesEntered: array, index: number}.";
            const value = 20, equation = "10 + ", valuesEntered = [10, 20, 30], index = undefined;
            const result = () => CalculatorHelper.getEquation(value, equation, valuesEntered, index);
            expect(result).toThrowError(expected);
        });
    });

    describe("getNegativeNumbers", () => {
        it("Should return false for 2", () => {
            const expected = false;
            const value = 2, negativeNumbersFound = [], index = 0, valuesEntered = [2, 20, 30];
            const result = CalculatorHelper.getNegativeNumbers(value, negativeNumbersFound, 
                index, valuesEntered);
            expect(result).toEqual(expected);
        });

        it("Should return false for 0", () => {
            const expected = false;
            const value = 0, negativeNumbersFound = [], index = 1, valuesEntered = [1, 0];
            const result = CalculatorHelper.getNegativeNumbers(value, negativeNumbersFound, 
                index, valuesEntered);
            expect(result).toBe(expected);
        });

        it("Should return true for -5, negativeNumbersFound should be length of 2", () => {
            const expected = true;
            const value = -5, negativeNumbersFound = [-4], index = 0, valuesEntered = [-5, 20, 30];
            const result = CalculatorHelper.getNegativeNumbers(value, negativeNumbersFound, 
                index, valuesEntered);
            expect(result).toBe(expected);
            expect(negativeNumbersFound).toHaveLength(2);
        });

        it("Should throw error for invalid value param", () => {
            const expected = "Invalid parameters. Parameters must be: {value: number, negativeNumbersFound: array, index: number, valuesEntered: array}.";
            const value = "", negativeNumbersFound = [-4], index = 0, valuesEntered = [-5, 20, 30];
            const result = () => CalculatorHelper.getNegativeNumbers(value, negativeNumbersFound, 
                index, valuesEntered);
            expect(result).toThrowError(expected);
        });

        it("Should throw error for final index being negative", () => {
            const expected = "Negative numbers found. -4 -30";
            const value = -30, negativeNumbersFound = [-4], index = 2, valuesEntered = [10, 20, -30];
            const result = () => CalculatorHelper.getNegativeNumbers(value, negativeNumbersFound, 
                index, valuesEntered);
            expect(result).toThrowError(expected);
        });

        it("Should throw error for final index being positive", () => {
            const expected = "Negative numbers found. -4";
            const value = 20, negativeNumbersFound = [-4], index = 1, valuesEntered = [10, 20];
            const result = () => CalculatorHelper.getNegativeNumbers(value, negativeNumbersFound, 
                index, valuesEntered);
            expect(result).toThrowError(expected);
        });
    });

    describe("setCustomDelimiter", () => {
        it("Should return substring 1,2\\3\n5 for custom delimiter \\ and have delimiters length 3", () => {
            const expectedDelimiters = ["\\\\n", ",", "\\\\"];
            const expectedSubstring = "1,2\\3\\n5";            
            // Value in UI wil be "//\\n1,2\3\n5"
            const inputValue = "//\\\\n1,2\\3\\n5", delimiters = ["\\\\n", ","]; 
            const result = CalculatorHelper.setCustomDelimiter(inputValue, delimiters);
            expect(result).toEqual(expectedSubstring);
            expect(delimiters).toEqual(expectedDelimiters);
        });

        it("Should return inputValue for value //1,3 and not update delimiters", () => {
            const expectedDelimiters = ["\\\\n", ","];
            const expectedSubstring = "//1,3";            
            // Value in UI wil be "//1,3"
            const inputValue = "//1,3", delimiters = ["\\\\n", ","]; 
            const result = CalculatorHelper.setCustomDelimiter(inputValue, delimiters);
            expect(result).toEqual(expectedSubstring);
            expect(delimiters).toEqual(expectedDelimiters);
        });

        it("Should return inputValue for value //we\\n1,3we4 and not update delimiters", () => {
            const expectedDelimiters = ["\\\\n", ","];
            const expectedSubstring = "//we\\n1,3we4";            
            // Value in UI wil be "//we\n1,3we4"
            const inputValue = "//we\\n1,3we4", delimiters = ["\\\\n", ","]; 
            const result = CalculatorHelper.setCustomDelimiter(inputValue, delimiters);
            expect(result).toEqual(expectedSubstring);
            expect(delimiters).toEqual(expectedDelimiters);
        });

        it("Should throw error invalid param", () => {
            const expected = "Invalid parameters. Parameters must be: {inputValue: string, delimiters: array}.";
            const inputValue = undefined, delimiters = ["\\\\n", ","];
            const result = () => CalculatorHelper.setCustomDelimiter(inputValue, delimiters);
            expect(result).toThrowError(expected);
        });
    });
});