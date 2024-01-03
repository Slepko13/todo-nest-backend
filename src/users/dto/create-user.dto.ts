import { ApiProperty } from "@nestjs/swagger";
import { RoleEntity } from "../../roles/entities/role.entity";

export class CreateUserDto {
  @ApiProperty({
    default: 'User'
  })
  username: string;

  @ApiProperty({
    default: 'user@gmail.com'
  })
  email: string;

  @ApiProperty({
    default: '12345'
  })
  password: string

}
