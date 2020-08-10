import { IsInt } from 'class-validator';

export class AppUserPKPayload {
  @IsInt()
  readonly id: number;
}
