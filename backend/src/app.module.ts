import { Module } from '@nestjs/common'
import { ParticipantController } from './controller/participant.controller'
import { PairController } from './controller/pair.controller'
import { TeamController } from './controller/team.controller'

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [ParticipantController, PairController, TeamController],
  providers: [],
})
export class AppModule {}
