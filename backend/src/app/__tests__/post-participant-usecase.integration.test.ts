import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { ParticipantQS } from 'src/infra/db/query-service/participant-qs'
import { ParticipantRepository } from 'src/infra/db/repository/participant-repository'
import { PostParticipantUseCase } from '../post-participant-usecase'
import { Team } from 'src/domain/entity/team'
import { Pair } from 'src/domain/entity/pair'

jest.mock('@prisma/client')
jest.mock('src/infra/db/query-service/participant-qs')
jest.mock('src/infra/db/repository/participant-repository')

describe('do', () => {
  let mockParticipantQS: MockedObjectDeep<ParticipantQS>
  let mockParticipantRepo: MockedObjectDeep<ParticipantRepository>

  beforeAll(() => {
    const prisma = new PrismaClient()
    mockParticipantQS = mocked(new ParticipantQS(prisma), true)
    mockParticipantRepo = mocked(new ParticipantRepository(prisma), true)
  })

  it('例外が発生しないこと', () => {
    mockParticipantRepo.getTeamByPairId.mockResolvedValueOnce(
      new Team({
        id: '1',
        name: '1',
        pairs: [new Pair({ id: '1', name: 'a', participants: [] })],
      }),
    )

    const usecase = new PostParticipantUseCase(
      mockParticipantQS,
      mockParticipantRepo,
    )

    return expect(
      usecase.do({
        name: 'Bob',
        email: 'bob@example.com',
        pairId: '1',
      }),
    ).resolves.toBe(undefined)
  })
})
