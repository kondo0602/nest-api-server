import { PrismaClient } from '@prisma/client'
import { IRemovedParticipantRepository } from 'src/app/repository-interface/removed-participant-repository'
import { RemovedParticipant } from 'src/domain/entity/removed-participant'

export class RemovedParticipantRepository
  implements IRemovedParticipantRepository {
  private prismaClient: PrismaClient

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getRemovedParticipantByParticipantId(
    participantId: string,
  ): Promise<RemovedParticipant | null> {
    const removedParticipant = await this.prismaClient.removedParticipant.findUnique(
      {
        where: {
          id: participantId,
        },
      },
    )

    if (removedParticipant) {
      return new RemovedParticipant({
        ...removedParticipant,
      })
    } else {
      return null
    }
  }

  public async createRemovedParticipant(
    removedParticipant: RemovedParticipant,
  ): Promise<RemovedParticipant> {
    const { id, name, email, statusId } = removedParticipant.getAllProperties()

    await this.prismaClient.removedParticipant.create({
      data: {
        id: id,
        name: name,
        email: email,
        statusId: statusId,
      },
    })

    return removedParticipant
  }

  public async updateRemovedParticipant(
    removedParticipant: RemovedParticipant,
  ): Promise<RemovedParticipant> {
    const { id, name, email, statusId } = removedParticipant.getAllProperties()

    const deleteRemovedParticipant = this.prismaClient.removedParticipant.delete(
      {
        where: { id: id },
      },
    )

    const createRemovedParticipant = this.prismaClient.removedParticipant.create(
      {
        data: {
          id: id,
          name: name,
          email: email,
          statusId: statusId,
        },
      },
    )

    await this.prismaClient.$transaction([
      deleteRemovedParticipant,
      createRemovedParticipant,
    ])

    return removedParticipant
  }

  public async deleteRemovedParticipant(participantId: string): Promise<void> {
    await this.prismaClient.removedParticipant.delete({
      where: {
        id: participantId,
      },
    })
  }
}
