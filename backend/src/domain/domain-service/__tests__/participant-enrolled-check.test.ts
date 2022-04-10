import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { ParticipantQS } from 'src/infra/db/query-service/participant-qs'
import { RemovedParticipantRepository } from 'src/infra/db/repository/removed-participant-repository'
import { ParticipantEnrolledCheck } from 'src/domain/domain-service/participant-enrolled-check'
import { Participant } from 'src/domain/entity/participant'
import { RemovedParticipant } from 'src/domain/entity/removed-participant'

jest.mock('@prisma/client')
jest.mock('src/infra/db/query-service/participant-qs')
jest.mock('src/infra/db/repository/removed-participant-repository')

describe('do', () => {
  let mockParticipantQS: MockedObjectDeep<ParticipantQS>
  let mockRemovedParticipantRepository: MockedObjectDeep<RemovedParticipantRepository>

  beforeAll(() => {
    const prisma = new PrismaClient()
    mockParticipantQS = mocked(new ParticipantQS(prisma), true)
    mockRemovedParticipantRepository = mocked(
      new RemovedParticipantRepository(prisma),
      true,
    )
  })

  it('指定された参加者が在籍中である場合、trueが返ること', async () => {
    mockParticipantQS.getParticipantByParticipantId.mockResolvedValueOnce(
      new Participant({
        id: '1',
        name: 'Bob',
        email: 'bob@example.com',
        statusId: '1',
      }),
    )

    const ParticipantEnrolledCheckService = new ParticipantEnrolledCheck(
      mockParticipantQS,
      mockRemovedParticipantRepository,
    )

    return expect(
      ParticipantEnrolledCheckService.isEnrolled('1'),
    ).resolves.toBe(true)
  })

  it('指定された参加者が在籍中でない場合、falseが返ること', async () => {
    mockParticipantQS.getParticipantByEmail.mockResolvedValueOnce(null)
    mockRemovedParticipantRepository.getRemovedParticipantByParticipantId.mockResolvedValueOnce(
      new RemovedParticipant({
        id: '1',
        name: 'Bob',
        email: 'bob@example.com',
        statusId: '2',
      }),
    )

    const ParticipantEnrolledCheckService = new ParticipantEnrolledCheck(
      mockParticipantQS,
      mockRemovedParticipantRepository,
    )

    return expect(
      ParticipantEnrolledCheckService.isEnrolled('1'),
    ).resolves.toBe(false)
  })

  it('指定された参加者が存在しない場合、例外がthrowされること', async () => {
    mockParticipantQS.getParticipantByEmail.mockResolvedValueOnce(null)
    mockRemovedParticipantRepository.getRemovedParticipantByParticipantId.mockResolvedValueOnce(
      null,
    )

    const ParticipantEnrolledCheckService = new ParticipantEnrolledCheck(
      mockParticipantQS,
      mockRemovedParticipantRepository,
    )

    return expect(
      ParticipantEnrolledCheckService.isEnrolled('1'),
    ).rejects.toThrow()
  })
})
