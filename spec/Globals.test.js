"use strict";

describe("Globally available functions", () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    it("is possible to delay execution of a function with `setTimeout(callback, ms)`", (done) => {
        let timeToWait = 200;
        let x = 0;

        setTimeout(() => {
            x = 5;
            done();
        }, timeToWait);

        jest.advanceTimersByTime(timeToWait);

        expect(x).toBe(5);
        done();
    });
});
