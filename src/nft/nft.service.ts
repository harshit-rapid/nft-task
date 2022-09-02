import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetNftsFilterDto } from './dto/filter.dto';
import { GetNftDto } from './dto/nft.dto';
import { MetadatasRepository } from './metadatas.repository';
import { Nft } from './nft.entity';
import { NFTsRepository } from './nfts.repository';

@Injectable()
export class NftService {
  constructor(
    @InjectRepository(NFTsRepository)
    private nftsRepository: NFTsRepository,
    @InjectRepository(MetadatasRepository)
    private metadatasRepository: MetadatasRepository,
  ) {}

  async getNftDetails(getNftDto: GetNftDto): Promise<Nft> {
    const nft = await this.nftsRepository.getNftDetails(getNftDto);
    const metadata = await this.metadatasRepository.getMetadata(nft.token_uri);
    nft.metadata = metadata;
    return nft;
  }

  getAllNfts(filterDto: GetNftsFilterDto): Promise<Nft[]> {
    return this.nftsRepository.getNfts(filterDto);
  }

  async createNft(nftDto: GetNftDto): Promise<Nft> {
    const nft = await this.nftsRepository.getNftDetails(nftDto);
    const metadata = await this.metadatasRepository.saveMetadata(nft.token_uri);
    nft.metadata = metadata;
    const res = await this.nftsRepository.createNft(nft);
    this.metadatasRepository.save(metadata);
    return res;
  }
}
