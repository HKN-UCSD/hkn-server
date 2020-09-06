import {
  IsEnum,
  IsInt,
  IsString,
  IsEmail,
  IsInstance,
  IsDateString,
  IsOptional,
  ValidateNested,
  IsBoolean,
} from 'class-validator';

import { AppUserRole } from '@Entities';
import { Type } from 'class-transformer';

export class AppUserPKPayload {
  @IsInt()
  readonly id: number;
}

export class AppUserInductionClass {
  @IsString()
  quarter: string;

  @IsString()
  name: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}

export class AppUserPostRequest {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly major: string;

  @IsString()
  readonly graduationYear: string;

  @IsInstance(AppUserInductionClass)
  @IsOptional()
  readonly inductionClass: AppUserInductionClass;

  @IsEnum(AppUserRole)
  @IsOptional()
  readonly role: string;
}

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

export class AppUserSignupRequest {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly major: string;

  @IsString()
  readonly graduationYear: string;

  @IsString()
  readonly password: string;
}

export class AppUserResponse {
  @IsInt()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  major: string;

  @IsString()
  graduationYear: string;

  @IsInstance(AppUserInductionClass)
  @IsOptional()
  inductionClass: AppUserInductionClass;

  @IsEnum(AppUserRole)
  role: string;
}

export class AppUserEventResponse {
  @IsInt()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  major: string;

  @IsEnum(AppUserRole)
  role: string;
}

export class AppUserProfileResponse {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  major: string;

  @IsString()
  graduationYear: string;

  @IsInstance(AppUserInductionClass)
  @IsOptional()
  inductionClass: AppUserInductionClass;

  @IsEnum(AppUserRole)
  role: string;
}

export class AppUserRolesResponse {
  @IsEnum(AppUserRole)
  role: string;
}

export class AppUserNameResponse {
  @IsInt()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class MultipleUserQuery {
  @IsBoolean()
  @IsOptional()
  officers: boolean;

  @IsBoolean()
  @IsOptional()
  names: boolean;
}

export class MultipleAppUserResponse {
  @ValidateNested({ each: true })
  @Type(() => AppUserResponse)
  users: AppUserResponse[];
}

export class MultipleUserNameResponse {
  @ValidateNested({ each: true })
  @Type(() => AppUserNameResponse)
  users: AppUserNameResponse[];
}
