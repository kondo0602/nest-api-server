export class UserEmailVO {
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
