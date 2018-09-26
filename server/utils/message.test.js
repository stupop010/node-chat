const expect = require('expect');
let {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate correct messahe object', () => {
        let from = 'jen';
        let text = 'some text';
        let message = generateMessage(from,text);

    
        expect(message.from).toBeTruthy();
        expect(message.text).toBeTruthy();
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let lat = 1;
        let lon = 1;
        let from = 'stu';
        let location = generateLocationMessage(from, lat,lon);

        expect(location.createdAt).toBeA('number');
        expect(location.url).toEqual(`https://www.google.com/maps?q=1,1`)
    })
})