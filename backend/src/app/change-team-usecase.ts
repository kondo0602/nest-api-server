import { IPairQS } from './query-service-interface/pair-qs'
import { IParticipantRepository } from './repository-interface/participant-repository'
import { ChangeTeam } from '../domain/domain-service/change-team'

export class ChangeTeamUseCase {
  private readonly pairQS: IPairQS
  private readonly participantRepo: IParticipantRepository

  public constructor(pairQS: IPairQS, participantRepo: IParticipantRepository) {
    this.pairQS = pairQS
    this.participantRepo = participantRepo
  }

  public async do(params: { pairId: string; teamId: string }) {
    const { pairId, teamId } = params

    const changeTeamService = new ChangeTeam(this.participantRepo)

    changeTeamService.changeTeam(pairId, teamId)
  }
}
