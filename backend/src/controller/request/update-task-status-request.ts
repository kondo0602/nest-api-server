// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class UpdateTaskStatusRequest {
  @ApiProperty()
  @IsNotEmpty()
  readonly taskId!: string

  @ApiProperty()
  @IsNotEmpty()
  readonly statusId!: string
}
