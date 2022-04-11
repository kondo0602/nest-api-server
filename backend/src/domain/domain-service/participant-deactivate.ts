import { RemovedParticipant } from 'src/domain/entity/removed-participant'
import { IParticipantRepository } from 'src/app/repository-interface/participant-repository'
import { IRemovedParticipantRepository } from 'src/app/repository-interface/removed-participant-repository'

export class ParticipantDeactivate {
  private readonly participantRepo: IParticipantRepository
  private readonly removedParticipantRepo: IRemovedParticipantRepository

  public constructor(
    participantRepo: IParticipantRepository,
    removedParticipantRepo: IRemovedParticipantRepository,
  ) {
    this.participantRepo = participantRepo
    this.removedParticipantRepo = removedParticipantRepo
  }

  public async participantDeactivate(id: string, statusId: string) {
    const targetTeam = await this.participantRepo.getTeamByParticipantId(id)
    const targetPair = targetTeam.getPairByParticipantId(id)
    const targetParticipant = targetPair.getParticipantByParticipantId(id)

    // TODO: 参加者の減少でチームが2名以下になってしまう場合、管理者にメールが送信されるように修正
    // TODO: 参加者の減少でペアが1名以下になってしまう場合、残った参加者が自動的に他のペアに合流するように修正
    targetPair.removeParticipant(id)
    targetTeam.removePair(targetPair.getId())
    targetTeam.addPair(targetPair)

    this.participantRepo.updateTeam(targetTeam)

    const removedParticipant = new RemovedParticipant({
      id: targetParticipant.getId(),
      name: targetParticipant.getName(),
      email: targetParticipant.getEmail(),
      statusId: statusId,
    })

    this.removedParticipantRepo.createRemovedParticipant(removedParticipant)
  }
}
