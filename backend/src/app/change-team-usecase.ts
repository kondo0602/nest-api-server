import { IPairQS } from './query-service-interface/pair-qs'
import { ITeamRepository } from './repository-interface/team-repository'
import { ChangeTeam } from 'src/domain/domain-service/change-team'

export class ChangeTeamUseCase {
  private readonly pairQS: IPairQS
  private readonly userRepo: ITeamRepository

  public constructor(pairQS: IPairQS, userRepo: ITeamRepository) {
    this.pairQS = pairQS
    this.userRepo = userRepo
  }

  public async do(params: { pairId: string; teamId: string }) {
    const { pairId, teamId } = params

    const changeTeamService = new ChangeTeam(this.userRepo)

    changeTeamService.changeTeam(pairId, teamId)
  }
}
