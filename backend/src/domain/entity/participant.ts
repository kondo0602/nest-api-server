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
  private pairId?: string

  public constructor(props: {
    id: string
    name: string
    email: string
    statusId: string
    pairId?: string
  }) {
    const { id, name, email, statusId, pairId } = props
    this.id = id
    this.name = new ParticipantNameVO(name)
    this.email = new ParticipantEmailVO(email)
    this.statusId = new ParticipantStatusIdVO(statusId)
    this.pairId = pairId
  }

  public getId() {
    return this.id
  }

  public getName() {
    return this.name.getValue()
  }

  public getEmail() {
    return this.email.getValue()
  }

  public getStatusId() {
    return this.statusId.getValue()
  }

  public getPairId() {
    if (this.pairId) {
      return this.pairId
    } else {
      throw new Error('現在、活動休止中の参加者です.')
    }
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.getName(),
      email: this.getEmail(),
      statusId: this.getStatusId(),
      pairId: this.getPairId(),
    }
  }

  public changeStatus(statusId: string) {
    const receivedStatus = new ParticipantStatusIdVO(statusId)

    if (receivedStatus.equals(this.statusId.getValue())) {
      throw new Error('ステータスが更新されていません.')
    }

    this.statusId = new ParticipantStatusIdVO(statusId)
  }

  public changePair(pairId: string) {
    const receivedPairId = pairId

    this.pairId = pairId
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

  public getValue() {
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

  public getValue() {
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

  public getValue() {
    return this._value
  }
}
