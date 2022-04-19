import { PrismaClient } from '@prisma/client'
import { UserStatus } from 'src/domain/entity/user-status-id-vo'
import { RemovedUserStatus } from 'src/domain/entity/removed-user-status-id-vo'
import { IUserQS } from 'src/app/query-service-interface/user-qs'
import { IUserRepository } from './repository-interface/user-repository'
import { IRemovedUserRepository } from './repository-interface/removed-user-repository'
import { UserEnrolledCheck } from 'src/domain/domain-service/user-enrolled-check'
import { UserActivate } from 'src/domain/domain-service/user-activate'
import { UserDeactivate } from 'src/domain/domain-service/user-deactivate'

export class UpdateUserUseCase {
  private readonly prismaClient: PrismaClient
  private readonly userQS: IUserQS
  private readonly userRepo: IUserRepository
  private readonly removedUserRepo: IRemovedUserRepository

  public constructor(
    prismaClient: PrismaClient,
    userQS: IUserQS,
    userRepo: IUserRepository,
    removedUserRepo: IRemovedUserRepository,
  ) {
    this.prismaClient = prismaClient
    this.userQS = userQS
    this.userRepo = userRepo
    this.removedUserRepo = removedUserRepo
  }

  public async do(params: { id: string; statusId: string }) {
    const { id, statusId } = params

    if (statusId === UserStatus.Enrolled) {
      // RemovedUser -> User
      const userActivateService = new UserActivate(
        this.prismaClient,
        this.userRepo,
        this.removedUserRepo,
      )

      await userActivateService.userActivate(id)
    } else if (
      statusId === RemovedUserStatus.Pending ||
      statusId === RemovedUserStatus.Withdrawn
    ) {
      const userEnrolledCheckService = new UserEnrolledCheck(
        this.userQS,
        this.removedUserRepo,
      )

      if (await userEnrolledCheckService.isEnrolled(id)) {
        // User -> RemovedUser
        const userDeactivateService = new UserDeactivate(
          this.userRepo,
          this.removedUserRepo,
        )

        await userDeactivateService.userDeactivate(id, statusId)
      } else {
        // RemovedUser -> RemovedUser
        const targetUser = await this.removedUserRepo.getRemovedUserByUserId(id)

        if (!targetUser) {
          throw new Error('指定された参加者が見つかりませんでした.')
        }

        targetUser.updateStatusId(statusId)

        this.removedUserRepo.updateRemovedUser(targetUser)
      }
    } else {
      throw new Error(
        '変更するステータスは「在籍中」「休会中」「退会済」のいずれかを選択してください.',
      )
    }
  }
}
