import {
  IsInt,
  IsString,
  IsEmail,
  IsBoolean,
  IsEnum,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { AppUserRole, InductionClass } from '@Entities';
import { Type } from 'class-transformer';

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

  @IsEnum(AppUserRole)
  readonly role: string;

  @IsInt()
  @IsOptional()
  readonly graduationYear: number;

  @ValidateNested({ each: true })
  @Type(() => InductionClass)
  @IsOptional()
  readonly inductionClass: InductionClass;
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
