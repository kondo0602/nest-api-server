import { PrismaClient } from '@prisma/client'
import { UserRepository } from 'src/infra/db/repository/user-repository'
import { RemovedUserRepository } from 'src/infra/db/repository/removed-user-repository'
import { UserActivate } from 'src/domain/domain-service/user-activate'
import { User } from 'src/domain/entity/user'
import { RemovedUser } from 'src/domain/entity/removed-user'

describe('do', () => {
  const prisma = new PrismaClient()
  const userRepo = new UserRepository(prisma)
  const removedUserRepo = new RemovedUserRepository(prisma)
  const userActivateService = new UserActivate(
    prisma,
    userRepo,
    removedUserRepo,
  )

  it('対象の休会/退会参加者が存在する場合、①参加者として追加され ②休会/退会参加者からは削除されること', async () => {
    const removedUserId = '9'

    await userActivateService.userActivate(removedUserId)

    const targetTeam = await userRepo.getTeamByUserId(removedUserId)
    const targetPair = targetTeam.getPairByUserId(removedUserId)

    expect(targetPair.getUserByUserId(removedUserId)).toBeInstanceOf(User) // ①

    await expect(
      removedUserRepo.getRemovedUserByUserId(removedUserId),
    ).resolves.toBeNull() // ②
  })

  it('復帰した参加者の追加に失敗した場合、①userActivateでエラーが発生し ②休会/退会参加者の削除も行われないこと', async () => {
    // Userテーブルにも存在するIDを指定し、Userテーブルへの挿入を失敗させる
    const removedUserId = '8'

    await expect(
      userActivateService.userActivate(removedUserId),
    ).rejects.toThrow() // ①

    await expect(
      removedUserRepo.getRemovedUserByUserId(removedUserId),
    ).resolves.toBeInstanceOf(RemovedUser) // ②
  })
})
