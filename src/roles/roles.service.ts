import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateRoleDto } from './dto/create-role.dto';
import { RoleEntity } from "./entities/role.entity";

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<RoleEntity>,
  ) {}
  async create(dto: CreateRoleDto) {
    return await this.repository.save(dto);
  }

  async findAll() {
    return this.repository.find();
  }
}
