import { User } from 'src/domain/entity/user'

export class UserDTO {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly statusId: string
  public readonly pairId?: string

  public constructor(props: {
    id: string
    name: string
    email: string
    statusId: string
    pairId?: string
  }) {
    const { id, name, email, statusId, pairId } = props
    this.id = id
    this.name = name
    this.email = email
    this.statusId = statusId
    this.pairId = pairId
  }
}

export interface IUserQS {
  getUserByUserId(userId: string): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
  getAll(): Promise<UserDTO[]>
}
