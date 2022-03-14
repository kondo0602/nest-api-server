export class Participant {
  private id: string
  private name: ParticipantNameVO
  private email: string
  private statusId: string

  public constructor(props: {
    id: string
    name: string
    email: string
    statusId: string
  }) {
    const { id, name, email, statusId } = props
    this.id = id
    this.name = new ParticipantNameVO(name)
    this.email = email
    this.statusId = statusId
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name.getName(),
      email: this.email,
      statusId: this.statusId,
    }
  }
}

class ParticipantNameVO {
  private readonly _value: string

  public constructor(value: string) {
    this._value = value
  }

  public getName() {
    return this._value
  }
}
