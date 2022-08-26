import { Body, Controller, Get, Post, Put, Param, UseInterceptors } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetUserResponse } from './response/get-user-response'
import { PostUserRequest } from './request/post-user-request'
import { UpdateUserRequest } from './request/update-user-request'
import { GetUserUsecase } from 'src/app/get-user-usecase'
import { PostUserUseCase } from 'src/app/post-user-usecase'
import { UpdateUserUseCase } from 'src/app/update-user-status-usecase'
import { TeamRepository } from 'src/infra/db/repository/team-repository'
import { RemovedUserRepository } from 'src/infra/db/repository/removed-user-repository'
import { PrismaClient } from '@prisma/client'
import { UserQS } from 'src/infra/db/query-service/user-qs'
import { RequestInterceptor } from 'src/interceptor/request.interceptor'

@Controller({
  path: '/user',
})
export class UserController {
  // memo: @ApiResponseを定義しておかないとSwaggerに出力されない
  @UseInterceptors(new RequestInterceptor)
  @Get()
  @ApiResponse({ status: 200, type: GetUserResponse })
  async getSomeData(): Promise<GetUserResponse> {
    const prisma = new PrismaClient()
    const qs = new UserQS(prisma)
    const usecase = new GetUserUsecase(qs)
    const result = await usecase.do()
    const response = new GetUserResponse({ users: result })
    return response
  }

  @Post()
  async postUser(@Body() postUserDto: PostUserRequest): Promise<void> {
    const prisma = new PrismaClient()
    const qs = new UserQS(prisma)
    const repo = new TeamRepository(prisma)
    const usecase = new PostUserUseCase(qs, repo)
    await usecase.do({
      name: postUserDto.name,
      email: postUserDto.email,
      pairId: postUserDto.pairId,
    })
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRequest,
  ): Promise<void> {
    const prisma = new PrismaClient()
    const qs = new UserQS(prisma)
    const userRepo = new TeamRepository(prisma)
    const removedUserRepo = new RemovedUserRepository(prisma)
    const usecase = new UpdateUserUseCase(prisma, qs, userRepo, removedUserRepo)
    await usecase.do({
      id: id,
      statusId: updateUserDto.statusId,
    })
  }
}
