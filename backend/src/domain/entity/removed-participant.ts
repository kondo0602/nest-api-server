import { ParticipantNameVO } from 'src/domain/entity/participant-name-vo'
import { ParticipantEmailVO } from 'src/domain/entity/participant-email-vo'
import { RemovedParticipantStatusIdVO } from 'src/domain/entity/removed-participant-status-id-vo'

export class RemovedParticipant {
  private id: string
  private name: ParticipantNameVO
  private email: ParticipantEmailVO
  private statusId: RemovedParticipantStatusIdVO

  public constructor(props: {
    id: string
    name: string
    email: string
    statusId: string
  }) {
    const { id, name, email, statusId } = props
    this.id = id
    this.name = new ParticipantNameVO(name)
    this.email = new ParticipantEmailVO(email)
    this.statusId = new RemovedParticipantStatusIdVO(statusId)
  }

  public getId() {
    return this.id
  }

  public getName() {
    return this.name.getValue()
  }

  public getEmail() {
    return this.email.getValue()
  }

  public getStatusId() {
    return this.statusId.getValue()
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.getName(),
      email: this.getEmail(),
      statusId: this.getStatusId(),
    }
  }

  public updateStatusId(statusId: string) {
    const receivedStatusId = new RemovedParticipantStatusIdVO(statusId)

    if (receivedStatusId.equals(this.statusId.getValue())) {
      throw new Error('ステータスが更新されていません.')
    }

    this.statusId = receivedStatusId
  }
}
