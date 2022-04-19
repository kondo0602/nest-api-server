import { IUserQS } from './query-service-interface/user-qs'
import { IUserRepository } from './repository-interface/user-repository'
import { ChangePair } from 'src/domain/domain-service/change-pair'

export class ChangePairUseCase {
  private readonly userQS: IUserQS
  private readonly userRepo: IUserRepository

  public constructor(userQS: IUserQS, userRepo: IUserRepository) {
    this.userQS = userQS
    this.userRepo = userRepo
  }

  public async do(params: { userId: string; pairId: string }) {
    const { userId, pairId } = params

    const changePairService = new ChangePair(this.userRepo)

    await changePairService.changePair(userId, pairId)
  }
}
