import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from "@nestjs/common";
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "../auth/guards/jwt.guard";
import { UserId } from "../auth/decorators/user-id.decorator";

@ApiTags('todos')
@Controller('todos')
@UseGuards(JWTGuard)
@ApiBearerAuth()
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@UserId() userId: number, @Body() dto: CreateTodoDto) {
    return this.todosService.create(userId, dto);
  }

  @Get()
  async findAll(@UserId() userId: number) {
    return  await this.todosService.findAll(userId);
  }

  @Get(':id')
  async findOne(@UserId() userId: number, @Param('id') id: string) {
    const todo = await this.todosService.findOne(+id , userId);
    if(!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`)
    }
    return todo
  }

  @Patch(':id')
  update(@UserId() userId: number, @Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.todosService.updateOne(+id, userId,  dto);
  }

  @Delete(':ids')
  remove(@UserId() userId: number, @Param('ids') ids: string) {
    return this.todosService.remove(userId, ids);
  }
}
