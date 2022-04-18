import { PrismaClient } from '@prisma/client'
import { ParticipantStatus } from 'src/domain/entity/participant-status-id-vo'
import { RemovedParticipantStatus } from 'src/domain/entity/removed-participant-status-id-vo'
import { IParticipantQS } from 'src/app/query-service-interface/participant-qs'
import { IParticipantRepository } from './repository-interface/participant-repository'
import { IRemovedParticipantRepository } from './repository-interface/removed-participant-repository'
import { ParticipantEnrolledCheck } from 'src/domain/domain-service/participant-enrolled-check'
import { ParticipantActivate } from 'src/domain/domain-service/participant-activate'
import { ParticipantDeactivate } from 'src/domain/domain-service/participant-deactivate'

export class UpdateParticipantUseCase {
  private readonly prismaClient: PrismaClient
  private readonly participantQS: IParticipantQS
  private readonly participantRepo: IParticipantRepository
  private readonly removedParticipantRepo: IRemovedParticipantRepository

  public constructor(
    prismaClient: PrismaClient,
    participantQS: IParticipantQS,
    participantRepo: IParticipantRepository,
    removedParticipantRepo: IRemovedParticipantRepository,
  ) {
    this.prismaClient = prismaClient
    this.participantQS = participantQS
    this.participantRepo = participantRepo
    this.removedParticipantRepo = removedParticipantRepo
  }

  public async do(params: { id: string; statusId: string }) {
    const { id, statusId } = params

    if (statusId === ParticipantStatus.Enrolled) {
      // RemovedParticipant -> Participant
      const participantActivateService = new ParticipantActivate(
        this.prismaClient,
        this.participantRepo,
        this.removedParticipantRepo,
      )

      await participantActivateService.participantActivate(id)
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
        const participantDeactivateService = new ParticipantDeactivate(
          this.participantRepo,
          this.removedParticipantRepo,
        )

        await participantDeactivateService.participantDeactivate(id, statusId)
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
