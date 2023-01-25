export const sortUsers = (a, b) => {
  if (a.login > b.login) {
    return 1;
  }

  if (a.login < b.login) {
    return -1;
  }

  return 0;
};
