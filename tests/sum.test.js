const lib = require('../sum.js');

describe('Summation of',()=>{
    test('1 and 3 should be 4', ()=>{
        const result = lib(1,3);
        expect(result).toBe(4);
    })
})