export const enum ParticipantStatus {
  Enrolled = '1',
  Pending = '2',
  Withdrawn = '3',
}

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
    const receivedStatus = new ParticipantStatusIdVO(statusId)

    if (receivedStatus.equals(this.statusId.getStatusId())) {
      throw new Error('ステータスが更新されていません.')
    }

    this.statusId = new ParticipantStatusIdVO(statusId)
  }
}

export class ParticipantNameVO {
  private readonly _value: string

  public constructor(value: string) {
    this._value = value
  }

  public equals(name: string): boolean {
    return this._value === name
  }

  public getName() {
    return this._value
  }
}

export class ParticipantEmailVO {
  private readonly _value: string

  public constructor(value: string) {
    this._value = value
  }

  public equals(email: string): boolean {
    return this._value === email
  }

  public getEmail() {
    return this._value
  }
}

export class ParticipantStatusIdVO {
  private readonly _value: string

  public constructor(value: string) {
    if (
      value !== ParticipantStatus.Enrolled &&
      value !== ParticipantStatus.Pending &&
      value !== ParticipantStatus.Withdrawn
    ) {
      throw new Error('存在しない在籍ステータスです.')
    }
    this._value = value
  }

  public equals(statusId: string): boolean {
    return this._value === statusId
  }

  public getStatusId() {
    return this._value
  }
}
