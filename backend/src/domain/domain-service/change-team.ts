import { IParticipantRepository } from '../../app/repository-interface/participant-repository'

export class ChangeTeam {
  private readonly participantRepo: IParticipantRepository

  public constructor(participantRepo: IParticipantRepository) {
    this.participantRepo = participantRepo
  }

  public async changeTeam(pairId: string, teamId: string) {
    const currentTeam = await this.participantRepo.getTeamByPairId(pairId)
    const currentPear = currentTeam.getPairByPairId(pairId)
    await currentTeam.removePair(pairId)

    const newTeam = await this.participantRepo.getTeamByTeamId(teamId)
    currentPear.setTeamId(newTeam.getId())
    await newTeam.addPair(currentPear)

    await this.participantRepo.updateTeam(currentTeam)
    await this.participantRepo.updateTeam(newTeam)
  }
}
