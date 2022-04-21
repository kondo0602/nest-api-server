import { DomainBadRequestException } from '../__shared__/exception/domain-exception'

export const enum UserStatus {
  Enrolled = '1',
}
export class UserStatusIdVO {
  private readonly _value: string

  public constructor(value: string) {
    if (value !== UserStatus.Enrolled) {
      throw new DomainBadRequestException('存在しない在籍ステータスです.')
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
