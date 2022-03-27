import { PrismaClient } from '@prisma/client'
import { IParticipantRepository } from 'src/app/repository-interface/participant-repository'
import {
  Participant,
  ParticipantStatusIdVO,
} from 'src/domain/entity/participant'
import { Pair } from 'src/domain/entity/pair'
import { Team } from 'src/domain/entity/team'
import { prisma } from '@testUtil/prisma'

export class ParticipantRepository implements IParticipantRepository {
  private prismaClient: PrismaClient

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async save(participantEntity: Participant): Promise<Participant> {
    const {
      id,
      name,
      email,
      statusId,
      pairId,
    } = participantEntity.getAllProperties()

    const savedParticipantDatamodel = await this.prismaClient.participant.create(
      {
        data: {
          id,
          name,
          email,
          statusId,
          pairId,
        },
      },
    )
    const savedParticipantEntity = new Participant({
      ...savedParticipantDatamodel,
    })
    return savedParticipantEntity
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
                    ...participant,
                  }),
              ),
              teamId: pair.teamId,
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
        name: team.id,
        pairs: team.pairs.map(
          (pair) =>
            new Pair({
              id: pair.id,
              name: pair.name,
              participants: pair.participants.map(
                (participant) =>
                  new Participant({
                    ...participant,
                  }),
              ),
              teamId: pair.teamId,
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
        name: team.id,
        pairs: team.pairs.map(
          (pair) =>
            new Pair({
              id: pair.id,
              name: pair.name,
              participants: pair.participants.map(
                (participant) =>
                  new Participant({
                    ...participant,
                  }),
              ),
              teamId: pair.teamId,
            }),
        ),
      })
    } else {
      throw new Error('指定された参加者が所属するチームが見つかりませんでした.')
    }
  }

  public async updateParticipant(
    participantEntity: Participant,
  ): Promise<Participant> {
    const {
      id,
      name,
      email,
      statusId,
      pairId,
    } = participantEntity.getAllProperties()

    const updatedParticipantDatamodel = await this.prismaClient.participant.update(
      {
        where: {
          id: id,
        },
        data: {
          name,
          email,
          statusId,
          pairId,
        },
      },
    )
    const updatedParticipantEntity = new Participant({
      ...updatedParticipantDatamodel,
    })
    return updatedParticipantEntity
  }

  public async updateTeam(teamEntity: Team): Promise<Team> {
    const { id, name, pairs } = teamEntity.getAllProperties()

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

    await this.prismaClient.$transaction([deleteTeam, createTeam])

    return teamEntity
  }
}
