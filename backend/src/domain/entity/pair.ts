import { Participant } from 'src/domain/entity/participant'

export class Pair {
  private id: string
  private name: string
  private participants: Participant[]
  private teamId: string

  public constructor(props: {
    id: string
    name: string
    participants: Participant[]
    teamId: string
  }) {
    const { id, name, participants, teamId } = props
    this.id = id
    this.name = name
    this.participants = participants
    this.teamId = teamId
  }

  public getId() {
    return this.id
  }

  public getName() {
    return this.name
  }

  public getParticipants(): Participant[] {
    return this.participants
  }

  public getTeamId() {
    return this.teamId
  }

  public setTeamId(teamId: string) {
    this.teamId = teamId
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      participants: this.participants,
      teamId: this.teamId,
    }
  }

  public changeTeam(teamId: string) {
    const receivedTeamId = teamId

    this.teamId = teamId
  }
}
