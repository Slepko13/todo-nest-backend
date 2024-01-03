import { Controller, Get, UseGuards } from "@nestjs/common";
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "../auth/guards/jwt.guard";
import { UserId } from "../auth/decorators/user-id.decorator";

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(JWTGuard)
  getMe(@UserId() id: number) {
    return this.usersService.findById(id)
  }
  @Get('')
  getAll(@UserId() id: number) {
    return this.usersService.findAll()
  }
}
