import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
// import { GetSomeDataResponse } from './response/get-some-data-response'
import { PostParticipantRequest } from './request/post-participant-request'
// import { GetSomeDataUseCase } from '../../app/sample/get-some-data-usecase'
import { PostParticipantUseCase } from '../app/post-participant-usecase'
import { ParticipantRepository } from 'src/infra/db/repository/participant-repository'
import { PrismaClient } from '@prisma/client'
import { SomeDataQS } from 'src/infra/db/query-service/sample/some-data-qs'

@Controller({
  path: '/participant',
})
export class ParticipantController {
  // memo: @ApiResponseを定義しておかないとSwaggerに出力されない
  // @Get()
  // @ApiResponse({ status: 200, type: GetSomeDataResponse })
  // async getSomeData(): Promise<GetSomeDataResponse> {
  //   const prisma = new PrismaClient()
  //   const qs = new SomeDataQS(prisma)
  //   const usecase = new GetSomeDataUseCase(qs)
  //   const result = await usecase.do()
  //   const response = new GetSomeDataResponse({ someDatas: result })
  //   return response
  // }
  @Post()
  async postParticipant(
    @Body() postParticipantDto: PostParticipantRequest,
  ): Promise<void> {
    const prisma = new PrismaClient()
    const repo = new ParticipantRepository(prisma)
    const usecase = new PostParticipantUseCase(repo)
    await usecase.do({
      name: postParticipantDto.name,
      email: postParticipantDto.email,
    })
  }
}
