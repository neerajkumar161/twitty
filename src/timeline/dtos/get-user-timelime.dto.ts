import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetUserTimelineDto {
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page: number;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit: number;
}
