import { ParticipantNameVO } from 'src/domain/entity/participant-name-vo'
import { ParticipantEmailVO } from 'src/domain/entity/participant-email-vo'
import { RemovedParticipantStatusIdVO } from 'src/domain/entity/removed-participant-status-id-vo'

export const enum RemovedParticipantStatus {
  Pending = '2',
  Withdrawn = '3',
}

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

  // public changeStatus(statusId: string) {
  //   const receivedStatus = new ParticipantStatusIdVO(statusId)

  //   if (receivedStatus.equals(this.statusId.getValue())) {
  //     throw new Error('ステータスが更新されていません.')
  //   }

  //   this.statusId = new ParticipantStatusIdVO(statusId)
  // }
}
