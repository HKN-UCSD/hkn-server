import { EventController, EventControllerImpl } from './EventController';
import { UserController, UserControllerImpl } from './UserController';
import { AuthController, AuthControllerImpl } from './AuthController';
import { TeapotController, TeapotControllerImpl } from './TeapotController';
import { InductionClassController, InductionClassControllerImpl } from './InductionClassController';

export const controllers = [
  EventController,
  UserController,
  AuthController,
  TeapotController,
  InductionClassController,
];

// map from name of controller to an instance
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const controllerMap: Map<string, any> = new Map<string, any>();
controllerMap.set(EventController.name, EventControllerImpl);
controllerMap.set(UserController.name, UserControllerImpl);
controllerMap.set(AuthController.name, AuthControllerImpl);
controllerMap.set(TeapotController.name, TeapotControllerImpl);
controllerMap.set(InductionClassController.name, InductionClassControllerImpl);

export const ControllerContainer = {
  // controller here is just a class and all classes have names in ts
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(controller: { name: string }): any {
    return controllerMap.get(controller.name);
  },
};
