import { SexPipe } from './sex.pipe';

describe('SexPipe', () => {
  it('create an instance', () => {
    const pipe = new SexPipe();
    expect(pipe).toBeTruthy();
  });

  it('should convert to м/ж', () => {
    const pipe = new SexPipe();
    expect(pipe.transform(0)).toBe('ж');
    expect(pipe.transform(1)).toBe('м');
  });

  it('should throw an error', () => {
    const pipe = new SexPipe();
    expect(
      () => {
        pipe.transform(2);
      }
    ).toThrowError('Input should be only 0 or 1');
  });
});
