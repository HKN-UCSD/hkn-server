import { IsInt, IsString, IsEmail } from 'class-validator';

export class AppUserPKPayload {
  @IsInt()
  readonly id: number;
}

abstract class BaseAppUserPayload {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly major: string;
}

export class AppUserEventRequest extends BaseAppUserPayload {}
