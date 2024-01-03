import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  priority: number;

  @Column()
  isCompleted: boolean;

  @ManyToOne(() => UserEntity, user => user.todos)
  user: UserEntity
}
