import {
  IsEnum,
  IsInt,
  IsString,
  IsDateString,
  IsEmail,
  IsInstance,
  IsOptional,
  ValidateNested,
  IsBoolean,
} from 'class-validator';

import { AppUserRole } from '@Entities';
import { Type } from 'class-transformer';
import { AttendanceResponse } from './Attendance';

export class AppUserPKPayload {
  @IsInt()
  readonly id: number;
}

export class AppUserInductionClass {
  @IsString()
  quarter: string;
}

export class AppUserPostRequest {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  @IsOptional()
  readonly major: string;

  @IsString()
  @IsOptional()
  readonly graduationYear: string;

  @IsString()
  @IsOptional()
  readonly inductionClassQuarter: string;

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

  @IsString()
  @IsOptional()
  readonly preferredName: string;

  @IsString()
  @IsOptional()
  readonly pronoun: string;

  @IsString()
  @IsOptional()
  readonly customPronoun: string;

  @IsString()
  readonly infoSession: string;

  @IsBoolean()
  readonly courseRequirement: boolean;

  @IsBoolean()
  readonly newsletter: boolean;
}

export class InducteeSignupInfo {
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

  @IsString()
  @IsOptional()
  preferredName: string;

  @IsString()
  @IsOptional()
  pronoun: string;

  @IsString()
  @IsOptional()
  customPronoun: string;

  @IsString()
  infoSession: string;

  @IsBoolean()
  courseRequirement: boolean;

  @IsBoolean()
  newsletter: boolean;

  @IsEnum(AppUserRole)
  @IsOptional()
  role: string;

  @IsString()
  @IsOptional()
  inductionClassQuarter?: string;
}

export class AppUserInterviewAvailabilitiesRequest {
  @ValidateNested({ each: true })
  @Type(() => AppUserInterviewAvailability)
  availabilities: AppUserInterviewAvailability[];
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
  inductionClass?: AppUserInductionClass;

  @IsEnum(AppUserRole)
  role: string;

  @ValidateNested({ each: true })
  @Type(() => AppUserInterviewAvailability)
  @IsOptional()
  availabilities?: AppUserInterviewAvailability[];
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

  @ValidateNested({ each: true })
  @Type(() => AppUserInterviewAvailability)
  @IsOptional()
  availabilities?: AppUserInterviewAvailability[];
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

export class AppUserInducteePointsResponse {
  @IsInt()
  user: number;

  @IsInt()
  points: number;

  @IsBoolean()
  hasProfessionalRequirement: boolean;

  @IsBoolean()
  hasMentorshipRequirement: boolean;

  @ValidateNested({ each: true })
  @Type(() => AttendanceResponse)
  attendance: AttendanceResponse[];
}

export class AppUserMemberPointsResponse {
  @IsInt()
  user: number;

  @IsInt()
  points: number;
}

export class AppUserInterviewAvailability {
  @IsDateString()
  start: string;

  @IsDateString()
  end: string;
}
