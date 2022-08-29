import { Column, Entity } from 'typeorm';

@Entity()
export class Metadata {
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  external_url: string;
  @Column()
  image: string;
  @Column()
  attributes: string;
}
