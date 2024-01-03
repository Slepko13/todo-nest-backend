import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { TodoEntity } from "../../todos/entities/todo.entity";
import { RoleEntity } from "../../roles/entities/role.entity";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => TodoEntity, todo => todo.user )
  todos: TodoEntity[]

  @ManyToMany(() => RoleEntity, { cascade: true})
  @JoinTable()
  userRoles: RoleEntity[]
}
