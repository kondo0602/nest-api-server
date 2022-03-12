import { PrismaClient } from '@prisma/client'
import { IParticipantRepository } from 'src/app/repository-interface/participant-repository'
import { Participant } from 'src/domain/entity/participant'

export class ParticipantRepository implements IParticipantRepository {
  private prismaClient: PrismaClient

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async save(participantEntity: Participant): Promise<Participant> {
    const { id, name, email } = participantEntity.getAllProperties()

    const savedParticipantDatamodel = await this.prismaClient.participant.create(
      {
        data: {
          id,
          name,
          email,
        },
      },
    )
    const savedParticipantEntity = new Participant({
      ...savedParticipantDatamodel,
    })
    return savedParticipantEntity
  }
}
