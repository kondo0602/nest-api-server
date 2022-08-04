import { Body, Controller, Post, Put, Param } from '@nestjs/common'
import { SearchUsersByTaskStatusRequest } from 'src/controller/request/search-users-by-task-status-request'
import { SearchUserByTaskStatusResponse } from 'src/controller/response/search-user-by-task-status-response'
import { UpdateTaskStatusRequest } from './request/update-task-status-request'
import { GetUsersByTaskStatusUsecase } from 'src/app/search-users-by-task-status-usecase'
import { UpdateTaskStatusUseCase } from 'src/app/update-task-status-usecase'
import { UserTaskQS } from 'src/infra/db/query-service/search-user-by-task-status-qs'
import { UserOnTaskRepository } from 'src/infra/db/repository/user-on-task-repository'
import { PrismaClient } from '@prisma/client'

@Controller({
  path: '/user-on-task',
})
export class UserOnTaskController {
  @Post()
  async searchUsersByTaskStatus(
    @Body()
    searchUsersByTaskStatusDto: SearchUsersByTaskStatusRequest,
  ): Promise<SearchUserByTaskStatusResponse> {
    const prisma = new PrismaClient()
    const qs = new UserTaskQS(prisma)
    const usecase = new GetUsersByTaskStatusUsecase(qs)
    const result = await usecase.do({
      taskIdList: searchUsersByTaskStatusDto.taskIdList,
      taskStatus: searchUsersByTaskStatusDto.taskStatus,
      pageSize: searchUsersByTaskStatusDto.pageSize,
      pageNumber: searchUsersByTaskStatusDto.pageNumber,
    })
    const response = new SearchUserByTaskStatusResponse({
      users: result,
    })
    return response
  }

  @Put(':id')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusRequest,
  ): Promise<void> {
    const prisma = new PrismaClient()
    const repo = new UserOnTaskRepository(prisma)
    const usecase = new UpdateTaskStatusUseCase(repo)

    if (id !== updateTaskStatusDto.userId) {
      throw new Error(
        '他の参加者の課題の進捗ステータスを更新することはできません.',
      )
    }

    await usecase.do({
      userId: id,
      taskId: updateTaskStatusDto.taskId,
      statusId: updateTaskStatusDto.statusId,
    })
  }
}
