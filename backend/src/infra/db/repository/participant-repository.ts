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

    // const deleteParticipants = pairs.map((pair) => {
    //   return this.prismaClient.participant.deleteMany({
    //     where: {
    //       pairId: pair.getId(),
    //     },
    //   })
    // })

    // const deletePairs = this.prismaClient.pair.deleteMany({
    //   where: { teamId: id },
    // })

    // const deleteTeam = this.prismaClient.team.deleteMany({
    //   where: { id: id },
    // })

    // const createTeam = this.prismaClient.team.create({
    //   data: { id: id, name: name },
    // })

    // const createPair = pairs.map((pair) =>
    //   this.prismaClient.pair.create({
    //     data: {
    //       id: pair.getId(),
    //       name: pair.getName(),
    //       teamId: pair.getTeamId(),
    //     },
    //   }),
    // )

    // const createParticipants = pairs.map((pair) => {
    //   return pair.getParticipants().map((participant) => {
    //     return this.prismaClient.participant.create({
    //       data: {
    //         ...participant.getAllProperties(),
    //       },
    //     })
    //   })
    // })

    // await this.prismaClient.$transaction([
    //   deleteParticipants,
    //   deletePairs,
    //   deleteTeam,
    //   createTeam,
    //   createPair,
    //   createParticipants,
    // ])

    await this.prismaClient.team.upsert({
      where: {
        id: id,
      },
      update: {
        name: name,
      },
      create: {
        id: id,
        name: name,
      },
    })

    await prisma.$transaction(
      pairs.map((pair) => {
        return this.prismaClient.pair.upsert({
          where: {
            id: pair.getId(),
          },
          update: {
            teamId: id,
          },
          create: {
            id: pair.getId(),
            name: pair.getName(),
            teamId: id,
          },
        })
      }),
    )

    // TODO: participantsも当メソッドの中で更新できるようにする

    // await prisma.$transaction(
    //   pairs.map((pair) => {
    //     return pair.getParticipants().map((participant) => {
    //       return this.prismaClient.participant.upsert({
    //         where: {
    //           id: participant.getId(),
    //         },
    //         update: {
    //           id: participant.getId(),
    //         },
    //         create: {
    //           ...participant.getAllProperties(),
    //         },
    //       })
    //     })
    //   }),
    // )

    return teamEntity
  }
}
