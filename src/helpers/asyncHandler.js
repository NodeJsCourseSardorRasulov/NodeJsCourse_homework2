export const asyncHandler = fn => {
  return (req, res, next) => {
    return Promise
      .resolve(fn(req, res))
      .catch(next);
  };
};
