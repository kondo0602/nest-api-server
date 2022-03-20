import { Participant } from 'src/domain/entity/participant'

export class Pair {
  private id: string
  private name: string
  private participants: Participant[]

  public constructor(props: {
    id: string
    name: string
    participants: Participant[]
  }) {
    const { id, name, participants } = props
    this.id = id
    this.name = name
    this.participants = participants
  }

  public getName() {
    return this.name
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.getName(),
      participants: this.participants,
    }
  }
}
