import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "../users/users.service";
import { UserEntity } from "../users/entities/user.entity";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { RoleType } from "../roles/dto/create-role.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(dto: CreateUserDto) {
    const userExist = await this.usersService.findByUsername(dto.username);
    if(userExist) {
      throw new ForbiddenException('User already exist')
    }
    try {
      const userData = await this.usersService.create(dto);

      return {
        token: this.jwtService.sign( { id: userData.id })
      }

    } catch (e) {
      throw new ForbiddenException('Registration error', e);
    }
  }

  async login(user: UserEntity) {

    return {
      token: this.jwtService.sign({id: user.id}),
    };
  }
}
