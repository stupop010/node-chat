const expect = require('expect');

const {isRealString} = require('./validation');

//import isRealString
describe('isRealString', () => {
    it('should reject non-string values', () => {
        let str = 123;
        let RealString = isRealString(str);

        expect(RealString).toBeFalsy();
    });

    it('should reject string with only space', () => {
        let str = '   '
        let realString = isRealString(str);

        expect(realString).toBeFalsy();
    });

    it('should allow string with non-space characters', () => {
        let str = 'test-catch'
        let realString = isRealString(str);

        expect(realString).toBeTruthy();
    })
});