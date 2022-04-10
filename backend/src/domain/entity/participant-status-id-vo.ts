export const enum ParticipantStatus {
  Enrolled = '1',
}
export class ParticipantStatusIdVO {
  private readonly _value: string

  public constructor(value: string) {
    if (value !== ParticipantStatus.Enrolled) {
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
