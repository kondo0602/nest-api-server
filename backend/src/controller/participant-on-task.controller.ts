import { Body, Controller, Post, Put, Param } from '@nestjs/common'
import { SearchParticipantsByTaskStatusRequest } from './request/search-participants-by-task-status-request'
import { SearchParticipantByTaskStatusResponse } from './response/search-participant-by-task-status-response'
import { UpdateTaskStatusRequest } from './request/update-task-status-request'
import { GetParticipantsByTaskStatusUsecase } from '../app/search-participants-by-task-status-usecase'
import { UpdateTaskStatusUseCase } from '../app/update-task-status-usecase'
import { ParticipantTaskQS } from 'src/infra/db/query-service/search-participant-by-task-status-qs'
import { ParticipantOnTaskRepository } from 'src/infra/db/repository/participant-on-task-repository'
import { PrismaClient } from '@prisma/client'

@Controller({
  path: '/participant-on-task',
})
export class ParticipantOnTaskController {
  @Post()
  async searchParticipantsByTaskStatus(
    @Body()
    searchParticipantsByTaskStatusDto: SearchParticipantsByTaskStatusRequest,
  ): Promise<SearchParticipantByTaskStatusResponse> {
    const prisma = new PrismaClient()
    const qs = new ParticipantTaskQS(prisma)
    const usecase = new GetParticipantsByTaskStatusUsecase(qs)
    const result = await usecase.do({
      taskIdList: searchParticipantsByTaskStatusDto.taskIdList,
      taskStatus: searchParticipantsByTaskStatusDto.taskStatus,
      pageNumber: searchParticipantsByTaskStatusDto.pageNumber,
    })
    const response = new SearchParticipantByTaskStatusResponse({
      participants: result,
    })
    return response
  }

  @Put(':id')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusRequest,
  ): Promise<void> {
    const prisma = new PrismaClient()
    const repo = new ParticipantOnTaskRepository(prisma)
    const usecase = new UpdateTaskStatusUseCase(repo)

    if (id !== updateTaskStatusDto.userId) {
      throw new Error(
        '他の参加者の課題の進捗ステータスを更新することはできません.',
      )
    }

    await usecase.do({
      participantId: id,
      taskId: updateTaskStatusDto.taskId,
      statusId: updateTaskStatusDto.statusId,
    })
  }
}
