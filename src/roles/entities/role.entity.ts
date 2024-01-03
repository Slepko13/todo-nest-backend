import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm";
@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string
}
