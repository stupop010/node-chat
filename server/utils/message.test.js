const expect = require('expect');
let {generateMessage} = require('./message')

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