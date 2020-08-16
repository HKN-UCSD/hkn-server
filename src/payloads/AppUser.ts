import { IsInt, IsString, IsEmail } from 'class-validator';

export class AppUserPKPayload {
  @IsInt()
  readonly id: number;
}

export class BaseAppUserPayload {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly major: string;
}
