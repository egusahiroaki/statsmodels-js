const dot = require('./util');

test('matrix dot', () => {
    const actual = dot([[1,0],[0,1]], [[4,1],[2,2]])
    const expected = [[4,1],[2,2]]
    expect(actual).toEqual(expected);
});
