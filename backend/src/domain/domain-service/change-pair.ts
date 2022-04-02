import { IParticipantRepository } from '../../app/repository-interface/participant-repository'

export class ChangePair {
  private readonly participantRepo: IParticipantRepository

  public constructor(participantRepo: IParticipantRepository) {
    this.participantRepo = participantRepo
  }

  public async changePair(participantId: string, pairId: string) {
    const targetTeam = await this.participantRepo.getTeamByParticipantId(
      participantId,
    )
    const targetParticipant = await targetTeam.getParticipantByParticipantId(
      participantId,
    )
    await targetParticipant.changePair(pairId)

    await targetTeam.removeParticipant(participantId)
    await targetTeam.addParticipant(targetParticipant)

    await this.participantRepo.updateTeam(targetTeam)
  }
}
