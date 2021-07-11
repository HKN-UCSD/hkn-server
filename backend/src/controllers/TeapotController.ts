import { JsonController, Get, HttpCode } from 'routing-controllers';
import { logEndpointHandler } from '@Logger';

const FILE_NAME = 'TeapotController.ts'; // For logging
const ROUTE_PREFIX = '/api/teapot';

@JsonController('/api/teapot')
export class TeapotController {
  @Get('/')
  @HttpCode(418)
  async getEvent(): Promise<string> {
    logEndpointHandler('getEvent', {}, FILE_NAME, `${ROUTE_PREFIX}/`, 'GET');
    return 'I am a teapot!';
  }
}

export const TeapotControllerImpl = new TeapotController();
