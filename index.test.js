const LinearRegression = require('./index');

test('test', () => {
    const l = new LinearRegression()
    
    expect(l.fit(1,2)).toBe(1);
  });
