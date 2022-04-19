import { User } from 'src/domain/entity/user'
import { createRandomIdString } from 'src/util/random'
import { IUserQS } from './query-service-interface/user-qs'
import { IUserRepository } from './repository-interface/user-repository'
import { EmailDuplicateCheck } from '../domain/domain-service/email-duplicate-check'

export class PostUserUseCase {
  private readonly userQS: IUserQS
  private readonly userRepo: IUserRepository

  public constructor(userQS: IUserQS, userRepo: IUserRepository) {
    this.userQS = userQS
    this.userRepo = userRepo
  }

  public async do(params: { name: string; email: string; pairId: string }) {
    const { name, email, pairId } = params

    const EmailDuplicateCheckService = new EmailDuplicateCheck(this.userQS)

    if (await EmailDuplicateCheckService.isDuplicated(email)) {
      throw new Error('登録済みのメールアドレスです.')
    }

    const userEntity = new User({
      id: createRandomIdString(),
      name,
      email,
    })

    const targetTeam = await this.userRepo.getTeamByPairId(pairId)
    const targetPair = targetTeam.getPairByPairId(pairId)

    targetPair.addUser(userEntity)

    targetTeam.removePair(pairId)
    targetTeam.addPair(targetPair)

    await this.userRepo.updateTeam(targetTeam)
  }
}
