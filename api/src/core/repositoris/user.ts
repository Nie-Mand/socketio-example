import { Store } from "../../lib/ports"
import { UsersRepository } from "./ports"
import { User } from "../entities/user"

export default class UsersRepositoryImpl implements UsersRepository {
  constructor(private store: Store) {}

  async create(userId: string, nickname: string, color: string): Promise<User> {

    const user = new User()
    user.id = User.makeID(userId)
    user.nickname = nickname
    user.color = color
    
    await this.store.set(user.id, user.toString())

    return user
  }

  async getBatch(userIds: string[]): Promise<User[]> {
    const users = await this.store.getMany(userIds.map(User.makeID))
    return users.map(user => JSON.parse(user))
  }

  // async get(roomId: string): Promise<Room> {
  //   const room = await this.store.get(roomId)

  //   if (!room) {
  //     throw new Error(`Room ${roomId} not found`)
  //   }

  //   return JSON.parse(room)
  // }

  // async join(roomId: string, nickname: string, color: string): Promise<User> {
  //   return new Promise((resolve, reject) => {})
  // }

  // async leave(roomId: string, userId: string): Promise<Room> {
  //   return new Promise((resolve, reject) => {})
  // }

  // async bye(roomId: string): Promise<void> {}
}
