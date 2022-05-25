import { ITeamRepository } from 'src/app/repository-interface/team-repository'

export class ChangeTeam {
  private readonly teamRepo: ITeamRepository

  public constructor(teamRepo: ITeamRepository) {
    this.teamRepo = teamRepo
  }

  public async changeTeam(pairId: string, teamId: string) {
    const currentTeam = await this.teamRepo.getTeamByPairId(pairId)
    const currentPair = currentTeam.getPairByPairId(pairId)
    const newTeam = await this.teamRepo.getTeamByTeamId(teamId)

    currentTeam.removePair(pairId)
    newTeam.addPair(currentPair)

    await this.teamRepo.updateTeam(currentTeam)
    await this.teamRepo.updateTeam(newTeam)
  }
}
