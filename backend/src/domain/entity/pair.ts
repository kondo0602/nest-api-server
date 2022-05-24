import { User } from 'src/domain/entity/user'
import { DomainNotFoundException } from '../__shared__/exception/domain-exception'

export class Pair {
  static readonly MAXIMUM_NUMBER_OF_PARTICIPANTS: number = 3
  static readonly MINIIMUM_NUMBER_OF_PARTICIPANTS: number = 2

  private id: string
  private name: PairNameVO
  private users: User[]

  public constructor(props: { id: string; name: string; users: User[] }) {
    const { id, name, users } = props
    this.id = id
    this.name = new PairNameVO(name)
    this.users = users
  }

  public getId() {
    return this.id
  }

  public getName() {
    return this.name.getValue()
  }

  public getUsersInRepository(): User[] {
    return [...this.users]
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name.getValue(),
      users: this.users,
    }
  }

  public getFirstUser(): User {
    return this.users[0]!
  }

  public getUserByUserId(userId: string): User {
    const user = this.users.find((user) => user.getId() === userId)

    if (user) {
      return user
    } else {
      throw new DomainNotFoundException(
        '指定された参加者が見つかりませんでした.',
      )
    }
  }

  public getUserCount(): number {
    return this.users.length
  }

  public addUser(user: User): void {
    this.users.push(user)
  }

  public removeUser(userId: string): void {
    this.users = this.users.filter((user) => user.getId() !== userId)
  }
}

export class PairNameVO {
  private readonly _value: string

  public constructor(value: string) {
    const pairNameRegex = /^[a-z]$/

    if (!pairNameRegex.test(value)) {
      throw new Error('ペアの名前は英字小文字1文字にしてください.')
    }

    this._value = value
  }

  public equals(name: string): boolean {
    return this._value === name
  }

  public getValue(): string {
    return this._value
  }
}
