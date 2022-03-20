import { IPairQS } from './query-service-interface/pair-qs'
import { IParticipantRepository } from './repository-interface/participant-repository'

export class ChangeTeamUseCase {
  private readonly pairQS: IPairQS
  private readonly participantRepo: IParticipantRepository

  public constructor(pairQS: IPairQS, participantRepo: IParticipantRepository) {
    this.pairQS = pairQS
    this.participantRepo = participantRepo
  }

  public async do(params: { id: string; teamId: string }) {
    const { id, teamId } = params

    const pairEntity = await this.pairQS.getPairById(id)

    if (pairEntity) {
      pairEntity.changeTeam(teamId)
    } else {
      throw new Error('ペアが見つかりませんでした.')
    }

    await this.participantRepo.updatePair(pairEntity)
  }
}
