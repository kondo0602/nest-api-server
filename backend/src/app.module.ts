import { Module } from '@nestjs/common'
import { ParticipantController } from './controller/participant.controller'
import { PairController } from './controller/pair.controller'
import { TeamController } from './controller/team.controller'
import { ParticipantOnTaskController } from './controller/participant-on-task.controller'

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [
    ParticipantController,
    PairController,
    TeamController,
    ParticipantOnTaskController,
  ],
  providers: [],
})
export class AppModule {}
