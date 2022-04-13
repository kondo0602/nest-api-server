import { IParticipantRepository } from 'src/app/repository-interface/participant-repository'

export class GetUnusedPairName {
  private readonly usablePairNames: string[] = [...'abcdefghijklmnopqrstuvwxyz']

  private readonly participantRepo: IParticipantRepository

  public constructor(participantRepo: IParticipantRepository) {
    this.participantRepo = participantRepo
  }

  public async getUnusedPairName(teamId: string): Promise<string> {
    const targetTeam = await this.participantRepo.getTeamByTeamId(teamId)

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
