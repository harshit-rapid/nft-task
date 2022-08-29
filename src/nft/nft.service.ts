import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetNftDto } from './dto/nft.dto';
import { Nft } from './nft.entity';
import { NFTsRepository } from './nfts.repository';

@Injectable()
export class NftService {
  constructor(
    @InjectRepository(NFTsRepository)
    private nftsRepository: NFTsRepository,
  ) {}

  getNftDetails(getNftDto: GetNftDto): Promise<Nft> {
    return this.nftsRepository.getNftDetails(getNftDto);
  }
}
