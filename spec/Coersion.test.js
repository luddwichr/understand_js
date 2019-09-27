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

	describe('JSON.stringify and its differences to ToString', () => {
		it('always results in values serialized as strings', () => {
			expect(JSON.stringify(42)).toEqual("42");
			expect(JSON.stringify(null)).toEqual("null");
			expect(JSON.stringify(true)).toEqual("true");
			expect(JSON.stringify([])).toEqual("[]");
			expect(JSON.stringify("42")).toEqual("\"42\"");

			expect(JSON.stringify([42, null, true, [], "42"]))
				.toEqual("[42,null,true,[],\"42\"]");
		});

		it('does not serialize "unsafe" values', () => {
			expect(JSON.stringify(undefined)).toEqual(undefined);
			expect(JSON.stringify(() => {
			})).toEqual(undefined);
			expect(JSON.stringify(Symbol("test"))).toEqual(undefined);
		});

		it('serializes "unsafe" values in arrays as "null"', () => {
			expect(JSON.stringify([1, undefined, () => {
			}, Symbol("test"), 5]))
				.toEqual("[1,null,null,null,5]");
		});

		it('only serializes "safe" object property values, putting double quotes around property names', () => {
			expect(JSON.stringify({
				a: 1, b: undefined, c: function () {
				}, d: Symbol("test"), e: []
			}))
				.toEqual("{\"a\":1,\"e\":[]}");
		});

		it('throws an error if an object as circular references in it', () => {
			const a = {};
			a.y = {x: a};
			expect(() => JSON.stringify(a)).toThrow(TypeError);
		});

		it('uses a toJSON() method for retrieving a JSON-safe version of an object, if present', () => {
			// note: toJSON() needs not return a stringification representation, but a "safe" object version
			const a = {secret: "don tell anyone!"};
			a.y = {x: a};
			a.toJSON = function () {
				return {y: 'has cycles!'}
			};
			expect(JSON.stringify(a)).toEqual("{\"y\":\"has cycles!\"}");
		});

		describe('optional second "replacer" argument to filter property names (recursively!)', () => {

			it('can be an array with property names that are eligible for serialization', () => {
				const a = {public: true, secret: "don tell anyone!", child: {secret: ""}};
				expect(JSON.stringify(a, ["public", "child"])).toEqual("{\"public\":true,\"child\":{}}");
			});

			it('can be a function taking a (key,value) pair, filtering out keys for which undefined is returned', () => {
				const a = {public: true, secret: "don tell anyone!"};
				expect(JSON.stringify(a, (key, value) => (key !== "secret") ? value : undefined))
					.toEqual("{\"public\":true}");
			});

			it('passes array indices as numbers for key parameter', () => {
				const a = {x: [1, 2, 3]};
				expect(JSON.stringify(a, (key, value) => (key !== "1") ? value : undefined))
					.toEqual("{\"x\":[1,null,3]}");
			});


			it('passes undefined as key parameter for object itself', () => {
				const a = {b: "test"};
				expect(JSON.stringify(a, (key, value) => (key) ? value : {c: "hi"}))
					.toEqual("{\"c\":\"hi\"}");
			});

		});

		describe('optional third "space" argument to indent JSON string', () => {
			it('can be a number to indent with up to 10 spaces', () => {
				expect(JSON.stringify({a: true}, null, 2)).toEqual("{\n  \"a\": true\n}");
			});

			it('can be a string to indent with the string a fill pattern', () => {
				expect(JSON.stringify({a: true}, null, '***')).toEqual("{\n***\"a\": true\n}");
			});
		});

	});

	describe('loose equality ==', () => {

		describe('string == number', () => {

			it('coerces string values using ToNumber()', () => {
				expect("42" == 42).toBeTruthy();
				expect("42" == 43).toBeFalsy();
			});
		});

		describe('* == Boolean', () => {

			it('coerces boolean values using ToNumber()', () => {
				expect("42" == true).toBeFalsy();
				expect("42" == false).toBeFalsy();
				expect("1" == true).toBeTruthy();
				expect(1 == true).toBeTruthy();
				expect([1] == true).toBeTruthy();
				expect("0" == false).toBeTruthy();
				expect(0 == false).toBeTruthy();
				expect([0] == false).toBeTruthy();
				expect(["0"] == false).toBeTruthy();
				expect([] == false).toBeTruthy();
			});

		});

	});
});
