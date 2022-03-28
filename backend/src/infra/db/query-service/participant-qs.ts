import { PrismaClient } from '@prisma/client'
import {
  ParticipantDTO,
  IParticipantQS,
} from 'src/app/query-service-interface/participant-qs'
import { Participant } from 'src/domain/entity/participant'

export class ParticipantQS implements IParticipantQS {
  private prismaClient: PrismaClient

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getParticipantByEmail(
    email: string,
  ): Promise<Participant | null> {
    const participant = await this.prismaClient.participant.findFirst({
      where: {
        email: email,
      },
    })

    if (participant) {
      return new Participant({
        id: participant.id,
        name: participant.name,
        email: participant.email,
        statusId: participant.statusId,
      })
    } else {
      return null
    }
  }

  public async getAll(): Promise<ParticipantDTO[]> {
    const allParticipants = await this.prismaClient.participant.findMany()
    return allParticipants.map(
      (participant) =>
        new ParticipantDTO({
          id: participant.id,
          name: participant.name,
          email: participant.email,
          statusId: participant.statusId,
        }),
    )
  }
}
