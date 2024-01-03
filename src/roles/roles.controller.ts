import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // @Post()
  // create(@Body() dto: CreateRoleDto) {
  //   return this.rolesService.create(dto);
  // }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }
}
