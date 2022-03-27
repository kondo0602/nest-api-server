import { IParticipantQS } from './query-service-interface/participant-qs'
import { IParticipantRepository } from './repository-interface/participant-repository'
import { ChangePair } from '../domain/domain-service/change-pair'

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

  public async do(params: { participantId: string; pairId: string }) {
    const { participantId, pairId } = params

    const changePairService = new ChangePair(this.participantRepo)

    await changePairService.changePair(participantId, pairId)
  }
}
