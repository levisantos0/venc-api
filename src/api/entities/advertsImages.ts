import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Adverts } from "./adverts";

@Entity("adverts_images")
export class AdvertsImages {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ name: "file_name", type: "varchar", nullable: false })
  fileName: string;

  @Column({ name: "advert_id", type: "uuid", nullable: false })
  advertId: string;

  @ManyToOne(() => Adverts)
  @JoinColumn({ name: "advert_id", referencedColumnName: "id" })
  adverts: Adverts;
}
