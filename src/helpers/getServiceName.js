export const getServiceName = service => {
  return service?.prototype?.constructor?.name;
};
