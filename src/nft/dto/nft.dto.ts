import { ApiProperty } from '@nestjs/swagger';

export class GetNftDto {
  @ApiProperty({
    description: 'The Contract Address of the NFT.',
    type: String,
  })
  contract_address: string;
  @ApiProperty({
    description: 'TokenId of the NFT.',
    type: Number,
  })
  token_id: number;
}
