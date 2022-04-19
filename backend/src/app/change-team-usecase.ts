import { IPairQS } from './query-service-interface/pair-qs'
import { IUserRepository } from './repository-interface/user-repository'
import { ChangeTeam } from 'src/domain/domain-service/change-team'

export class ChangeTeamUseCase {
  private readonly pairQS: IPairQS
  private readonly userRepo: IUserRepository

  public constructor(pairQS: IPairQS, userRepo: IUserRepository) {
    this.pairQS = pairQS
    this.userRepo = userRepo
  }

  public async do(params: { pairId: string; teamId: string }) {
    const { pairId, teamId } = params

    const changeTeamService = new ChangeTeam(this.userRepo)

    changeTeamService.changeTeam(pairId, teamId)
  }
}
