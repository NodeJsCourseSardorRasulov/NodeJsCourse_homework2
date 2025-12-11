import { tokenNames } from '../constants/index.js';
import { getClassName } from './getClassName.js';

const { serviceName, serviceMethod, argumentsPassed } = tokenNames;

export const getTokensConfig = () => ([
  {
    name: serviceName,
    tokenCallback(_, res) {
      return res.serviceName;
    }
  },
  {
    name: serviceMethod,
    tokenCallback(_, res) {
      return res.serviceMethod;
    }
  },
  {
    name: argumentsPassed,
    tokenCallback(_, res) {
      const stringifiedArgs = res.argumentsPassed?.map(arg => typeof arg === 'object' ? getClassName(arg) : arg).filter(arg => arg);

      return stringifiedArgs?.length ? stringifiedArgs?.join(', ') : '';
    }
  }
]);
