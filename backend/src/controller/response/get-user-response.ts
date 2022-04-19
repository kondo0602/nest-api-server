import { ApiProperty } from '@nestjs/swagger'
import { UserDTO } from 'src/app/query-service-interface/user-qs'

export class GetUserResponse {
  @ApiProperty({ type: () => [User] })
  user: User[]

  public constructor(params: { users: UserDTO[] }) {
    const { users } = params
    this.user = users.map(({ id, name, email, statusId, pairId }) => {
      return new User({
        id,
        name,
        email,
        statusId,
        pairId,
      })
    })
  }
}

class User {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  statusId: string

  @ApiProperty()
  pairId?: string

  public constructor(params: {
    id: string
    name: string
    email: string
    statusId: string
    pairId?: string
  }) {
    this.id = params.id
    this.name = params.name
    this.email = params.email
    this.statusId = params.statusId
    this.pairId = params.pairId
  }
}
