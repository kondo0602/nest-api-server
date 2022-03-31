import { Body, Controller, Put, Param } from '@nestjs/common'
import { UpdateTaskStatusRequest } from './request/update-task-status-request'
import { UpdateTaskStatusUseCase } from '../app/update-task-status-usecase'
import { ParticipantOnTaskRepository } from 'src/infra/db/repository/participant-on-task-repository'
import { PrismaClient } from '@prisma/client'

@Controller({
  path: '/participant-on-task',
})
export class ParticipantOnTaskController {
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
