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

	it('should contain a test?', () => {

	});
});
