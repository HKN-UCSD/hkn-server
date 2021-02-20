import { IsBoolean, IsInt, ValidateNested, IsEmail, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class InducteePointsResponse {
  @IsInt()
  user: number;

  @IsEmail()
  email: string;

  @IsInt()
  points: number;

  @IsBoolean()
  hasProfessionalRequirement: boolean;

  @IsBoolean()
  hasMentorshipRequirement: boolean;

  @IsString()
  year: string;
}

export class MultipleInducteePointsResponse {
  @ValidateNested({ each: true })
  @Type(() => InducteePointsResponse)
  inducteePoints: InducteePointsResponse[];
}
