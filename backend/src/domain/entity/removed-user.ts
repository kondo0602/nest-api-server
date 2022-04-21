import { UserNameVO } from 'src/domain/entity/user-name-vo'
import { UserEmailVO } from 'src/domain/entity/user-email-vo'
import { RemovedUserStatusIdVO } from 'src/domain/entity/removed-user-status-id-vo'
import { DomainBadRequestException } from '../__shared__/exception/domain-exception'

export class RemovedUser {
  private id: string
  private name: UserNameVO
  private email: UserEmailVO
  private statusId: RemovedUserStatusIdVO

  public constructor(props: {
    id: string
    name: string
    email: string
    statusId: string
  }) {
    const { id, name, email, statusId } = props
    this.id = id
    this.name = new UserNameVO(name)
    this.email = new UserEmailVO(email)
    this.statusId = new RemovedUserStatusIdVO(statusId)
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
    const receivedStatusId = new RemovedUserStatusIdVO(statusId)

    if (receivedStatusId.equals(this.statusId.getValue())) {
      throw new DomainBadRequestException('ステータスが更新されていません.')
    }

    this.statusId = receivedStatusId
  }
}
