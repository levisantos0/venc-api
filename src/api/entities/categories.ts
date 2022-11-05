import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { Adverts } from "./adverts";

@Entity("categories")
export class Categories {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ name: "name", type: "varchar", nullable: false })
  name: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp", nullable: false })
  createdAt: string;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: false })
  updatedAt: string;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: false })
  deletedAt: string;

  @OneToMany(() => Adverts, (adverts) => adverts.category)
  adverts: Adverts;
}
