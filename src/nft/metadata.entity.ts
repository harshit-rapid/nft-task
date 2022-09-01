import { IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Nft } from './nft.entity';

@Entity()
export class Metadata {
  @PrimaryGeneratedColumn('uuid')
  // @OneToOne((_type) => Nft, (nft) => nft.token_id, { eager: false })
  id: string;
  @Column()
  @IsOptional()
  name: string;
  @Column()
  @IsOptional()
  description: string;
  @Column()
  @IsOptional()
  external_url: string;
  @Column()
  @IsOptional()
  image: string;
  @Column()
  @IsOptional()
  image_data: string;
  @Column()
  @IsOptional()
  background_color: string;
  @Column()
  @IsOptional()
  animation_url: string;
  @Column()
  @IsOptional()
  youtube_url: string;
  @Column(() => Skills)
  @IsOptional()
  skills: Skills[];
  @Column(() => Attributes)
  @IsOptional()
  attributes: Attributes[];
}

export class Attributes {
  @Column()
  @IsOptional()
  trait_type: string;
  @IsOptional()
  @Column()
  value: string;
  @Column()
  @IsOptional()
  display_type: string;
}

export class Skills {
  @Column({ nullable: true })
  @IsOptional()
  region: string;
  @Column()
  @IsOptional()
  number: number;
  @Column()
  @IsOptional()
  skill_id: number;
  @Column()
  @IsOptional()
  skill_type: string;
  @Column()
  @IsOptional()
  skill_competence: string;
  @Column()
  @IsOptional()
  is_elemental: boolean;
}
