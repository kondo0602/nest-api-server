import { Module } from '@nestjs/common'
import { ParticipantController } from './controller/participant.controller'
import { PairController } from './controller/pair.controller'

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [ParticipantController, PairController],
  providers: [],
})
export class AppModule {}
