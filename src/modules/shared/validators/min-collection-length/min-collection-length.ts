export const minCollectionLength = function (min: number) {
  return {
    validator: function (value: any[]) {
      return value.length >= min;
    },
    message:
      '{PATH} should have minimum ' +
      min +
      ' ' +
      (min !== 1 ? 'elements' : 'element'),
  };
};
