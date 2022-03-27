// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ChangeTeamRequest {
  @ApiProperty()
  @IsNotEmpty()
  readonly teamId!: string
}
