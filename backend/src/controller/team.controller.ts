import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetTeamResponse } from './response/get-team-response'
import { ChangePairRequest } from './request/change-pair-request'
import { GetTeamUsecase } from '../app/get-team-usecase'
import { ChangePairUseCase } from '../app/change-pair-usecase'
import { ParticipantRepository } from 'src/infra/db/repository/participant-repository'
import { PrismaClient } from '@prisma/client'
import { ParticipantQS } from 'src/infra/db/query-service/participant-qs'
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
}
