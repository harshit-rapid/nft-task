import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetNftsFilterDto } from './dto/filter.dto';
import { GetNftDto } from './dto/nft.dto';
import { Nft } from './nft.entity';
import { NftService } from './nft.service';

@ApiTags('nft')
@Controller('nft')
export class NftController {
  constructor(private nftService: NftService) {}

  @Get()
  @ApiOkResponse({
    description: 'returns Nft Info',
    type: Nft,
  })
  getNftInfo(@Body() nftDto: GetNftDto): Promise<Nft> {
    console.log({ nftDto });
    return this.nftService.getNftInfo(nftDto);
  }
  @Get('all')
  @ApiOkResponse({
    description: 'returns all Nfts ',
    type: Nft,
  })
  getAllNfts(@Body() filterDto: GetNftsFilterDto): Promise<Nft[]> {
    return this.nftService.getAllNfts(filterDto);
  }
  @Post()
  @ApiBody({ type: GetNftDto })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Nft,
  })
  createNft(@Body() nftDto: GetNftDto): Promise<Nft> {
    return this.nftService.createNft(nftDto);
  }
}
