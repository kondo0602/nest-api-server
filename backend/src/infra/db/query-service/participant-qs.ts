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

  public async getParticipantById(id: string): Promise<Participant> {
    const participant = await this.prismaClient.participant.findUnique({
      where: {
        id: id,
      },
    })

    if (participant) {
      return new Participant({
        ...participant,
      })
    } else {
      throw new Error('ユーザが見つかりませんでした.')
    }
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
        ...participant,
      })
    } else {
      return null
    }
  }

  public async getAll(): Promise<ParticipantDTO[]> {
    const allParticipants = await this.prismaClient.participant.findMany()
    return allParticipants.map(
      (participantDM) =>
        new ParticipantDTO({
          ...participantDM,
        }),
    )
  }
}
