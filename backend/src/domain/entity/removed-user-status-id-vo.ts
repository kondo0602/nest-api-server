import { DomainBadRequestException } from '../__shared__/exception/domain-exception'

export const enum RemovedUserStatus {
  Pending = '2',
  Withdrawn = '3',
}

export class RemovedUserStatusIdVO {
  private readonly _value: string

  public constructor(value: string) {
    if (
      value !== RemovedUserStatus.Pending &&
      value !== RemovedUserStatus.Withdrawn
    ) {
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
