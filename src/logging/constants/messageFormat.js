import { tokenNames } from '../constants/index.js';

const { serviceName, serviceMethod, argumentsPassed } = tokenNames;

export const messageFormat = `Method - :method | Service - :${serviceName}; Method - :${serviceMethod}; Arguments: [:${argumentsPassed}] | :date[web]`;
