import { ParticipantNameVO } from 'src/domain/entity/participant-name-vo'
import { ParticipantEmailVO } from 'src/domain/entity/participant-email-vo'
import {
  ParticipantStatus,
  ParticipantStatusIdVO,
} from 'src/domain/entity/participant-status-id-vo'

export class Participant {
  private id: string
  private name: ParticipantNameVO
  private email: ParticipantEmailVO
  private statusId: ParticipantStatusIdVO

  public constructor(props: { id: string; name: string; email: string }) {
    const { id, name, email } = props
    this.id = id
    this.name = new ParticipantNameVO(name)
    this.email = new ParticipantEmailVO(email)
    this.statusId = new ParticipantStatusIdVO(ParticipantStatus.Enrolled)
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
}
