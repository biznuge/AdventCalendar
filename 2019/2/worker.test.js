const worker = require('./worker.js');

test('check calculation for 2 ', () => {
    expect(calculate(2)).toBe(0)
    expect(calculate(8)).toBe(0)
    expect(calculate(9)).toBe(1)
    expect(calculate(12)).toBe(2)
    expect(calculate(14)).toBe(2)
    expect(calculate(1969)).toBe(654)
    expect(calculate(100756)).toBe(33583)

    expect(recursiveCalculate(1969)).toBe(966)
    expect(recursiveCalculate(100756)).toBe(50346)


});