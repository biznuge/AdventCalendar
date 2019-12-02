const worker = require('./worker.js')

test('check calculations for 1 ', () => {
    expect(calculate(12)).toBe(2)
    expect(calculate(14)).toBe(2)
    expect(calculate(1969)).toBe(654)
    expect(calculate(100756)).toBe(33583)
})