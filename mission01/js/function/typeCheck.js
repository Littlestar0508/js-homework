const typeOf = (data) =>
  Object.prototype.toString.call(data).slice(8, -1).toLowerCase();

const isString = (data) => typeOf(data) === 'string';
