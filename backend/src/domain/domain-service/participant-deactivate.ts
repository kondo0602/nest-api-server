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
    targetTeam.removePair(targetPair.getId())
    targetPair.removeParticipant(id)

    // 参加者の減少でペアが1名以下になる場合、残った参加者を同じチームの人数が少ないペアに合流させる
    if (targetPair.getParticipantCount() < 2) {
      // 同じチームの参加人数が少ないペア取得
      const fewestPair = targetTeam.getPairWithFewestParticipants()

      // 残されたペアの残された参加者取得
      const lonelyParticipants = targetPair.getParticipants()

      // 少ないペアにその参加者を移動させる
      lonelyParticipants.forEach((participant) =>
        fewestPair.addParticipant(participant),
      )

      // 残ったペアは消す
      targetTeam.removePair(targetPair.getId())

      targetTeam.removePair(fewestPair.getId())
      targetTeam.addPair(fewestPair)
    } else {
      targetTeam.addPair(targetPair)
    }

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
