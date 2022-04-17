import { PrismaClient } from '@prisma/client'
import { ParticipantRepository } from 'src/infra/db/repository/participant-repository'
import { RemovedParticipantRepository } from 'src/infra/db/repository/removed-participant-repository'
import { ParticipantActivate } from '../participant-activate'
import { Participant } from 'src/domain/entity/participant'
import { RemovedParticipant } from 'src/domain/entity/removed-participant'

describe('do', () => {
  const prisma = new PrismaClient()
  const participantRepo = new ParticipantRepository(prisma)
  const removedParticipantRepo = new RemovedParticipantRepository(prisma)
  const participantActivateService = new ParticipantActivate(
    prisma,
    participantRepo,
    removedParticipantRepo,
  )

  it('対象の休会/退会参加者が存在する場合、①参加者として追加され ②休会/退会参加者からは削除されること', async () => {
    const removedParticipantId = '9'

    await participantActivateService.participantActivate(removedParticipantId)

    const targetTeam = await participantRepo.getTeamByParticipantId(
      removedParticipantId,
    )
    const targetPair = targetTeam.getPairByParticipantId(removedParticipantId)

    expect(
      targetPair.getParticipantByParticipantId(removedParticipantId),
    ).toBeInstanceOf(Participant) // ①

    await expect(
      removedParticipantRepo.getRemovedParticipantByParticipantId(
        removedParticipantId,
      ),
    ).resolves.toBeNull() // ②
  })

  it('復帰した参加者の追加に失敗した場合、①participantActivateでエラーが発生し ②休会/退会参加者の削除も行われないこと', async () => {
    // Participantテーブルにも存在するIDを指定し、Participantテーブルへの挿入を失敗させる
    const removedParticipantId = '8'

    await expect(
      participantActivateService.participantActivate(removedParticipantId),
    ).rejects.toThrow() // ①

    await expect(
      removedParticipantRepo.getRemovedParticipantByParticipantId(
        removedParticipantId,
      ),
    ).resolves.toBeInstanceOf(RemovedParticipant) // ②
  })
})
