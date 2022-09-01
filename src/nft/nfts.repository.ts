// import { web3 } from 'shared/web3';
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

    const query = this.createQueryBuilder('nft');
    // const sort: any = req.query.sort;

    if (sort) {
      query.orderBy('nft.token_id', sort.toUpperCase());
    }

    const nfts = await query.getMany();
    return nfts;
  }

  async getNftDetails(nftDto: GetNftDto): Promise<Nft> {
    const { contract_address, token_id } = nftDto;

    let contract,
      contract_type,
      name,
      symbol,
      token_uri,
      owner_address,
      metadata,
      erc165;

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
        console.log(1);
        //ERC721
        contract = new web3.eth.Contract(ERC721Abi, contract_address);
        contract_type = ContractType.ERC721;
        name = await contract.methods.name().call();
        console.log(2);
        symbol = await contract.methods.symbol().call();
        console.log(3);
        token_uri = await contract.methods.tokenURI(token_id).call();
        console.log(4);
        owner_address = await contract.methods.ownerOf(token_id).call();
        console.log(5);
      }
    } catch (err) {
      throw new NotFoundException(err);
    }

    console.log({ token_uri });
    let url = token_uri.replace(
      'ipfs://',
      'https://gateway.pinata.cloud/ipfs/',
    );

    // const imgUrl = token_uri?.slice(
    //   token_uri.indexOf(':'),
    //   token_uri?.lastIndexOf('/'),
    // );
    // const slice = token_uri?.slice(
    //   token_uri.lastIndexOf('/'),
    //   token_uri?.length,
    // );
    // const renderURL = `https${imgUrl}.ipfs.dweb.link${slice}`;
    console.log(url);
    // const ipfs = await IPFS.create();
    // const fetch = await makeIpfsFetch({ ipfs });
    // await fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => (metadata = data));

    await fetch(url).then((response) => response.json())
      .then((data) => console.log(data));

    await fetch(token_uri)
      .then((response) => response.json())
      .then((data) => console.log(data));

    // if (!response.ok) throw new Error(response.statusText);

    // const metadata = await response.json();

    const nft = this.create({
      contract_address: contract_address,
      token_id,
      owner_address,
      contract_type,
      name,
      symbol,
      token_uri,
      metadata,
    });

    return nft;
  }
  async createNft(nftDto: GetNftDto): Promise<Nft> {
    const nft = await this.getNftDetails(nftDto);
    console.log(nft);
    await this.save(nft);
    return nft;
  }
}
