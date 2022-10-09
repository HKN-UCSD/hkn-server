import { IsBoolean, IsInt, ValidateNested, IsEmail, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class InducteePointsResponse {
  @IsInt()
  user: number;

  @IsString()
  inductionClassQuarter: string;

  @IsEmail()
  email: string;

  @IsInt()
  points: number;

  @IsBoolean()
  hasProfessionalRequirement: boolean;

  @IsBoolean()
  hasMentorshipRequirement: boolean;

  @IsBoolean()
  hasTechnicalRequirement: boolean;

  @IsBoolean()
  hasSocialRequirement: boolean;
}

export class MultipleInducteePointsResponse {
  @ValidateNested({ each: true })
  @Type(() => InducteePointsResponse)
  inducteePoints: InducteePointsResponse[];
}
