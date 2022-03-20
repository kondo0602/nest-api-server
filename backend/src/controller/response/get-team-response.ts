import { ApiProperty } from '@nestjs/swagger'
import { TeamDTO } from 'src/app/query-service-interface/team-qs'

export class GetTeamResponse {
  @ApiProperty({ type: () => [Team] })
  team: Team[]

  public constructor(params: { teams: TeamDTO[] }) {
    const { teams } = params
    this.team = teams.map(({ id, name }) => {
      return new Team({
        id,
        name,
      })
    })
  }
}

class Team {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  public constructor(params: { id: string; name: string }) {
    this.id = params.id
    this.name = params.name
  }
}
