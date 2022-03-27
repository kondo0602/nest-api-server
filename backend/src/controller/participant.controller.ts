import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetParticipantResponse } from './response/get-participant-response'
import { PostParticipantRequest } from './request/post-participant-request'
import { UpdateParticipantRequest } from './request/update-participant-request'
import { GetParticipantUsecase } from '../app/get-participant-usecase'
import { PostParticipantUseCase } from '../app/post-participant-usecase'
import { UpdateParticipantUseCase } from '../app/update-participant-usecase'
import { ParticipantRepository } from 'src/infra/db/repository/participant-repository'
import { PrismaClient } from '@prisma/client'
import { ParticipantQS } from 'src/infra/db/query-service/participant-qs'

@Controller({
  path: '/participant',
})
export class ParticipantController {
  // memo: @ApiResponseを定義しておかないとSwaggerに出力されない
  @Get()
  @ApiResponse({ status: 200, type: GetParticipantResponse })
  async getSomeData(): Promise<GetParticipantResponse> {
    const prisma = new PrismaClient()
    const qs = new ParticipantQS(prisma)
    const usecase = new GetParticipantUsecase(qs)
    const result = await usecase.do()
    const response = new GetParticipantResponse({ participants: result })
    return response
  }

  @Post()
  async postParticipant(
    @Body() postParticipantDto: PostParticipantRequest,
  ): Promise<void> {
    const prisma = new PrismaClient()
    const qs = new ParticipantQS(prisma)
    const repo = new ParticipantRepository(prisma)
    const usecase = new PostParticipantUseCase(qs, repo)
    await usecase.do({
      name: postParticipantDto.name,
      email: postParticipantDto.email,
      statusId: postParticipantDto.statusId,
      pairId: postParticipantDto.pairId,
    })
  }

  @Put(':id')
  async updateParticipant(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantRequest,
  ): Promise<void> {
    const prisma = new PrismaClient()
    const qs = new ParticipantQS(prisma)
    const repo = new ParticipantRepository(prisma)
    const usecase = new UpdateParticipantUseCase(qs, repo)
    await usecase.do({
      id: id,
      statusId: updateParticipantDto.statusId,
    })
  }
}
