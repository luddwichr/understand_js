"use strict";

class X {
    constructor(someAttribute = 0) {
        this.someAttribute = someAttribute;
    }

    doSomething() {
        return this.someAttribute;
    }
}

describe("Promises", () => {
    describe("Promise constructor", () => {
        it("takes a function as input that takes two optional parameters as input", (done) => {
            const promise = new Promise(function (resolve) {
                resolve(42);
            });
            promise.then((result) => result === 42 ? done() : done.fail()).catch(done.fail);
        });

        it("takes a function as input that takes two optional parameters as input", (done) => {
            const promise = new Promise(function (resolve, reject) {
                reject(42);
            });
            promise.then(() => done.fail()).catch((error) => error === 42 ? done() : done.fail()).catch(done.fail);
        });

        it("", (done) => {
            const x = new X();
            Promise.resolve()
                .then(x.doSomething)
                .then(done.fail)
                .catch((error) => {
                    expect(error instanceof TypeError).toBeTruthy();
                    done();
                })
                .catch(done.fail);
        });

        it("is possible to pass method references if you bind this to the owning object", (done) => {
            const someAttribute = 1;
            const x = new X(someAttribute);
            Promise.resolve()
                .then(x.doSomething.bind(x))
                .then((result) => result === someAttribute ? done() : done.fail())
                .catch(done.fail);
        });

        it("is best practice to use arrow functions for calling methods", (done) => {
            const someAttribute = 1;
            const x = new X(someAttribute);
            Promise.resolve()
                .then(() => x.doSomething())
                .then((result) => result === someAttribute ? done() : done.fail())
                .catch(done.fail);
        });

    });
});
