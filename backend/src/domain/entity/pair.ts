import { Participant } from 'src/domain/entity/participant'

export class Pair {
  private id: string
  private name: PairNameVO
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
    this.name = new PairNameVO(name)
    this.participants = participants
    this.teamId = teamId
  }

  public getId() {
    return this.id
  }

  public getName() {
    return this.name.getValue()
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
      name: this.name.getValue(),
      participants: this.participants,
      teamId: this.teamId,
    }
  }

  public changeTeam(teamId: string) {
    const receivedTeamId = teamId

    this.teamId = teamId
  }
}

export class PairNameVO {
  private readonly _value: string

  public constructor(value: string) {
    const pairNameRegex = /^[a-z]$/

    if (!pairNameRegex.test(value)) {
      throw new Error('ペアの名前は英字小文字1文字にしてください.')
    }

    this._value = value
  }

  public equals(name: string): boolean {
    return this._value === name
  }

  public getValue(): string {
    return this._value
  }
}
