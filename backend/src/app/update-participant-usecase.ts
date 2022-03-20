import { Participant } from 'src/domain/entity/participant'
import { IParticipantQS } from './query-service-interface/participant-qs'
import { IParticipantRepository } from './repository-interface/participant-repository'

export class UpdateParticipantUseCase {
  private readonly participantQS: IParticipantQS
  private readonly participantRepo: IParticipantRepository

  public constructor(
    participantQS: IParticipantQS,
    participantRepo: IParticipantRepository,
  ) {
    this.participantQS = participantQS
    this.participantRepo = participantRepo
  }

  public async do(params: { id: string; statusId: string }) {
    const { id, statusId } = params

    const participantEntity = await this.participantQS.getParticipantById(id)

    participantEntity.changeStatus(statusId)

    await this.participantRepo.updateParticipant(participantEntity)
  }
}
