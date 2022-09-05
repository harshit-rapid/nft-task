import { ApiProperty } from '@nestjs/swagger';

export class GetNftDto {
  @ApiProperty({
    description: 'Nft Contract Address',
    type: String,
  })
  contract_address: string;
  @ApiProperty({
    description: 'TokenId',
    type: Number,
  })
  token_id: number;
}
