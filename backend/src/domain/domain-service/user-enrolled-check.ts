import { IUserQS } from 'src/app/query-service-interface/user-qs'
import { IRemovedUserRepository } from 'src/app/repository-interface/removed-user-repository'

export class UserEnrolledCheck {
  private readonly userQS: IUserQS
  private readonly removedUserRepo: IRemovedUserRepository

  public constructor(userQS: IUserQS, removedUserRepo: IRemovedUserRepository) {
    ;(this.userQS = userQS), (this.removedUserRepo = removedUserRepo)
  }

  public async isEnrolled(userId: string) {
    if (await this.userQS.getUserByUserId(userId)) {
      return true
    }

    if (await this.removedUserRepo.getRemovedUserByUserId(userId)) {
      return false
    }

    throw new Error('指定された参加者が見つかりませんでした.')
  }
}
