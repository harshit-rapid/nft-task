import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetNftsFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sort?: string;
}
