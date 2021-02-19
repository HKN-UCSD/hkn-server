import { JsonController, Get, HttpCode } from 'routing-controllers';

@JsonController('/api/teapot')
export class TeapotController {
  @Get('/')
  @HttpCode(418)
  async getEvent(): Promise<string> {
    return 'I am a teapot!';
  }
}

export const TeapotControllerImpl = new TeapotController();
