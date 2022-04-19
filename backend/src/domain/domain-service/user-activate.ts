import { PrismaClient } from '@prisma/client'
import { Team } from 'src/domain/entity/team'
import { Pair } from 'src/domain/entity/pair'
import { User } from 'src/domain/entity/user'
import { RemovedUser } from 'src/domain/entity/removed-user'
import { IUserRepository } from 'src/app/repository-interface/user-repository'
import { IRemovedUserRepository } from 'src/app/repository-interface/removed-user-repository'
import { createRandomIdString } from 'src/util/random'

export class UserActivate {
  private readonly prismaClient: PrismaClient
  private readonly userRepo: IUserRepository
  private readonly removedUserRepo: IRemovedUserRepository

  public constructor(
    prismaClient: PrismaClient,
    userRepo: IUserRepository,
    removedUserRepo: IRemovedUserRepository,
  ) {
    this.prismaClient = prismaClient
    this.userRepo = userRepo
    this.removedUserRepo = removedUserRepo
  }

  public async userActivate(userId: string) {
    const removedUser = await this.removedUserRepo.getRemovedUserByUserId(
      userId,
    )

    if (!removedUser) {
      throw new Error('指定された参加者が見つかりませんでした.')
    }

    const activateUser = new User({
      id: removedUser.getId(),
      name: removedUser.getName(),
      email: removedUser.getEmail(),
    })

    const targetTeam = await this.userRepo.getTeamWithFewestUsers()
    const targetPair = targetTeam.getPairWithFewestUsers()

    // ペアに参加させた結果、ペアの定員を超えてしまわないか確認する
    if (targetPair.getUserCount() > Pair.MAXIMUM_NUMBER_OF_PARTICIPANTS) {
      // ペアの定員を超えてしまう場合、最も参加人数が少ないペアのうち1人と新規参加者で新しいペアを作成する
      const users = targetPair.getUsers()
      const choicedUser = users[0]
      targetPair.removeUser(choicedUser!.getId())

      const newPair = new Pair({
        id: createRandomIdString(),
        name: targetTeam.getUnusedPairName(),
        users: [choicedUser!, activateUser],
      })
      targetTeam.addPair(newPair)
    } else {
      // ペアの定員を超えない場合、最も参加人数の少ないペアに参加者を所属させる
      targetPair.addUser(activateUser)
    }

    targetTeam.removePair(targetPair.getId())
    targetTeam.addPair(targetPair)

    // 更新したエンティティの永続化に使用するクエリを取得する
    const deleteRemovedUserQuery = this.getDeleteRemovedUserQuery(removedUser)
    const deleteTeamQuery = this.getDeleteTeamQuery(targetTeam)
    const createTeamQuery = this.getCreateTeamQuery(targetTeam)

    await this.prismaClient.$transaction([
      deleteRemovedUserQuery,
      deleteTeamQuery,
      createTeamQuery,
    ])
  }

  private getDeleteRemovedUserQuery(removedUser: RemovedUser) {
    const deleteRemovedUserQuery = this.prismaClient.removedUser.delete({
      where: { id: removedUser.getId() },
    })

    return deleteRemovedUserQuery
  }

  private getDeleteTeamQuery(team: Team) {
    const deleteTeamQuery = this.prismaClient.team.delete({
      where: { id: team.getId() },
    })

    return deleteTeamQuery
  }

  private getCreateTeamQuery(team: Team) {
    const { id, name, pairs } = team.getAllProperties()

    const createTeamQuery = this.prismaClient.team.create({
      data: {
        id: id,
        name: name.getValue(),
        pairs: {
          create: pairs.map((pair) => {
            return {
              id: pair.getId(),
              name: pair.getName(),
              users: {
                create: pair.getUsers().map((user) => {
                  return {
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    statusId: user.getStatusId(),
                  }
                }),
              },
            }
          }),
        },
      },
    })

    return createTeamQuery
  }
}
