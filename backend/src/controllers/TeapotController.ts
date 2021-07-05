import { JsonController, Get, HttpCode } from 'routing-controllers';
import { LogMethod } from '@Decorators';
import { ENDPOINT_HANDLER } from '@Logger';

const teapotEndpointRoute = (ending: string) => {
  return `/api/teapot${ending}`;
};

@JsonController('/api/teapot')
export class TeapotController {
  @Get('/')
  @HttpCode(418)
  @LogMethod(ENDPOINT_HANDLER, 'info', 'Requested endpoint to get a teapot', {
    endpointRoute: teapotEndpointRoute('/'),
    method: 'GET',
  })
  async getEvent(): Promise<string> {
    return 'I am a teapot!';
  }
}

export const TeapotControllerImpl = new TeapotController();
