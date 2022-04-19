import { IUserRepository } from 'src/app/repository-interface/user-repository'

export class GetUnusedPairName {
  private readonly usablePairNames: string[] = [...'abcdefghijklmnopqrstuvwxyz']

  private readonly userRepo: IUserRepository

  public constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo
  }

  public async getUnusedPairName(teamId: string): Promise<string> {
    const targetTeam = await this.userRepo.getTeamByTeamId(teamId)

    const usedPairNames = targetTeam.getPairs().map((pair) => pair.getName())

    const unusedPairNames = this.usablePairNames.filter(
      (pairName) => !usedPairNames.includes(pairName),
    )

    const unusedPairName = unusedPairNames.shift()

    if (typeof unusedPairName !== 'undefined') {
      return unusedPairName!
    } else {
      throw new Error('使用可能なペア名がありません.')
    }
  }
}
