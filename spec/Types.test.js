"use strict";
describe("Basic properties of JS types", () => {

    describe("Behavior of `typeof`", () => {
        it("returns 'number' for numbers", () => {
            expect(typeof 42).toBe("number");
        });
        it("returns 'string' for string", () => {
            expect(typeof "42").toBe("string");
        });
        it("returns 'boolean' for booleans", () => {
            expect(typeof true).toBe("boolean");
            expect(typeof false).toBe("boolean");
        });
        it("returns 'object' for objects", () => {
            expect(typeof {}).toBe("object");
        });
        it("returns 'undefined' for `undefined`", () => {
            expect(typeof undefined).toBe("undefined");
        });
        it("returns 'symbol' for symbols", () => {
            expect(typeof Symbol()).toBe("symbol");
        });
        it("returns 'object' for `null` (one of javascript's bugs!!!)", () => {
            expect(typeof null).toBe("object");
        });
        it("returns 'function' for functions", () => {
            expect(typeof function () {
            }).toBe("function");
        });
        it("returns 'object' for arrays", () => {
            expect(typeof [1, 2, 3]).toBe("object");
        });
    });

    describe("undefined vs. undeclared variables", () => {
        it("typeof an undeclared variable is 'undefined'", () => {
            expect(typeof a).toBe("undefined");
        });
        it("typeof a declared but undefined variable is 'undefined'", () => {
            let a;
            expect(typeof a).toBe("undefined");
        });
        it("referencing an undeclared variable results in a ReferenceError", () => {
            expect(function () {
                b
            }).toThrowError(ReferenceError);
        });
    });

    describe("Falsy values", () => {
        it("false", () => {
            expect(false).toBeFalsy();
        });
        it("+0", () => {
            expect(+0).toBeFalsy();
        });
        it("-0", () => {
            expect(-0).toBeFalsy();
        });
        it("NaN", () => {
            expect(NaN).toBeFalsy();
        });
        it("'' (i.e., empty strings)", () => {
            expect('').toBeFalsy();
        });
        it("null", () => {
            expect(null).toBeFalsy();
        });
        it("undefined", () => {
            expect(undefined).toBeFalsy();
        });
        it("document.all (legacy browser detection tool, willful violation of ECMA Standard to be compatible)", () => {
            expect(document.all).toBeFalsy();
        });
    });

    describe("Truthy values (i.e., any value that's not falsy)", () => {
        it("true", () => {
            expect(true).toBeTruthy();
        });
        it("1", () => {
            expect(1).toBeTruthy();
        });
        it("non-empty strings", () => {
            expect('0').toBeTruthy();
            expect("abc").toBeTruthy();
        });
        it("arrays (empty or not)", () => {
            expect([]).toBeTruthy();
            expect([1, 2, 3]).toBeTruthy();
        });
        it("objects", () => {
            expect({}).toBeTruthy();
        });
        it("functions", () => {
            expect(function () {
            }).toBeTruthy();
        });
        it("symbols", () => {
            expect(Symbol()).toBeTruthy();
        });
    });

    describe("How to test if value is a null value", () => {
        const a = null;
        it("can be directly compared against null using strict equality", () => {

            expect(a === null).toBeTruthy();
        });
        it("can be exploited that null is the only falsy value for which typeof returns 'object'", () => {
            expect(!a && typeof a === 'object').toBeTruthy();
        });
    });

    describe("NaN", () => {
        const a = NaN;
        it("is the only value that is not equal to itself", () => {
            expect(a !== a).toBeTruthy();
        });
        it("is possible to check for NaN exploiting self-unequality; preferred for pre ES6, but implicit", () => {
            expect(a !== a).toBeTruthy();
        });
        it("is possible to check for NaN using ES 6 Number.isNaN(); preferred as it is explicit", () => {
            expect(Number.isNaN(a)).toBeTruthy();
        });
        it("should be avoided to use isNaN() since it behaves strangely", () => {
            expect(isNaN(NaN)).toBeTruthy();
            expect(isNaN(undefined)).toBeTruthy();
            expect(isNaN({})).toBeTruthy();

            expect(isNaN(null)).toBeFalsy();
            expect(isNaN(true)).toBeFalsy();
            expect(isNaN(12.34)).toBeFalsy();
            expect(isNaN('')).toBeFalsy(); // type coercion to 0
            expect(isNaN(' ')).toBeFalsy(); // type coercion to 0
            expect(isNaN('123ABC')).toBeTruthy(); // type coercion using Number('123ABC') fails
            expect(isNaN('123')).toBeFalsy();
            expect(isNaN('123')).toBeFalsy();
            expect(isNaN('abc')).toBeTruthy(); // type coercion to number fails
            expect(isNaN(new Date())).toBeFalsy();
            expect(isNaN(new Date().toString())).toBeTruthy();
        });
    });

    describe('+0 and -0', () => {
        it('is not possible to distinguish +0 and -0 via equality comparison', () => {
            expect(+0 === -0).toBeTruthy();
        });
    });
});
