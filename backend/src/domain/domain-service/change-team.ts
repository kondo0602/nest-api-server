import { IUserRepository } from '../../app/repository-interface/user-repository'

export class ChangeTeam {
  private readonly userRepo: IUserRepository

  public constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo
  }

  public async changeTeam(pairId: string, teamId: string) {
    const currentTeam = await this.userRepo.getTeamByPairId(pairId)
    const currentPair = currentTeam.getPairByPairId(pairId)
    const newTeam = await this.userRepo.getTeamByTeamId(teamId)

    currentTeam.removePair(pairId)
    newTeam.addPair(currentPair)

    await this.userRepo.updateTeam(currentTeam)
    await this.userRepo.updateTeam(newTeam)
  }
}
