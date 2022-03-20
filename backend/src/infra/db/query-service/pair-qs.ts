import { PrismaClient } from '@prisma/client'
import { PairDTO, IPairQS } from 'src/app/query-service-interface/pair-qs'
import { Pair } from 'src/domain/entity/pair'

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
    })

    if (pair) {
      return new Pair({
        ...pair,
      })
    } else {
      return null
    }
  }
}
