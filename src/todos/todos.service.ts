import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


import { TodoEntity } from './entities/todo.entity'

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private repository: Repository<TodoEntity>,
  ) {}
  async create(userId: number, dto: CreateTodoDto) {
    return this.repository.save({
      ...dto,
      user : { id: userId }
    })
  }

  async findAll(userId: number) {
    const qb = await this.repository.createQueryBuilder('todo');
    qb.where("todo.userId = :userId", { userId });
    return await qb.getMany()

  }

   async findOne(id: number, userId: number) {
      const qb =  await this.repository.createQueryBuilder('todo');
     qb
       .where("todo.userId = :userId", { userId })
       .andWhere("todo.id = :id", { id })
    return await qb.getOne();
  }

  async updateOne(id: number, userId: number, updatedData: UpdateTodoDto) {
    const existingTodo = await this.findOne(id, userId);

    if (!existingTodo) {
      throw new NotFoundException('Todo not found');
    }

    try {
      this.repository.merge(existingTodo, updatedData);

      return await this.repository.save(existingTodo);

    } catch (err) {
      throw new Error('Error updating todo');
    }
  }

  async remove(userId: number, ids: string) {
    const idsArray = ids.split(',');
    const qb = this.repository.createQueryBuilder('todo');
    qb.where('id IN (:...ids) AND userId = :userId', {
      ids: idsArray,
      userId
    });
    const candidates = await qb.delete().execute();
    if(candidates.affected === 0) {
      throw new BadRequestException('Error deleting todo')
    }
    return candidates;
  }
}
