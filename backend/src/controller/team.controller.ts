import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetTeamResponse } from './response/get-team-response'
import { ChangeTeamRequest } from './request/change-team-request'
import { GetTeamUsecase } from 'src/app/get-team-usecase'
import { ChangeTeamUseCase } from 'src/app/change-team-usecase'
import { TeamRepository } from 'src/infra/db/repository/team-repository'
import { PrismaClient } from '@prisma/client'
import { PairQS } from 'src/infra/db/query-service/pair-qs'
import { TeamQS } from 'src/infra/db/query-service/team-qs'

@Controller({
  path: '/team',
})
export class TeamController {
  @Get()
  @ApiResponse({ status: 200, type: GetTeamResponse })
  async getSomeData(): Promise<GetTeamResponse> {
    const prisma = new PrismaClient()
    const qs = new TeamQS(prisma)
    const usecase = new GetTeamUsecase(qs)
    const result = await usecase.do()
    const response = new GetTeamResponse({ teams: result })
    return response
  }

  @Put(':id')
  async changeTeam(
    @Param('id') id: string,
    @Body() changeTeamDto: ChangeTeamRequest,
  ): Promise<void> {
    const prisma = new PrismaClient()
    const qs = new PairQS(prisma)
    const repo = new TeamRepository(prisma)
    const usecase = new ChangeTeamUseCase(qs, repo)
    await usecase.do({
      pairId: id,
      teamId: changeTeamDto.teamId,
    })
  }
}
