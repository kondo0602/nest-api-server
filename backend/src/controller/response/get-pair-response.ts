import { ApiProperty } from '@nestjs/swagger'
import { PairDTO } from 'src/app/query-service-interface/pair-qs'

export class GetPairResponse {
  @ApiProperty({ type: () => [Pair] })
  pair: Pair[]

  public constructor(params: { pairs: PairDTO[] }) {
    const { pairs } = params
    this.pair = pairs.map(({ id, name, teamId }) => {
      return new Pair({
        id,
        name,
        teamId,
      })
    })
  }
}

class Pair {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  teamId: string

  public constructor(params: { id: string; name: string; teamId: string }) {
    this.id = params.id
    this.name = params.name
    this.teamId = params.teamId
  }
}
