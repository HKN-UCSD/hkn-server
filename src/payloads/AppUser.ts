import { IsEnum, IsInt, IsString, IsEmail } from 'class-validator';
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

  @IsString()
  readonly major: string;
}

// If this class is empty, then it won't be decorated by class-validator, which will break docs
export class AppUserEventRequest extends BaseAppUserPayload {
  @IsEmail()
  readonly email: string;
}

export class AppUserEventResponse extends BaseAppUserPayload {
  @IsEmail()
  email: string;

  @IsInt()
  id: number;

  @IsEnum(AppUserRole)
  role: string;
}
