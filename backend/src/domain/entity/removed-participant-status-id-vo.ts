export const enum RemovedParticipantStatus {
  Pending = '2',
  Withdrawn = '3',
}

export class RemovedParticipantStatusIdVO {
  private readonly _value: string

  public constructor(value: string) {
    if (
      value !== RemovedParticipantStatus.Pending &&
      value !== RemovedParticipantStatus.Withdrawn
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
