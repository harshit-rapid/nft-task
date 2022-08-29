import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetNftsFilterDto {
  @IsOptional()
  @IsString()
  contract_address?: string;

  @IsOptional()
  @IsNumber()
  token_id?: number;

  @IsOptional()
  @IsString()
  owner_address?: string;
}
