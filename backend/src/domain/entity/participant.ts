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
    if (this.statusId === new ParticipantStatusIdVO(statusId)) {
      throw new Error('ステータスが更新されていません.')
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
    if (
      value !== ParticipantStatus.Enrolled &&
      value !== ParticipantStatus.Pending &&
      value !== ParticipantStatus.Withdrawn
    ) {
      throw new Error('存在しない在籍ステータスです.')
    }
    this._value = value
  }

  public getStatusId() {
    return this._value
  }
}
