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
    const currentPair = targetTeam.getPairByParticipantId(participantId)
    const targetPair = targetTeam.getPairByPairId(pairId)
    const targetParticipant = currentPair.getParticipantByParticipantId(
      participantId,
    )

    currentPair.removeParticipant(participantId)
    targetPair.addParticipant(targetParticipant)

    targetTeam.removePair(currentPair.getId())
    targetTeam.addPair(currentPair)

    targetTeam.removePair(currentPair.getId())
    targetTeam.addPair(currentPair)

    await this.participantRepo.updateTeam(targetTeam)
  }
}
