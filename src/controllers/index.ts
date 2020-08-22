import { EventController, EventControllerImpl } from './EventController';

export const controllers = [EventController];

// map from name of controller to an instance
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const controllerMap: Map<string, any> = new Map<string, any>();
controllerMap.set(EventController.name, EventControllerImpl);

export const ControllerContainer = {
  // controller here is just a class and all classes have names in ts
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(controller: { name: string }): any {
    return controllerMap.get(controller.name);
  },
};
