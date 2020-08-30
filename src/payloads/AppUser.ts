import {
  IsEnum,
  IsInt,
  IsString,
  IsEmail,
  IsInstance,
  IsDateString,
  IsOptional,
  ValidateNested,
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

export class AppUserRolesResponse {
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
  inductionClass: AppUserInductionClass;
}

export class MultipleAppUserResponse {
  @ValidateNested({ each: true })
  @Type(() => AppUserResponse)
  appUsers: AppUserResponse[];
}
