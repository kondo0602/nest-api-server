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

    targetTeam.removePair(targetPair.getId())

    // 休会 or 退会する参加者を削除する
    targetPair.removeParticipant(id)

    // 同じチームの中から最も参加人数が少ないペアを取得する
    const fewestPair = targetTeam.getPairs().length
      ? targetTeam.getPairWithFewestParticipants()
      : null

    // 参加者が休会/退会したペア以外にも、チーム内にペアがいる場合
    if (fewestPair) {
      // 参加人数が少ないペアも定員で合流できない場合
      if (fewestPair.getParticipantCount() > 2) {
        targetTeam.addPair(targetPair)
        console.log('管理者宛にメール送信')
        // 休会/退会によってペアが残された参加者1名になってしまう場合
      } else if (targetPair.getParticipantCount() < 2) {
        const leftParticipants = targetPair.getParticipants()

        leftParticipants.forEach((participant) =>
          fewestPair.addParticipant(participant),
        )

        targetTeam.removePair(fewestPair.getId())
        targetTeam.addPair(fewestPair)
        // 休会/退会したペアがいなくなって終わりの場合
      } else {
        targetTeam.addPair(targetPair)
      }
      // チーム内に他のペアがいない場合
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
