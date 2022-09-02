import { CustomRepository } from '../database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { GetNftDto } from './dto/nft.dto';
import { Nft } from './nft.entity';
import { GetNftsFilterDto } from './dto/filter.dto';
import { ERC721Abi } from 'shared/ABI/ERC721';
import { ContractType } from './enum/contractType.enum';
import { web3 } from 'shared/web3';
import { IERC165 } from 'shared/ABI/IERC165';
import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { ERC1155Abi } from 'shared/ABI/ERC1155';

@CustomRepository(Nft)
export class NFTsRepository extends Repository<Nft> {
  async getNfts(filterDto: GetNftsFilterDto): Promise<Nft[]> {
    const { search, sort }: any = filterDto;
    // TODO: Implement sort and search
    const nfts = await this.find();
    console.log({ nfts });
    return nfts;
  }

  async getNftDetails(nftDto: GetNftDto): Promise<Nft> {
    const { contract_address, token_id } = nftDto;

    let contract, contract_type, name, symbol, token_uri, owner_address, erc165;

    try {
      erc165 = new web3.eth.Contract(IERC165, contract_address);
    } catch (err) {
      throw new NotAcceptableException('Invalid Address');
    }

    try {
      if (await erc165.methods.supportsInterface('0xd9b67a26').call()) {
        //ERC1155
        contract = new web3.eth.Contract(ERC1155Abi, contract_address);
        contract_type = ContractType.ERC1155;
        token_uri = await contract.methods.uri(token_id).call();
      } else if (await erc165.methods.supportsInterface('0x80ac58cd').call()) {
        //ERC721
        contract = new web3.eth.Contract(ERC721Abi, contract_address);
        contract_type = ContractType.ERC721;
        name = await contract.methods.name().call();
        symbol = await contract.methods.symbol().call();
        token_uri = await contract.methods.tokenURI(token_id).call();
        owner_address = await contract.methods.ownerOf(token_id).call();
      }
    } catch (err) {
      throw new NotFoundException(err);
    }

    const nft = this.create({
      contract_address: contract_address,
      token_id,
      owner_address,
      contract_type,
      name,
      symbol,
      token_uri,
    });
    console.log({ nft });
    return nft;
  }
  async createNft(nft: Nft): Promise<Nft> {
    await this.save(nft);
    return nft;
  }
}
