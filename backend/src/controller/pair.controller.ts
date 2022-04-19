import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetPairResponse } from './response/get-pair-response'
import { ChangePairRequest } from './request/change-pair-request'
import { GetPairUsecase } from '../app/get-pair-usecase'
import { ChangePairUseCase } from '../app/change-pair-usecase'
import { UserRepository } from 'src/infra/db/repository/user-repository'
import { PrismaClient } from '@prisma/client'
import { UserQS } from 'src/infra/db/query-service/user-qs'
import { PairQS } from 'src/infra/db/query-service/pair-qs'

@Controller({
  path: '/pair',
})
export class PairController {
  @Get()
  @ApiResponse({ status: 200, type: GetPairResponse })
  async getSomeData(): Promise<GetPairResponse> {
    const prisma = new PrismaClient()
    const qs = new PairQS(prisma)
    const usecase = new GetPairUsecase(qs)
    const result = await usecase.do()
    const response = new GetPairResponse({ pairs: result })
    return response
  }

  @Put(':id')
  async changePair(
    @Param('id') id: string,
    @Body() changePairDto: ChangePairRequest,
  ): Promise<void> {
    const prisma = new PrismaClient()
    const qs = new UserQS(prisma)
    const repo = new UserRepository(prisma)
    const usecase = new ChangePairUseCase(qs, repo)
    await usecase.do({
      userId: id,
      pairId: changePairDto.pairId,
    })
  }
}
