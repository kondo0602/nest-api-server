import { RemovedParticipant } from 'src/domain/entity/removed-participant'
import { RemovedParticipantStatus } from 'src/domain/entity/removed-participant-status-id-vo'
import { createRandomIdString } from 'src/util/random'

export class TestRemovedParticipantFactory {
  static createPendingParticipant(): RemovedParticipant {
    return new RemovedParticipant({
      id: createRandomIdString(),
      name: 'Yamada Taro',
      email: 'yamada@example.com',
      statusId: RemovedParticipantStatus.Pending,
    })
  }

  static createWithdrawnParticipant(): RemovedParticipant {
    return new RemovedParticipant({
      id: createRandomIdString(),
      name: 'Yamada Taro',
      email: 'yamada@example.com',
      statusId: RemovedParticipantStatus.Withdrawn,
    })
  }
}
