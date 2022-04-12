import { Participant } from 'src/domain/entity/participant'
import { IParticipantRepository } from 'src/app/repository-interface/participant-repository'
import { IRemovedParticipantRepository } from 'src/app/repository-interface/removed-participant-repository'

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

    const participant = new Participant({
      id: removedParticipant.getId(),
      name: removedParticipant.getName(),
      email: removedParticipant.getEmail(),
    })

    // TODO: 最も参加人数が少ないチームの中で、最も参加人数が少ないペアから自動的に自動敵に参加先が選択されるように修正

    // 1. repositoryで最も参加人数が少ないチームを取得する
    const targetTeam = await this.participantRepo.getTeamWithFewestParticipants()

    // 2. 取得したチームが公開しているメソッドで最も参加人数の少ないペアを取得する
    const targetPair = targetTeam.getPairWithFewestParticipants()

    // 3. そのペアに参加者をaddして永続化する
    targetPair.addParticipant(participant)

    // const targetTeam = await this.participantRepo.getTeamByTeamId('1')
    // const targetPair = targetTeam.getPairByPairId('1')

    // TODO: ペアへの参加によってペアが4名になってしまう場合、自動的に2つのペアに分解されるように修正
    targetTeam.removePair(targetPair.getId())
    targetTeam.addPair(targetPair)

    await this.participantRepo.updateTeam(targetTeam)
  }
}
