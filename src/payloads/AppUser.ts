import { IsInt, IsString, IsEmail, IsEnum } from 'class-validator';
import { AppUserRole } from '@Entities';

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

export class EventSignInRequest extends BaseAppUserPayload {}

export class EventSignInResponse {
  @IsInt()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  major: string;

  @IsEnum(AppUserRole)
  role: string;
}
