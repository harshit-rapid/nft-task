import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetNftsFilterDto } from './dto/filter.dto';
import { GetNftDto } from './dto/nft.dto';
import { Nft } from './nft.entity';
import { NftService } from './nft.service';

@Controller('nft')
export class NftController {
  constructor(private nftService: NftService) {}

  @Get()
  getNftDetails(@Body() nftDto: GetNftDto): Promise<Nft> {
    return this.nftService.getNftDetails(nftDto);
  }
  @Get('all')
  getAllNfts(@Body() filterDto: GetNftsFilterDto): Promise<Nft[]> {
    return this.nftService.getAllNfts(filterDto);
  }
  @Post()
  createNft(@Body() nftDto: GetNftDto): Promise<Nft> {
    return this.nftService.createNft(nftDto);
  }
}
