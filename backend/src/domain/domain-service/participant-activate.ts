import { Pair } from 'src/domain/entity/pair'
import { Participant } from 'src/domain/entity/participant'
import { IParticipantRepository } from 'src/app/repository-interface/participant-repository'
import { IRemovedParticipantRepository } from 'src/app/repository-interface/removed-participant-repository'
import { createRandomIdString } from 'src/util/random'

export class ParticipantActivate {
  private readonly participantRepo: IParticipantRepository
  private readonly removedParticipantRepo: IRemovedParticipantRepository

  public constructor(
    participantRepo: IParticipantRepository,
    removedParticipantRepo: IRemovedParticipantRepository,
  ) {
    this.participantRepo = participantRepo
    this.removedParticipantRepo = removedParticipantRepo
  }

  public async participantActivate(participantId: string) {
    const removedParticipant = await this.removedParticipantRepo.getRemovedParticipantByParticipantId(
      participantId,
    )

    if (!removedParticipant) {
      throw new Error('指定された参加者が見つかりませんでした.')
    }

    await this.removedParticipantRepo.deleteRemovedParticipant(participantId)

    const activateParticipant = new Participant({
      id: removedParticipant.getId(),
      name: removedParticipant.getName(),
      email: removedParticipant.getEmail(),
    })

    const targetTeam = await this.participantRepo.getTeamWithFewestParticipants()
    const targetPair = targetTeam.getPairWithFewestParticipants()

    // ペアに参加させた結果、ペアの人数が4人になってしまわないか確認する
    if (targetPair.getParticipantCount() === 3) {
      // 4人になる場合、最も参加人数が少ないペアのうち1人と新規参加者で新しいペアを作成する
      const participants = targetPair.getParticipants()
      const choicedParticipant = participants[0]
      targetPair.removeParticipant(choicedParticipant!.getId())

      const newPair = new Pair({
        id: createRandomIdString(),
        name: 'z',
        participants: [choicedParticipant!, activateParticipant],
      })
      targetTeam.addPair(newPair)
    } else {
      // 4人にならない場合、最も参加人数の少ないペアに参加者を所属させる
      targetPair.addParticipant(activateParticipant)
    }

    targetTeam.removePair(targetPair.getId())
    targetTeam.addPair(targetPair)

    await this.participantRepo.updateTeam(targetTeam)
  }
}
