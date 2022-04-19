import { RemovedUser } from 'src/domain/entity/removed-user'

export interface IRemovedUserRepository {
  getRemovedUserByUserId(userId: string): Promise<RemovedUser | null>
  createRemovedUser(removedPartcipant: RemovedUser): Promise<RemovedUser>
  updateRemovedUser(removedPartcipant: RemovedUser): Promise<RemovedUser>
  deleteRemovedUser(userId: string): Promise<void>
}
