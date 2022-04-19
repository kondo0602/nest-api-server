import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { UserQS } from 'src/infra/db/query-service/user-qs'
import { UserRepository } from 'src/infra/db/repository/user-repository'
import { PostUserUseCase } from '../post-user-usecase'
import { Team } from 'src/domain/entity/team'
import { Pair } from 'src/domain/entity/pair'

jest.mock('@prisma/client')
jest.mock('src/infra/db/query-service/user-qs')
jest.mock('src/infra/db/repository/user-repository')

describe('do', () => {
  let mockUserQS: MockedObjectDeep<UserQS>
  let mockUserRepo: MockedObjectDeep<UserRepository>

  beforeAll(() => {
    const prisma = new PrismaClient()
    mockUserQS = mocked(new UserQS(prisma), true)
    mockUserRepo = mocked(new UserRepository(prisma), true)
  })

  it('例外が発生しないこと', () => {
    mockUserRepo.getTeamByPairId.mockResolvedValueOnce(
      new Team({
        id: '1',
        name: '1',
        pairs: [new Pair({ id: '1', name: 'a', users: [] })],
      }),
    )

    const usecase = new PostUserUseCase(mockUserQS, mockUserRepo)

    return expect(
      usecase.do({
        name: 'Bob',
        email: 'bob@example.com',
        pairId: '1',
      }),
    ).resolves.toBe(undefined)
  })
})
