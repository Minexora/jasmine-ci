describe('Calculator.js', function () {
    describe('Calculator', function () {
        let calculator, calculator2;

        beforeEach(function () {
            calculator = new Calculator();
            calculator2 = new Calculator();
        });

        afterEach(function () {

        });

        it('should initialize the total', function () {
            expect(calculator.total).toBe(0);
        });

        it('can be instantiated', function () {
            jasmine.addMatchers(CustomMatchers);

            expect(calculator).toBeCalculator();
            expect(2).not.toBeCalculator();
            expect(calculator).toBeTruthy();
            expect(calculator2).toBeTruthy();
            expect(calculator).toEqual(calculator2);
            expect(calculator.constructor.name).toContain("Calc");
        });

        xit('instantiates unique object', function () {
            expect(calculator).not.toEqual(calculator2);
        });

        it('has common operations', function () {
            expect(calculator.add).toBeDefined();
            expect(calculator.subtract).not.toBeUndefined();
            expect(calculator.multiply).not.toBeUndefined();
            expect(calculator.divide).not.toBeUndefined();
        });

        it('can overwrite total', function () {
            calculator.total = null;

            expect(calculator.total).toBeNull();
        });

        describe('add()', function () {
            it('should add numbers to total', function () {
                calculator.add(5);

                expect(calculator.total).toBe(5);
            });

            it('returns total', function () {
                calculator.total = 50;

                expect(calculator.add(20)).toBe(70);
                expect(calculator.total).toMatch(/-?\d+/);
                expect(typeof calculator.total).toMatch('number');
                expect(calculator.total).toBeNumber();
                expect(calculator.total).toEqual(jasmine.anything());
            });
        });

        describe('subtract()', function () {
            it('should subtract numbers from total', function () {
                calculator.total = 30;
                calculator.subtract(5);

                expect(calculator.total).toBe(25);
            });
        });

        describe('multiply()', function () {
            it('should multiply total by number', function () {
                calculator.total = 100;
                calculator.multiply(2);

                expect(calculator.total).toBe(200);
            });

            it('does not handle NaN', function () {
                calculator.total = 20;
                calculator.multiply('a');

                expect(calculator.total).toBeNaN();
            });
        });

        describe('divide()', function () {
            it('should divide total by number', function () {
                calculator.total = 200;
                calculator.divide(2);

                expect(calculator.total).toBe(100);
            });

            it('handles divide by zero', function () {
                expect(function () { calculator.divide(0) }).toThrow();
                expect(function () { calculator.divide(0) }).toThrowError(Error);
                expect(function () { calculator.divide(0) }).toThrowError(Error, 'Cannot divide by zero');
            });
        });

        describe('get version', function () {
            it('fetches version from external source', async function (done) {
                spyOn(window, 'fetch').and.returnValue(Promise.resolve(
                    new Response('{ "version": "0.1"}')
                ));

                const version = await calculator.version;
                expect(version).toBe('0.1');

                done();

            });
        });
    });
});