const compose = (...functions) => (component) => {
  return functions.reduceRight((prev, func) => func(prev), component);
};

export default compose;
