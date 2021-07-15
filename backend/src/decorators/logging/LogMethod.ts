import { logger, AdditionalLogContent, isLogLevel, ENDPOINT_HANDLER } from '@Logger';

interface MethodTypes {
  [key: number]: string;
}

const methodTypes: MethodTypes = {
  0: 'genericMethod',
  1: 'serviceMethod',
  2: 'endpointHandler',
  3: 'mapperMethod',
};

const isValidMethodType = (methodType: number) => {
  return Object.keys(methodTypes).includes(methodType.toString());
};

export function LogMethod(
  methodType: number,
  level: string,
  message: string,
  moreLogContent: AdditionalLogContent
) {
  return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!isValidMethodType(methodType)) {
      throw new Error(
        `Invalid method type "${methodType}" for @LogMethod decorator in ${propertyKey}`
      );
    } else if (!isLogLevel(level)) {
      throw new Error(`Invalid log level "${level}" for @LogMethod decorator in ${propertyKey}`);
    }

    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
      const logContent = {
        ...moreLogContent,
        calledMethod: propertyKey,
        methodType: methodTypes[methodType],
        params: args,
      };
      logger.log(level, message, logContent);

      const result = originalMethod.apply(this, args);

      return result;
    };

    return descriptor;
  };
}
