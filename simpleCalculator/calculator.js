function Calculator() {
    this.total = 0;
};


Calculator.prototype.add = function (number) {
    return this.total += number;
};

Calculator.prototype.subtract = function (number) {
    return this.total -= number;
};

Calculator.prototype.multiply = function (number) {
    return this.total *= number;
};

Calculator.prototype.divide = function (number) {
    if (number == 0) {
        throw new Error('Cannot divide by zero');
    }
    return this.total /= number;
};

Object.defineProperty(Calculator.prototype, 'version', {
    get: function () {
        return fetch('')
            .then(function (result) {
                return result.json();
            })
            .then(function (json) {
                return json.version;
            });
    },
    enumerable: true,
    configurable: true
});