import { IUserQS } from './query-service-interface/user-qs'
import { ITeamRepository } from './repository-interface/team-repository'
import { ChangePair } from 'src/domain/domain-service/change-pair'

export class ChangePairUseCase {
  private readonly userQS: IUserQS
  private readonly userRepo: ITeamRepository

  public constructor(userQS: IUserQS, userRepo: ITeamRepository) {
    this.userQS = userQS
    this.userRepo = userRepo
  }

  public async do(params: { userId: string; pairId: string }) {
    const { userId, pairId } = params

    const changePairService = new ChangePair(this.userRepo)

    await changePairService.changePair(userId, pairId)
  }
}
