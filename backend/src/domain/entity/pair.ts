import { Participant } from 'src/domain/entity/participant'

export class Pair {
  static readonly MAXIMUM_NUMBER_OF_PARTICIPANTS: number = 3
  static readonly MINIIMUM_NUMBER_OF_PARTICIPANTS: number = 2

  private id: string
  private name: PairNameVO
  private participants: Participant[]

  public constructor(props: {
    id: string
    name: string
    participants: Participant[]
  }) {
    const { id, name, participants } = props
    this.id = id
    this.name = new PairNameVO(name)
    this.participants = participants
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

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name.getValue(),
      participants: this.participants,
    }
  }

  public getParticipantByParticipantId(participantId: string): Participant {
    const participant = this.participants.find(
      (participant) => participant.getId() === participantId,
    )

    if (participant) {
      return participant
    } else {
      throw new Error('指定された参加者が見つかりませんでした.')
    }
  }

  public getParticipantCount(): number {
    return this.participants.length
  }

  public addParticipant(participant: Participant): void {
    this.participants.push(participant)
  }

  public removeParticipant(participantId: string): void {
    this.participants = this.participants.filter(
      (participant) => participant.getId() !== participantId,
    )
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
