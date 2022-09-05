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

  /**
   * @description to get information of an NFT by given tokenId
   * @param nftDto - an object containing the nft address and token ID.
   * @returns Nft - An NFT object containing the details of the NFT
   */

  async getNftInfo(nftDto: GetNftDto): Promise<Nft> {
    const nft = await this.nftsRepository.getNftInfo(nftDto);
    const metadata = await this.metadatasRepository.getMetadata(nft.token_uri);
    nft.metadata = metadata;
    return nft;
  }

  /**
   * @description Gets all the NFTs from the db
   * @param filterDto - an object containing the search and sort parameters
   * @returns Nft - An array NFT object containing the details of the NFT
   */

  getAllNfts(filterDto: GetNftsFilterDto): Promise<Nft[]> {
    return this.nftsRepository.getAllNfts(filterDto);
  }

  /**
   * @description Stores an NFT on the DB.
   * @param nftDto - an object containing the nft address and token ID.
   * @returns Nft - An NFT object containing the details of the NFT
   */

  async createNft(nftDto: GetNftDto): Promise<Nft> {
    const nft = await this.nftsRepository.getNftInfo(nftDto);
    const metadata = await this.metadatasRepository.saveMetadata(nft.token_uri);
    nft.metadata = metadata;
    const res = await this.nftsRepository.createNft(nft);
    this.metadatasRepository.save(metadata);
    return res;
  }
}
