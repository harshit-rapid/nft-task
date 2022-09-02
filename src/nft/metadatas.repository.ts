import { CustomRepository } from '../database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Metadata } from './metadata.entity';
import axios from 'axios';

@CustomRepository(Metadata)
export class MetadatasRepository extends Repository<Metadata> {
  async getMetadata(token_uri: string): Promise<Metadata> {
    let metadata;
    if (token_uri.startsWith('data:application/json;base64,')) {
      const url = token_uri.slice(29);
      const buff = Buffer.from(url, 'base64');
      metadata = JSON.parse(buff.toString('utf-8'));
    } else {
      const url = token_uri.replace(
        'ipfs://',
        'https://gateway.pinata.cloud/ipfs/',
      );
      const response = await axios.get(url);
      metadata = response.data;
    }
    return metadata;
  }
  async saveMetadata(token_uri: string): Promise<Metadata> {
    const metadata: Metadata = await this.getMetadata(token_uri);
    await this.save(metadata);
    return metadata;
  }
}
