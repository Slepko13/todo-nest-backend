import { ApiProperty } from "@nestjs/swagger";

export enum RoleType {
  USER = 'user',
  ADMIN = 'admin',
  OWNER = 'owner'

}
export class CreateRoleDto {
  @ApiProperty({
    default: RoleType.USER
  })
  title:RoleType
}
