import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { MetadatasRepository } from './metadatas.repository';
import { NftController } from './nft.controller';
import { NftService } from './nft.service';
import { NFTsRepository } from './nfts.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([NFTsRepository, MetadatasRepository]),
  ],
  controllers: [NftController],
  providers: [NftService],
})
export class NftModule {}
