import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
// import * as process from 'process';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TodoEntity } from "./todos/entities/todo.entity";
import { UsersModule } from './users/users.module';
import { UserEntity } from "./users/entities/user.entity";
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { RoleEntity } from "./roles/entities/role.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [TodoEntity, UserEntity, RoleEntity],
      synchronize: true,
    }),
    TodosModule,
    UsersModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
