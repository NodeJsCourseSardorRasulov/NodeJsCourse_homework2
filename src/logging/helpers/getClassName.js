export const getClassName = instance => {
  return Object.getPrototypeOf(instance).constructor.name;
};
