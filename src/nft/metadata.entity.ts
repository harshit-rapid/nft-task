import { IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Metadata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  @IsOptional()
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  description: string;

  @Column({ nullable: true })
  @IsOptional()
  external_url: string;

  @Column({ nullable: true })
  @IsOptional()
  image: string;

  @Column({ nullable: true })
  @IsOptional()
  image_data: string;

  @Column({ nullable: true })
  @IsOptional()
  background_color: string;

  @Column({ nullable: true })
  @IsOptional()
  animation_url: string;

  @Column({ nullable: true })
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
  @Column({ nullable: true })
  @IsOptional()
  trait_type: string;
  @IsOptional()
  @Column({ nullable: true })
  value: string;
  @Column({ nullable: true })
  @IsOptional()
  display_type: string;
}

export class Skills {
  @Column({ nullable: true })
  @IsOptional()
  region: string;
  @Column({ nullable: true })
  @IsOptional()
  number: number;
  @Column({ nullable: true })
  @IsOptional()
  skill_id: number;
  @Column({ nullable: true })
  @IsOptional()
  skill_type: string;
  @Column({ nullable: true })
  @IsOptional()
  skill_competence: string;
  @Column({ nullable: true })
  @IsOptional()
  is_elemental: boolean;
}
