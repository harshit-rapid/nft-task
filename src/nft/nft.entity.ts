import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContractType } from './enum/contractType.enum';
import { Metadata } from './metadata.entity';

@Entity()
export class Nft {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  contract_address: string;
  @Column()
  token_id: number;
  @Column()
  owner_address: string;
  @Column()
  contract_type: ContractType;
  @Column()
  name: string;
  @Column()
  symbol: string;
  @Column()
  token_uri: string;
  @OneToOne((_type) => Metadata, { eager: true })
  @JoinColumn()
  metadata: Metadata;
}
