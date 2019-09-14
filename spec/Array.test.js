"use strict";

describe("Array features and gotchas", () => {
    it("is possible to get an array's length via the 'length' property", () => {
        const a = [1,2,3];
        expect(a.length).toBe(3);
    });

    it("is possible to access array fields that have not been set (undefined is then returned)", () => {
       const a = [1,2,3];
       expect(a[100]).toBeUndefined();
    });

    it("is not possible to compare array contents using == or ===," +
        " since arrays are objects and are passed by reference", () => {
       const a = [1,2,3];
       const b = [1,2,3];
       expect(a == b).toBeFalsy();
       expect(a === b).toBeFalsy();
    });

    it("should be avoided to use sparse arrays", () => {
        let a = [];
        a[2] = 'xyz';
        expect(a.length).toBe(3);
    });

    it("should be avoided to use non-numeric indices since they don't count into the length property" +
        " (and it's not how arrays are meant to be used anyways)", () => {
        let a = [];
        a['xyz'] = 1;
        expect(a.length).toBe(0);
    });

    it("should be avoided to use Array(x) to pre-size arrays", () => {
       let a = new Array(3);
       expect(a.length).toBe(3);
    });
});
