import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}
  async create(dto: CreateUserDto) {
    return await this.repository.save(dto);
  }

  async findByUsername(username: string) {
    return await this.repository.findOneBy( { username });

  }

  async findById(id: number) {
    return await this.repository.findOneBy({ id })
  }

  async findAll () {
    return await this.repository.find({relations: { userRoles: true }});
  }
}
