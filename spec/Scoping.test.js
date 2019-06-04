"use strict";
describe("Scopes and Closures in JS", () => {
    it("is possible to access variables/functions before declaration due to hoisting", () => {
        var a = 2;
        foo(); // works because foo() declaration is "hoisted"
        function foo() {
            a = 3;
            expect(a).toBe(3);
            var a; // declaration is "hoisted" to the top of foo()
        }

        expect(a).toBe(2);
    });

    it("is possible to access variables/functions anywhere in that scope as well as any lower/inner scopes", () => {
        function foo() {
            var a = 1;

            function bar() {
                var b = 2;

                function baz() {
                    var c = 3;
                    expect(a + b + c).toBe(6);
                }

                baz();
                expect(a + b).toBe(3);
                expect(() => c).toThrowError(ReferenceError);
            }

            bar();
            expect(a).toBe(1);
            expect(() => b).toThrowError(ReferenceError);
            expect(() => c).toThrowError(ReferenceError);
        }

        foo();
    });

    it("is possible to use block scoping ({ .. })since ES6 using let/const", () => {
        let a = 0;
        {
            const c = 1;
            let b = 2;
            b += c;
            a += b + c;
        }
        expect(a).toBe(4);
        expect(() => b).toThrowError(ReferenceError);
        expect(() => c).toThrowError(ReferenceError);
    });

    it("is possible to prohibit creating variables in global scope by uisng `strict mode`", () => {
        "use strict"; // turn on strict mode (turned on in this file anyways...)
        expect(() => {
            a = 1; // `var` missing
        }).toThrowError(ReferenceError);
    });

});
