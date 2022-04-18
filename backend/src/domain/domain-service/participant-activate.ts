import { PrismaClient } from '@prisma/client'
import { Team } from 'src/domain/entity/team'
import { Pair } from 'src/domain/entity/pair'
import { Participant } from 'src/domain/entity/participant'
import { RemovedParticipant } from 'src/domain/entity/removed-participant'
import { IParticipantRepository } from 'src/app/repository-interface/participant-repository'
import { IRemovedParticipantRepository } from 'src/app/repository-interface/removed-participant-repository'
import { GetUnusedPairName } from 'src/domain/domain-service/get-unused-pair-name'
import { createRandomIdString } from 'src/util/random'

export class ParticipantActivate {
  private readonly prismaClient: PrismaClient
  private readonly participantRepo: IParticipantRepository
  private readonly removedParticipantRepo: IRemovedParticipantRepository

  public constructor(
    prismaClient: PrismaClient,
    participantRepo: IParticipantRepository,
    removedParticipantRepo: IRemovedParticipantRepository,
  ) {
    this.prismaClient = prismaClient
    this.participantRepo = participantRepo
    this.removedParticipantRepo = removedParticipantRepo
  }

  public async participantActivate(participantId: string) {
    const removedParticipant = await this.removedParticipantRepo.getRemovedParticipantByParticipantId(
      participantId,
    )

    if (!removedParticipant) {
      throw new Error('指定された参加者が見つかりませんでした.')
    }

    const activateParticipant = new Participant({
      id: removedParticipant.getId(),
      name: removedParticipant.getName(),
      email: removedParticipant.getEmail(),
    })

    const targetTeam = await this.participantRepo.getTeamWithFewestParticipants()
    const targetPair = targetTeam.getPairWithFewestParticipants()

    // ペアに参加させた結果、ペアの定員を超えてしまわないか確認する
    if (
      targetPair.getParticipantCount() > Pair.MAXIMUM_NUMBER_OF_PARTICIPANTS
    ) {
      // ペアの定員を超えてしまう場合、最も参加人数が少ないペアのうち1人と新規参加者で新しいペアを作成する
      const participants = targetPair.getParticipants()
      const choicedParticipant = participants[0]
      targetPair.removeParticipant(choicedParticipant!.getId())

      const GetUnusedPairNameService = new GetUnusedPairName(
        this.participantRepo,
      )

      const newPair = new Pair({
        id: createRandomIdString(),
        name: await GetUnusedPairNameService.getUnusedPairName(
          targetTeam.getId(),
        ),
        participants: [choicedParticipant!, activateParticipant],
      })
      targetTeam.addPair(newPair)
    } else {
      // ペアの定員を超えない場合、最も参加人数の少ないペアに参加者を所属させる
      targetPair.addParticipant(activateParticipant)
    }

    targetTeam.removePair(targetPair.getId())
    targetTeam.addPair(targetPair)

    // 更新したエンティティの永続化に使用するクエリを取得する
    const deleteRemovedParticipantQuery = this.getDeleteRemovedParticipantQuery(
      removedParticipant,
    )
    const deleteTeamQuery = this.getDeleteTeamQuery(targetTeam)
    const createTeamQuery = this.getCreateTeamQuery(targetTeam)

    await this.prismaClient.$transaction([
      deleteRemovedParticipantQuery,
      deleteTeamQuery,
      createTeamQuery,
    ])
  }

  private getDeleteRemovedParticipantQuery(
    removedParticipant: RemovedParticipant,
  ) {
    const deleteRemovedParticipantQuery = this.prismaClient.removedParticipant.delete(
      {
        where: { id: removedParticipant.getId() },
      },
    )

    return deleteRemovedParticipantQuery
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
              participants: {
                create: pair.getParticipants().map((participant) => {
                  return {
                    id: participant.getId(),
                    name: participant.getName(),
                    email: participant.getEmail(),
                    statusId: participant.getStatusId(),
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
