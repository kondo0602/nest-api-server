// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class PostParticipantRequest {
  @ApiProperty()
  @IsNotEmpty()
  readonly name!: string

  @ApiProperty()
  @IsNotEmpty()
  readonly email!: string

  @ApiProperty()
  @IsNotEmpty()
  readonly statusId!: string

  @ApiProperty()
  @IsNotEmpty()
  readonly pairId!: string
}
