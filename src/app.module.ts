import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metadata } from './nft/metadata.entity';
import { Nft } from './nft/nft.entity';
import { NftModule } from './nft/nft.module';

@Module({
  imports: [
    NftModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nft-task',
      entities: [Nft, Metadata],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
