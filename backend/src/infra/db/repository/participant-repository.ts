import { PrismaClient } from '@prisma/client'
import { IParticipantRepository } from 'src/app/repository-interface/participant-repository'
import { Participant } from 'src/domain/entity/participant'
import { Pair } from 'src/domain/entity/pair'
import { Team } from 'src/domain/entity/team'

export class ParticipantRepository implements IParticipantRepository {
  private prismaClient: PrismaClient

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getTeamByTeamId(teamId: string): Promise<Team> {
    const team = await this.prismaClient.team.findUnique({
      where: {
        id: teamId,
      },
      include: {
        pairs: {
          include: {
            participants: true,
          },
        },
      },
    })

    if (team) {
      return new Team({
        id: team.id,
        name: team.name,
        pairs: team.pairs.map(
          (pair) =>
            new Pair({
              id: pair.id,
              name: pair.name,
              participants: pair.participants.map(
                (participant) =>
                  new Participant({
                    id: participant.id,
                    name: participant.name,
                    email: participant.email,
                    statusId: participant.statusId,
                  }),
              ),
            }),
        ),
      })
    } else {
      throw new Error('指定されたチームが見つかりませんでした.')
    }
  }

  public async getTeamByPairId(pairId: string): Promise<Team> {
    const team = await this.prismaClient.team.findFirst({
      where: {
        pairs: {
          some: {
            id: pairId,
          },
        },
      },
      include: {
        pairs: {
          include: {
            participants: true,
          },
        },
      },
    })

    if (team) {
      return new Team({
        id: team.id,
        name: team.name,
        pairs: team.pairs.map(
          (pair) =>
            new Pair({
              id: pair.id,
              name: pair.name,
              participants: pair.participants.map(
                (participant) =>
                  new Participant({
                    id: participant.id,
                    name: participant.name,
                    email: participant.email,
                    statusId: participant.statusId,
                  }),
              ),
            }),
        ),
      })
    } else {
      throw new Error('指定されたペアが所属するチームが見つかりませんでした.')
    }
  }

  public async getTeamByParticipantId(participantId: string): Promise<Team> {
    const team = await this.prismaClient.team.findFirst({
      where: {
        pairs: {
          some: {
            participants: {
              some: {
                id: participantId,
              },
            },
          },
        },
      },
      include: {
        pairs: {
          include: {
            participants: true,
          },
        },
      },
    })

    if (team) {
      return new Team({
        id: team.id,
        name: team.name,
        pairs: team.pairs.map(
          (pair) =>
            new Pair({
              id: pair.id,
              name: pair.name,
              participants: pair.participants.map(
                (participant) =>
                  new Participant({
                    id: participant.id,
                    name: participant.name,
                    email: participant.email,
                    statusId: participant.statusId,
                  }),
              ),
            }),
        ),
      })
    } else {
      throw new Error('指定された参加者が所属するチームが見つかりませんでした.')
    }
  }

  public async updateTeam(teamEntity: Team): Promise<Team> {
    const { id, name, pairs } = teamEntity.getAllProperties()

    const tmpParticipantOnTask = await this.prismaClient.participantOnTask.findMany(
      {
        where: {
          participantId: {
            in: teamEntity
              .getPairs()
              .map((pair) => {
                return pair
                  .getParticipants()
                  .map((participant) => participant.getId())
              })
              .reduce((acc, val) => acc.concat(val), []),
          },
        },
      },
    )

    const deleteTeam = this.prismaClient.team.delete({
      where: { id: id },
    })

    const createTeam = this.prismaClient.team.create({
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

    const createParticipantOnTask = this.prismaClient.participantOnTask.createMany(
      {
        data: tmpParticipantOnTask,
      },
    )

    await this.prismaClient.$transaction([
      deleteTeam,
      createTeam,
      createParticipantOnTask,
    ])

    return teamEntity
  }
}
