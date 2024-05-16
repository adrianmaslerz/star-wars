import { minCollectionLength } from './min-collection-length';

describe('minCollectionLength', () => {
  it('should return false when value is over given min', () => {
    const result = minCollectionLength(3).validator(new Array(2).fill(null));

    expect(result).toBe(false);
  });
  it('should return true when value is under given min', () => {
    const result = minCollectionLength(1).validator(new Array(2).fill(null));

    expect(result).toBe(true);
  });
});
