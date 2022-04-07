// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class SearchParticipantsByTaskStatusRequest {
  @ApiProperty()
  @IsNotEmpty()
  readonly taskIdList!: string[]

  @ApiProperty()
  @IsNotEmpty()
  readonly taskStatus!: string

  @ApiProperty()
  @IsNotEmpty()
  readonly pageNumber!: number
}
