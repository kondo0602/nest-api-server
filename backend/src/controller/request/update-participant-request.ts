// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class UpdateParticipantRequest {
  @ApiProperty()
  @IsNotEmpty()
  readonly statusId!: string
}
