import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { ParticipantRepository } from '../../../infra/db/repository/participant-repository'
import { ChangeTeam } from '../change-team'
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

    mockParticipantRepo.getTeamByPairId.mockResolvedValueOnce(
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

    mockParticipantRepo.getTeamByTeamId.mockResolvedValueOnce(
      new Team({
        id: '2',
        name: '2',
        pairs: [
          new Pair({
            id: '3',
            name: 'c',
            participants: [
              new Participant({
                id: '5',
                name: 'Bob',
                email: 'bob@example.com',
                statusId: '1',
                pairId: '3',
              }),
            ],
            teamId: '2',
          }),
          new Pair({ id: '4', name: 'd', participants: [], teamId: '2' }),
        ],
      }),
    )
  })

  it('他のチームへの移動の場合、例外が発生しないこと', async () => {
    const ChangeTeamService = new ChangeTeam(mockParticipantRepo)

    return expect(ChangeTeamService.changeTeam('1', '2')).resolves.toBe(
      undefined,
    )
  })
})
