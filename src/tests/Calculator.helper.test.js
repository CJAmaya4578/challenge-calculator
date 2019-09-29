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

        it("Should throw error for non-string input", () => {
            const result = () => CalculatorHelper.parse(undefined, '54');
            expect(result).toThrowError("Invalid input. Parameters must both be strings.");
        });

        it("Should throw error for non-string delimiter", () => {
            const result = () => CalculatorHelper.parse('102,4', 2);
            expect(result).toThrowError("Invalid input. Parameters must both be strings.");
        });
    });

    describe("isNumber", () => {
        it("Should return 34 for input '34'", () => {
            const expected = 34;
            const result = CalculatorHelper.isNumber('34');
            expect(typeof(result)).toBe('number');
            expect(result).toStrictEqual(expected);
        });

        it("Should return -8 for input '-8'", () => {
            const expected = -8;
            const result = CalculatorHelper.isNumber('-8');
            expect(typeof(result)).toBe('number');
            expect(result).toStrictEqual(expected);
        });

        it("Should return 0 for input '!2d'", () => {
            const expected = 0;
            const result = CalculatorHelper.isNumber('!2d');
            expect(typeof(result)).toBe('number');
            expect(result).toStrictEqual(expected);
        });

        it("Should return 0 for non-string input undefined", () => {
            const expected = 0;
            const result = CalculatorHelper.isNumber(undefined);
            expect(typeof(result)).toBe('number');
            expect(result).toStrictEqual(expected);
        });
        
        it("Should return 0 for input ''", () => {
            const expected = 0;
            const result = CalculatorHelper.isNumber('');
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
});