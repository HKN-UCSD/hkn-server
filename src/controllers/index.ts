import { EventController } from './EventController';

export { EventController };

export const Controllers = [EventController];

export const ControllerContainer = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  get: (controller: any): any => new controller(),
};
