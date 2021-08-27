import {
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

import { AppUserResponse } from './AppUser';

export class InductionClassRequest {
  @IsString()
  readonly quarter: string;

  @IsString()
  readonly name: string;

  @IsDateString()
  readonly startDate: string;

  @IsDateString()
  readonly endDate: string;

  @IsDateString({}, { each: true })
  @IsOptional()
  readonly interviewDates?: string[];
}

export class InductionClassUpdateRequest {
  @IsString()
  readonly name: string;

  @IsDateString()
  readonly startDate: string;

  @IsDateString()
  readonly endDate: string;

  @IsDateString({}, { each: true })
  @IsOptional()
  readonly interviewDates?: string[];
}

export class InductionClassResponse {
  @IsString()
  quarter: string;

  @IsString()
  name: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsDateString({}, { each: true })
  @IsOptional()
  interviewDates?: string[];

  @ValidateNested({ each: true })
  @Type(() => AppUserResponse)
  @IsOptional()
  affiliates?: AppUserResponse[];
}

export class MultipleInductionClassResponse {
  @ValidateNested({ each: true })
  @Type(() => InductionClassResponse)
  inductionClasses: InductionClassResponse[];
}

export class MultipleInductionClassQuery {
  @IsInt()
  @IsOptional()
  startYear: number;

  @IsInt()
  @IsOptional()
  endYear: number;

  @IsBoolean()
  @IsOptional()
  showAffiliates: boolean;
}
