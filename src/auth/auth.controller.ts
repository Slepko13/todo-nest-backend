import { Controller, Post, UseGuards, Request, Body } from "@nestjs/common";
import { AuthService } from './auth.service';
import { LocalGuard } from "./guards/local.guard";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { ApiBody } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalGuard)
  @ApiBody({type: CreateUserDto})
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto)
  }
}
