import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { AdvertsImages } from "./advertsImages";
import { Categories } from "./categories";

@Entity("adverts")
export class Adverts {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ name: "title", type: "varchar", nullable: false })
  title: string;

  @Column({ name: "description", type: "varchar", nullable: false })
  description: string;

  @Column({ name: "user_id", type: "uuid", nullable: false })
  userId: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp", nullable: false })
  createdAt: string;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: false })
  updatedAt: string;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: false })
  deletedAt: string;

  @Column({ name: "price", type: "float4", nullable: false })
  price: number;

  @Column({ name: "location", type: "varchar", nullable: false })
  location: string;

  @Column({ name: "address", type: "varchar", nullable: false })
  address: string;

  @Column({ name: "email", type: "varchar", nullable: true })
  email: string;

  @Column({ name: "telephone", type: "varchar", nullable: false })
  telephone: string;

  @Column({ name: "category_id", type: "int4", nullable: false })
  categoryId: number;

  @OneToMany(() => AdvertsImages, (messageContact) => messageContact.adverts)
  advertsImages: AdvertsImages[];

  @ManyToOne(() => Categories, (categories) => categories.adverts)
  @JoinColumn({ name: "category_id", referencedColumnName: "id" })
  category: Categories;
}
