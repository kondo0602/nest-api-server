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

  public async updatePair(pairEntity: Pair): Promise<Pair> {
    const { id, name, teamId } = pairEntity.getAllProperties()

    const updatedPairDatamodel = await this.prismaClient.pair.update({
      where: {
        id: id,
      },
      data: {
        name,
        teamId,
      },
    })

    const updatedPairEntity = new Pair({
      ...updatedPairDatamodel,
    })

    return updatedPairEntity
  }
}
