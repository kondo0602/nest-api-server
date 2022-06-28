import { Team } from 'src/domain/entity/team'
import { Pair } from 'src/domain/entity/pair'
import { RemovedUser } from 'src/domain/entity/removed-user'
import { ITeamRepository } from 'src/app/repository-interface/team-repository'
import { IRemovedUserRepository } from 'src/app/repository-interface/removed-user-repository'

export class UserDeactivate {
  private readonly userRepo: ITeamRepository
  private readonly removedUserRepo: IRemovedUserRepository

  public constructor(
    userRepo: ITeamRepository,
    removedUserRepo: IRemovedUserRepository,
  ) {
    this.userRepo = userRepo
    this.removedUserRepo = removedUserRepo
  }

  public async userDeactivate(id: string, statusId: string) {
    const targetTeam = await this.userRepo.getTeamByUserId(id)
    const targetPair = targetTeam.getPairByUserId(id)
    const targetUser = targetPair.getUserByUserId(id)

    targetTeam.removePair(targetPair.getId())

    // 休会 or 退会する参加者を削除する
    targetPair.removeUser(id)

    // 同じチームの中から最も参加人数が少ないペアを取得する
    const fewestPair = targetTeam.getPairs().length
      ? targetTeam.getPairWithFewestUsers()
      : null

    // 参加者が休会/退会したペア以外にも、チーム内にペアがいる場合
    if (fewestPair) {
      // 参加人数が少ないペアも定員で合流できない場合
      if (fewestPair.getUserCount() >= Pair.MAXIMUM_NUMBER_OF_PARTICIPANTS) {
        targetTeam.addPair(targetPair)
        // TODO: コンソール出力 -> 管理者へのメール送信に処理を変更する
        console.log(`${targetUser!.getName()}さんが抜けました.`)
        // 休会/退会によってペアが残された参加者1名になってしまう場合
      } else if (
        targetPair.getUserCount() < Pair.MINIIMUM_NUMBER_OF_PARTICIPANTS
      ) {
        const leftUser = targetPair.getFirstUser()
        fewestPair.addUser(leftUser)

        targetTeam.removePair(fewestPair.getId())
        targetTeam.addPair(fewestPair)
        // 休会/退会したペアがいなくなって終わりの場合
      } else {
        targetTeam.addPair(targetPair)
      }
      // チーム内に他のペアがいない場合
    } else {
      targetTeam.addPair(targetPair)
    }

    // 休会/退会によってチームが2名以下になる場合
    if (targetTeam.getUserCount() <= Team.MINIIMUM_NUMBER_OF_PARTICIPANTS) {
      // TODO: コンソール出力 -> 管理者へのメール送信に処理を変更する
      console.log(
        `${targetUser!.getName()}さんが抜けたことによって、チーム${targetTeam.getName()}が${targetTeam.getUserCount()}名になりました.`,
      )
    }

    this.userRepo.updateTeam(targetTeam)

    const removedUser = new RemovedUser({
      id: targetUser!.getId(),
      name: targetUser!.getName(),
      email: targetUser!.getEmail(),
      statusId: statusId,
    })

    this.removedUserRepo.createRemovedUser(removedUser)
  }
}
