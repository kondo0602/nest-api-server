import { Participant } from 'src/domain/entity/participant'

export class Pair {
  private id: string
  private name: string
  private participants?: Participant[]
  private teamId: string

  public constructor(props: {
    id: string
    name: string
    participants?: Participant[]
    teamId: string
  }) {
    const { id, name, participants, teamId } = props
    this.id = id
    this.name = name
    this.participants = participants
    this.teamId = teamId
  }

  public getName() {
    return this.name
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.getName(),
      participants: this.participants,
      teamId: this.teamId,
    }
  }

  public changeTeam(teamId: string) {
    const receivedTeamId = teamId

    this.teamId = teamId
  }
}
