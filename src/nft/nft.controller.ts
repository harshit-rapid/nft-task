import { Body, Controller, Get } from '@nestjs/common';
import { GetNftDto } from './dto/nft.dto';
import { Nft } from './nft.entity';
import { NftService } from './nft.service';

@Controller('nft')
export class NftController {
  constructor(private nftService: NftService) {}

  @Get()
  getNftDetails(@Body() getNftDto: GetNftDto): Promise<Nft> {
    return this.nftService.getNftDetails(getNftDto);
  }
}
