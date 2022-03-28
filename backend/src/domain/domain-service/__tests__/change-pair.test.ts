import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { ParticipantRepository } from '../../../infra/db/repository/participant-repository'
import { ChangePair } from '../change-pair'
import { Team } from '../../entity/team'
import { Pair } from '../../entity/pair'
import { Participant } from '../../entity/participant'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/participant-repository')

describe('do', () => {
  let mockParticipantRepo: MockedObjectDeep<ParticipantRepository>

  beforeAll(() => {
    const prisma = new PrismaClient()
    mockParticipantRepo = mocked(new ParticipantRepository(prisma), true)

    mockParticipantRepo.getTeamByParticipantId.mockResolvedValueOnce(
      new Team({
        id: '1',
        name: '1',
        pairs: [
          new Pair({
            id: '1',
            name: 'a',
            participants: [
              new Participant({
                id: '1',
                name: 'Bob',
                email: 'bob@example.com',
                statusId: '1',
                pairId: '1',
              }),
            ],
            teamId: '1',
          }),
          new Pair({ id: '2', name: 'b', participants: [], teamId: '1' }),
        ],
      }),
    )
  })

  it('同じチームに所属するペアへの移動の場合、例外が発生しないこと', async () => {
    const ChangePairService = new ChangePair(mockParticipantRepo)

    return expect(ChangePairService.changePair('1', '2')).resolves.toBe(
      undefined,
    )
  })
})
