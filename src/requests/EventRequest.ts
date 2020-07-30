import {
  IsString,
  IsOptional,
  IsDateString,
  IsUrl,
  IsArray,
} from 'class-validator';

export class EventRequest {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsUrl()
  @IsOptional()
  rsvpURL: string;

  @IsUrl()
  @IsOptional()
  signInURL: string;

  @IsUrl()
  @IsOptional()
  fbURL: string;

  @IsUrl()
  @IsOptional()
  canvaURL: string;

  @IsArray()
  hosts: number[];
}
