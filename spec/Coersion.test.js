"use strict";

//  You can read section 11.9.3 of the ES5 specification, http://www.ecma-international.org/ecma-262/5.1/

/*
to help you know whether to use == or === in various situations, here are my simple rules:
• If either value (aka side) in a comparison could be the true or false value, avoid == and use ===.
• If either value in a comparison could be of these specific values (0, "", or []—empty array), avoid == and use ===.
• In all other cases, you’re safe to use ==. Not only is it safe, but in many cases it simplifies your code.
/*
The difference between == and === is usually characterized that == checks for value equality and === checks for both
value and type equality. However, this is inaccurate. The proper way to characterize them is that == checks for value
equality with coercion allowed, and === checks for value equality without allowing coercion; === is often called “strict
equality” for this reason. (You don't know JS: Up & Going, p. 37)
 */
describe("JavaScript's type coercion", () => {

	describe('ToString value conversion', () => {
		it('converts null to "null"', () => {
			expect(String(null)).toEqual('null');
		});

		it('converts undefined to "undefined"', () => {
			expect(String(undefined)).toEqual('undefined');
		});

		it('converts booleans to "true"|"false"', () => {
			expect(String(true)).toEqual('true');
			expect(String(false)).toEqual('false');
		});

		it('converts numbers in a natural way except for very small or large values', () => {
			expect(String(12)).toEqual('12');
			expect(String(.34)).toEqual('0.34');
			expect(String(12.34)).toEqual('12.34');
			expect(String(0.12345678901234568)).toEqual('0.12345678901234568');
			expect(String(1.2e-34)).toEqual('1.2e-34');
			expect(String(1.2e34)).toEqual('1.2e+34');
			expect(String(NaN)).toEqual('NaN');
			expect(String(Infinity)).toEqual('Infinity');
		});

		it('converts regular objects using default toString() to the internal [[Class]] name', () => {
			expect(String({})).toEqual("[object Object]");
		});

		it('converts regular objects using overwritten toString()', () => {
			const x = {
				toString() {
					return "hello"
				}
			};
			expect(String(x)).toEqual("hello");
		});

		it('converts arrays with an overridden toString() by concatenating its values with commas ' +
			'(null, undefined and empty arrays are empty strings, though!)', () => {
			expect(String([1.2, "test", undefined, null, true, [], NaN])).toEqual("1.2,test,,,true,,NaN");
		});

		it('is not possible to convert array entries with a Symbol value to a string', () => {
			expect(() => String([Symbol("test")])).toThrow(TypeError);
		});

		it('converts Date to an non-standardized string version', () => {
			// note: the string representation depends on your local machine's timezone settings
			expect(String(new Date(2019, 8, 27, 1, 2, 3, 4)).startsWith("Fri Sep 27 2019 01:02:03 GMT+")).toBeTruthy();
		});

		it('converts RegExp to their regular expression surrounded by slashes', () => {
			expect(String(new RegExp('[0-9]'))).toEqual("/[0-9]/");
		});

		it('converts Errors to their error type followed by its message ', () => {
			expect(String(new Error("test"))).toEqual("Error: test");
		});

		it('converts functions and closures by returning their content with indentation', () => {
			expect(String(function (a) {
				a()
			})).toEqual("function (a) {\n        a();\n      }");
			expect(String(() => {
			})).toEqual("() => {}");
		});

		it('converts symbol values to "Symbol(itsValue)"', () => {
			expect(String(Symbol("test"))).toEqual("Symbol(test)")
		});
	});
	
});
