import { calculator } from './test';


describe('test', ()=>{
    it('should add 2 numbers', () => {
        const service = new calculator();
        expect(service.add(2,4)).toBe(6);
    });
});