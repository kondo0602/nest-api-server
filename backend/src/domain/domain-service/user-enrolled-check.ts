import { IUserQS } from 'src/app/query-service-interface/user-qs'
import { IRemovedUserRepository } from 'src/app/repository-interface/removed-user-repository'

export class UserEnrolledCheck {
  constructor(private readonly userQS: IUserQS) {
    this.userQS = userQS
  }

  public async isEnrolled(userId: string) {
    return (await this.userQS.getUserByUserId(userId)) !== null
  }
}
