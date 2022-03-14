export class Participant {
  private id: string
  private name: ParticipantNameVO
  private email: ParticipantEmailVO
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
    this.email = new ParticipantEmailVO(email)
    this.statusId = statusId
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name.getName(),
      email: this.email.getEmail(),
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

class ParticipantEmailVO {
  private readonly _value: string

  public constructor(value: string) {
    this._value = value
  }

  public getEmail() {
    return this._value
  }
}
