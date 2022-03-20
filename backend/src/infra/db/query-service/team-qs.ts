import { PrismaClient } from '@prisma/client'
import { TeamDTO, ITeamQS } from 'src/app/query-service-interface/team-qs'

export class TeamQS implements ITeamQS {
  private prismaClient: PrismaClient

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getAll(): Promise<TeamDTO[]> {
    const allTeams = await this.prismaClient.team.findMany()
    return allTeams.map(
      (teamDM) =>
        new TeamDTO({
          ...teamDM,
        }),
    )
  }
}
