import { ITeamRepository } from 'src/app/repository-interface/team-repository'

export class ChangePair {
  private readonly userRepo: ITeamRepository

  public constructor(userRepo: ITeamRepository) {
    this.userRepo = userRepo
  }

  public async changePair(userId: string, pairId: string) {
    const targetTeam = await this.userRepo.getTeamByUserId(userId)
    const currentPair = targetTeam.getPairByUserId(userId)
    const targetPair = targetTeam.getPairByPairId(pairId)
    const targetUser = currentPair.getUserByUserId(userId)

    currentPair.removeUser(userId)
    targetPair.addUser(targetUser)

    targetTeam.removePair(currentPair.getId())
    targetTeam.addPair(currentPair)

    targetTeam.removePair(currentPair.getId())
    targetTeam.addPair(currentPair)

    await this.userRepo.updateTeam(targetTeam)
  }
}
