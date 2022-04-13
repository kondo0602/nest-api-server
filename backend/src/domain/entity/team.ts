import { Pair } from 'src/domain/entity/pair'
import { Participant } from 'src/domain/entity/participant'

export class Team {
  private id: string
  private name: TeamNameVO
  private pairs: Pair[]

  public constructor(props: { id: string; name: string; pairs: Pair[] }) {
    const { id, name, pairs } = props
    this.id = id
    this.name = new TeamNameVO(name)
    this.pairs = pairs
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      pairs: this.pairs,
    }
  }

  public getId() {
    return this.id
  }

  public getPairs() {
    return this.pairs
  }

  public getPairByPairId(pairId: string): Pair {
    const pair = this.pairs.find((pair) => pair.getId() === pairId)

    if (pair) {
      return pair
    } else {
      throw new Error('指定されたペアが見つかりませんでした.')
    }
  }

  public getPairByParticipantId(participantId: string): Pair {
    const pair = this.pairs.find((pair) => {
      return pair
        .getParticipants()
        .find((participant) => participant.getId() === participantId)
    })

    if (pair) {
      return pair
    } else {
      throw new Error('指定された参加者が所属するペアが見つかりませんでした.')
    }
  }

  public addPair(pair: Pair): void {
    this.pairs.push(pair)
  }

  public removePair(pairId: string): void {
    this.pairs = this.pairs.filter((pair) => pair.getId() !== pairId)
  }
}

export class TeamNameVO {
  private readonly _value: string

  public constructor(value: string) {
    const teamNameRegex = /^[0-9]{1,3}$/

    if (!teamNameRegex.test(value)) {
      throw new Error('チームの名前は3桁以内の数字にしてください.')
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
