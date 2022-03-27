import { PrismaClient } from '@prisma/client'
import { PairDTO, IPairQS } from 'src/app/query-service-interface/pair-qs'
import { Pair } from 'src/domain/entity/pair'
import { Participant } from 'src/domain/entity/participant'

export class PairQS implements IPairQS {
  private prismaClient: PrismaClient

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getAll(): Promise<PairDTO[]> {
    const allPairs = await this.prismaClient.pair.findMany()
    return allPairs.map(
      (pairDM) =>
        new PairDTO({
          ...pairDM,
        }),
    )
  }

  public async getPairById(pairId: string): Promise<Pair | null> {
    const pair = await this.prismaClient.pair.findUnique({
      where: {
        id: pairId,
      },
      include: {
        participants: true,
      },
    })

    if (pair) {
      return new Pair({
        id: pair.id,
        name: pair.name,
        participants: pair.participants.map(
          (participant) =>
            new Participant({
              ...participant,
            }),
        ),
        teamId: pair.teamId,
      })
    } else {
      return null
    }
  }
}
