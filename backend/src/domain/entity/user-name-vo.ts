export class UserNameVO {
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
