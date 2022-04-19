import { IUserQS } from '../../app/query-service-interface/user-qs'

export class EmailDuplicateCheck {
  private readonly userQS: IUserQS

  public constructor(userQS: IUserQS) {
    this.userQS = userQS
  }

  public async isDuplicated(email: string) {
    const duplicatedUser = await this.userQS.getUserByEmail(email)

    return duplicatedUser != null
  }
}
