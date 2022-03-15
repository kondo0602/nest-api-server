export class Participant {
  private id: string
  private name: ParticipantNameVO
  private email: ParticipantEmailVO
  private statusId: ParticipantStatusIdVO

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
    this.statusId = new ParticipantStatusIdVO(statusId)
  }

  public getEmail() {
    return this.email.getEmail()
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name.getName(),
      email: this.email.getEmail(),
      statusId: this.statusId.getStatusId(),
    }
  }

  public changeStatus(statusId: string) {
    if (this.statusId === new ParticipantStatusIdVO(statusId)) {
      // TODO: エラー処理
    }
    this.statusId = new ParticipantStatusIdVO(statusId)
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

class ParticipantStatusIdVO {
  private readonly _value: string

  public constructor(value: string) {
    this._value = value
  }

  public getStatusId() {
    return this._value
  }
}
