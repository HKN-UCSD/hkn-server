import { IsEnum, IsInt, IsString, IsEmail } from 'class-validator';
import { AppUserRole } from '@Entities';

export class AppUserPKPayload {
  @IsInt()
  readonly id: number;
}

// If this class is empty, then it won't be decorated by class-validator, which will break docs
export class AppUserEventRequest {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly major: string;
}

export class AppUserEventResponse {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  major: string;

  @IsInt()
  id: number;

  @IsEnum(AppUserRole)
  role: string;
}
