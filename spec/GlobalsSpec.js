"use strict";

describe("Globally available functions", () => {
    it("is possible to delay execution of a function with `setTimeout(callback, ms)`", (done) => {
        jasmine.clock().install();

        let timeToWait = 200;
        let x = 0;

        setTimeout(() => {
            x = 5;
            done();
        }, timeToWait);

        jasmine.clock().tick(timeToWait);

        expect(x).toBe(5);
        done();
    });
});
