import { IUserRepository } from '../../app/repository-interface/user-repository'

export class ChangePair {
  private readonly userRepo: IUserRepository

  public constructor(userRepo: IUserRepository) {
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
