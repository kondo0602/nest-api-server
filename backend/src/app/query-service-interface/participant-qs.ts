import { Participant } from 'src/domain/entity/participant'

export class ParticipantDTO {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly statusId: string

  public constructor(props: {
    id: string
    name: string
    email: string
    statusId: string
  }) {
    const { id, name, email, statusId } = props
    this.id = id
    this.name = name
    this.email = email
    this.statusId = statusId
  }
}

export interface IParticipantQS {
  getParticipantById(id: string): Promise<Participant>
  getParticipantByEmail(email: string): Promise<Participant>
  getAll(): Promise<ParticipantDTO[]>
}
