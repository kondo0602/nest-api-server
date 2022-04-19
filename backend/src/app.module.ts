import { Module } from '@nestjs/common'
import { UserController } from './controller/user.controller'
import { PairController } from './controller/pair.controller'
import { TeamController } from './controller/team.controller'
import { UserOnTaskController } from './controller/user-on-task.controller'

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [
    UserController,
    PairController,
    TeamController,
    UserOnTaskController,
  ],
  providers: [],
})
export class AppModule {}
