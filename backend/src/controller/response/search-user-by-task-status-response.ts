import { ApiProperty } from '@nestjs/swagger'
import { UserTaskDTO } from 'src/app/query-service-interface/search-user-by-task-status-qs'
import { Page } from 'src/domain/entity/page'

export class SearchUserByTaskStatusResponse {
  @ApiProperty({ type: () => [User] })
  users: User[]

  public constructor(params: { users: Page<UserTaskDTO> }) {
    const { users } = params
    this.users = users.items.map(({ userId, userName }) => {
      return new User({
        id: userId,
        name: userName,
      })
    })
  }
}

class User {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  public constructor(params: { id: string; name: string }) {
    this.id = params.id
    this.name = params.name
  }
}
