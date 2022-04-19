import { RemovedUser } from 'src/domain/entity/removed-user'
import { RemovedUserStatus } from 'src/domain/entity/removed-user-status-id-vo'
import { createRandomIdString } from 'src/util/random'

export class TestRemovedUserFactory {
  static createPendingUser(): RemovedUser {
    return new RemovedUser({
      id: createRandomIdString(),
      name: 'Yamada Taro',
      email: 'yamada@example.com',
      statusId: RemovedUserStatus.Pending,
    })
  }

  static createWithdrawnUser(): RemovedUser {
    return new RemovedUser({
      id: createRandomIdString(),
      name: 'Yamada Taro',
      email: 'yamada@example.com',
      statusId: RemovedUserStatus.Withdrawn,
    })
  }
}
