import { IParticipantQS } from './query-service-interface/participant-qs'
import { IParticipantRepository } from './repository-interface/participant-repository'

export class ChangePairUseCase {
  private readonly participantQS: IParticipantQS
  private readonly participantRepo: IParticipantRepository

  public constructor(
    participantQS: IParticipantQS,
    participantRepo: IParticipantRepository,
  ) {
    this.participantQS = participantQS
    this.participantRepo = participantRepo
  }

  public async do(params: { id: string; pairId: string }) {
    const { id, pairId } = params

    const participantEntity = await this.participantQS.getParticipantById(id)

    participantEntity.changePair(pairId)

    await this.participantRepo.updateParticipant(participantEntity)
  }
}
