import { UserNameVO } from 'src/domain/entity/user-name-vo'
import { UserEmailVO } from 'src/domain/entity/user-email-vo'
import { UserStatus, UserStatusIdVO } from 'src/domain/entity/user-status-id-vo'

export class User {
  private id: string
  private name: UserNameVO
  private email: UserEmailVO
  private statusId: UserStatusIdVO

  public constructor(props: { id: string; name: string; email: string }) {
    const { id, name, email } = props
    this.id = id
    this.name = new UserNameVO(name)
    this.email = new UserEmailVO(email)
    this.statusId = new UserStatusIdVO(UserStatus.Enrolled)
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
