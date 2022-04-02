import { Participant } from 'src/domain/entity/participant'

export class ParticipantDTO {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly statusId: string
  public readonly pairId?: string

  public constructor(props: {
    id: string
    name: string
    email: string
    statusId: string
    pairId?: string
  }) {
    const { id, name, email, statusId, pairId } = props
    this.id = id
    this.name = name
    this.email = email
    this.statusId = statusId
    this.pairId = pairId
  }
}

export interface IParticipantQS {
  getParticipantByEmail(email: string): Promise<Participant | null>
  getAll(): Promise<ParticipantDTO[]>
}
