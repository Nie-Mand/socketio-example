import { Room } from "../entities/room"
import { User } from "../entities/user"
import { RoomsRepository, UsersRepository } from "../repositoris/ports"
import RoomsRepositoryImpl from "../repositoris/room"
import UsersRepositoryImpl from "../repositoris/user"
import { GameRoomService } from "./ports"

export default class GameRoomServiceImpl implements GameRoomService {
  constructor(
    private usersRepository: UsersRepository,
    private roomsRepository: RoomsRepository
  ) {}

  async makeRoom(userId: string, nickname: string, color: string): Promise<Room> {
    const user = await this.usersRepository.create(userId, nickname, color)
    const room = await this.roomsRepository.create(user.id)
    return room
  }

  async getRoom(roomId: string): Promise<Room> {
    const room = await this.roomsRepository.get(roomId)
    return room
  }


  async join(roomId: string, userId: string, nickname: string, color: string): Promise<User> {
    const room = await this.roomsRepository.get(roomId)

    if (!room) {
        throw new Error(`Room ${roomId} not found`)
    }

    if (room.users.length >= room.capacity) {
        throw new Error(`Room ${roomId} is full`)
    }

    const users = await this.usersRepository.getBatch(room.users)

    if (users.some(u => u.nickname === nickname)) {
        throw new Error(`Nickname ${nickname} is already taken`)
    }

    if (users.some(u => u.color === color)) {
        throw new Error(`Color ${color} is already taken`)
    }

    const newUser = await this.usersRepository.create(userId, nickname, color)

    room.users.push(newUser.id)

    await this.roomsRepository.update(room)

    return newUser
  }
}
