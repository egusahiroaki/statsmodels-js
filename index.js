const dot = require('./util');
const _ = require('lodash');


class LinearRegression {
    constructor(){    
    }

    fit(x,y) {
        const n = x.length

        const a = ((dot(x,y) - _.sum(y) * _.sum(x) / n) / 
            ( _.sum(_.map(x, (e)=>{ return e * e})) - _.sum(x)**2 / n ))

        const b = (_.sum(y) - a* _.sum(x)) / n
        return {
            coef: a,
            intercept: b
        }
    }
}

module.exports = LinearRegression