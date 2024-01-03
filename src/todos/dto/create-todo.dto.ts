import { ApiProperty } from "@nestjs/swagger";


export type PriorityType = 1 | 2 | 3 | 4 | 5;
export class CreateTodoDto {
  @ApiProperty({
    default: 'Todo tile'
  })
  title: string;

  @ApiProperty({
    default: 'Some todo content'
  })
  content: string;

  @ApiProperty({
    default: false
  })
  isCompleted: boolean

  @ApiProperty({
    default: 5
  })
  priority: PriorityType;
}
