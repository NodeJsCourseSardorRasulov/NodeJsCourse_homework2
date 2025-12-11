import { getServiceName } from './getServiceName.js';
import { getFunctionName } from './getFunctionName.js';

export const attachServiceInfoToResponse = (res, service, method, argsPassed) => {
  res.serviceName = getServiceName(service);
  res.service = service;
  res.serviceMethod = getFunctionName(method);
  res.argumentsPassed = argsPassed;
};
