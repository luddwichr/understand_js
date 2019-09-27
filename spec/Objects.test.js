"use strict";

describe("Objects", () => {
	it("is possible to access object properties via dot (preferred) or bracket notation", () => {
		const obj = {a: 1, b: "test"};
		expect(obj.a).toBe(obj["a"]);
		expect(obj.b).toBe(obj["b"]);
	});

	it("is only possible to access a property containing spaces in its name by using bracket notation", () => {
		const obj = {"test test": true};
		expect(obj["test test"]).toBe(true);
	});

	it("is useful to use bracket notation if you want to access a property but the name is stored in a variable", () => {
		const obj = {a: 1, b: "test"};
		const b = "a";
		expect(obj[b]).toBe(1);
	});
});
