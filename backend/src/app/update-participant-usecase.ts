import { Participant } from 'src/domain/entity/participant'
import { IParticipantQS } from './query-service-interface/participant-qs'
import { IParticipantRepository } from './repository-interface/participant-repository'

export class UpdateParticipantUseCase {
  private readonly participantRepo: IParticipantRepository

  public constructor(participantRepo: IParticipantRepository) {
    this.participantRepo = participantRepo
  }

  public async do(params: { id: string; statusId: string }) {
    const { id, statusId } = params

    const targetTeam = await this.participantRepo.getTeamByParticipantId(id)
    const targetParticipant = await targetTeam.getParticipantByParticipantId(id)

    targetParticipant.changeStatus(statusId)

    await this.participantRepo.updateTeam(targetTeam)
  }
}
