import { RemovedUser } from 'src/domain/entity/removed-user'
import { RemovedUserStatus } from 'src/domain/entity/removed-user-status-id-vo'
import * as faker from 'faker'

export class TestRemovedUserFactory {
  static createPendingUser(): RemovedUser {
    return new RemovedUser({
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      statusId: RemovedUserStatus.Pending,
    })
  }

  static createWithdrawnUser(): RemovedUser {
    return new RemovedUser({
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      statusId: RemovedUserStatus.Withdrawn,
    })
  }
}
