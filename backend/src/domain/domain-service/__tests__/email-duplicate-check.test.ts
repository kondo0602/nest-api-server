import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { ParticipantQS } from 'src/infra/db/query-service/participant-qs'
import { EmailDuplicateCheck } from '../email-duplicate-check'
import { Participant } from '../../entity/participant'

jest.mock('@prisma/client')
jest.mock('src/infra/db/query-service/participant-qs')

describe('do', () => {
  let mockParticipantQS: MockedObjectDeep<ParticipantQS>

  beforeAll(() => {
    const prisma = new PrismaClient()
    mockParticipantQS = mocked(new ParticipantQS(prisma), true)
  })

  it('既に登録されているメールアドレスである場合、trueが返ること', () => {
    mockParticipantQS.getParticipantByEmail.mockResolvedValueOnce(
      new Participant({
        id: '1',
        name: 'Bob',
        email: 'bob@example.com',
      }),
    )

    const EmailDuplicateCheckService = new EmailDuplicateCheck(
      mockParticipantQS,
    )

    return expect(
      EmailDuplicateCheckService.isDuplicated('bob@example.com'),
    ).resolves.toBe(true)
  })

  it('未登録のメールアドレスである場合、falseが返ること', () => {
    mockParticipantQS.getParticipantByEmail.mockResolvedValueOnce(null)

    const EmailDuplicateCheckService = new EmailDuplicateCheck(
      mockParticipantQS,
    )

    return expect(
      EmailDuplicateCheckService.isDuplicated('bob@example.com'),
    ).resolves.toBe(false)
  })
})
