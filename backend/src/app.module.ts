import { Module } from '@nestjs/common'
import { ParticipantController } from './controller/participant.controller'

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [ParticipantController],
  providers: [],
})
export class AppModule {}
