import { Participant } from 'src/domain/entity/participant'
import { ParticipantStatus } from 'src/domain/entity/participant-status-id-vo'
import { RemovedParticipant } from 'src/domain/entity/removed-participant'
import { RemovedParticipantStatus } from 'src/domain/entity/removed-participant-status-id-vo'
import { IParticipantQS } from 'src/app/query-service-interface/participant-qs'
import { IParticipantRepository } from './repository-interface/participant-repository'
import { IRemovedParticipantRepository } from './repository-interface/removed-participant-repository'
import { ParticipantEnrolledCheck } from 'src/domain/domain-service/participant-enrolled-check'

export class UpdateParticipantUseCase {
  private readonly participantQS: IParticipantQS
  private readonly participantRepo: IParticipantRepository
  private readonly removedParticipantRepo: IRemovedParticipantRepository

  public constructor(
    participantQS: IParticipantQS,
    participantRepo: IParticipantRepository,
    removedParticipantRepo: IRemovedParticipantRepository,
  ) {
    this.participantQS = participantQS
    this.participantRepo = participantRepo
    this.removedParticipantRepo = removedParticipantRepo
  }

  public async do(params: { id: string; statusId: string }) {
    const { id, statusId } = params

    if (statusId === ParticipantStatus.Enrolled) {
      // RemovedParticipant -> Participant
      const removedParticipant = await this.removedParticipantRepo.getRemovedParticipantByParticipantId(
        id,
      )

      if (!removedParticipant) {
        throw new Error('指定された参加者が見つかりませんでした.')
      }

      await this.removedParticipantRepo.deleteRemovedParticipant(id)

      const participant = new Participant({
        id: removedParticipant.getId(),
        name: removedParticipant.getName(),
        email: removedParticipant.getEmail(),
      })

      // TODO: 最も参加人数が少ないチームの中で、最も参加人数が少ないペアから自動的に自動敵に参加先が選択されるように修正
      // TODO: ペアへの参加によってペアが4名になってしまう場合、自動的に2つのペアに分解されるように修正
      const targetTeam = await this.participantRepo.getTeamByTeamId(
        'f17d89e1-ab4a-498d-a419-cf03a1cb3b67',
      )
      const targetPair = targetTeam.getPairByPairId(
        'd69df444-7533-47a9-944d-fb28fa94a33d',
      )

      targetPair.addParticipant(participant)
      targetTeam.removePair(targetPair.getId())
      targetTeam.addPair(targetPair)

      await this.participantRepo.updateTeam(targetTeam)
    } else if (
      statusId === RemovedParticipantStatus.Pending ||
      statusId === RemovedParticipantStatus.Withdrawn
    ) {
      const participantEnrolledCheckService = new ParticipantEnrolledCheck(
        this.participantQS,
        this.removedParticipantRepo,
      )

      if (await participantEnrolledCheckService.isEnrolled(id)) {
        // Participant -> RemovedParticipant
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
      } else {
        // RemovedParticipant -> RemovedParticipant
        const targetParticipant = await this.removedParticipantRepo.getRemovedParticipantByParticipantId(
          id,
        )

        if (!targetParticipant) {
          throw new Error('指定された参加者が見つかりませんでした.')
        }

        targetParticipant.updateStatusId(statusId)

        this.removedParticipantRepo.updateRemovedParticipant(targetParticipant)
      }
    } else {
      throw new Error(
        '変更するステータスは「在籍中」「休会中」「退会済」のいずれかを選択してください.',
      )
    }
  }
}
