import { Module } from '@nestjs/common'
import { ParticipantController } from './controller/participant.controller'
import { SampleController } from './controller/sample/some-data.controller'

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [SampleController, ParticipantController],
  providers: [],
})
export class AppModule {}
