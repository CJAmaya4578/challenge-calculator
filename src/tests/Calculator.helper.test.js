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
});