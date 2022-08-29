// import { web3 } from 'shared/web3';
import { CustomRepository } from '../database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { GetNftDto } from './dto/nft.dto';
import { Nft } from './nft.entity';
import { GetNftsFilterDto } from './dto/filter.dto';
import { ERC721Abi } from 'shared/ABI/ERC721';
import { ContractType } from './enum/contractType.enum';
import { web3 } from 'shared/web3';

@CustomRepository(Nft)
export class NFTsRepository extends Repository<Nft> {
  async getNfts(filterDto: GetNftsFilterDto): Promise<Nft[]> {
    const { contract_address, token_id, owner_address } = filterDto;

    const query = this.createQueryBuilder('nft');
    query.where({ contract_address });

    const nfts = await query.getMany();
    return nfts;
  }

  async getNftDetails(getNftDto: GetNftDto): Promise<Nft> {
    const { contract_address, token_id } = getNftDto;

    const contract = new web3.eth.Contract(ERC721Abi, contract_address);

    const name = await contract.methods.name().call();
    const symbol = await contract.methods.symbol().call();
    const token_uri = await contract.methods.tokenURI(token_id).call();
    const owner_address = await contract.methods.ownerOf(token_id).call();
    await fetch(token_uri)
      .then((response) => response.json())
      .then((data) => console.log(data));

    const nft = this.create({
      contract_address: contract_address,
      token_id,
      owner_address,
      contract_type: ContractType.ERC721,
      name,
      symbol,
      token_uri,
    });
    await this.save(nft);

    return nft;
  }
  async storeNFT(getNftDto: GetNftDto): Promise<Nft> {
    const nft = await this.getNftDetails(getNftDto);
    await this.save(nft);
    return nft;
  }
}
