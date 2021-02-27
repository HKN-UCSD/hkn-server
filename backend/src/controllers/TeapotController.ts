import { JsonController, Get, HttpCode } from 'routing-controllers';
import logger from '@Logger';

@JsonController('/api/teapot')
export class TeapotController {
  @Get('/')
  @HttpCode(418)
  async getEvent(): Promise<string> {
    logger.log({
      level: 'info',
      message: 'teapot info',
      customTags: 'testing',
    });
    logger.log({
      level: 'debug',
      message: 'teapot info',
      customTags: 'testing',
    });
    return 'I am a teapot!';
  }
}

export const TeapotControllerImpl = new TeapotController();
