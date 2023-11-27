import { v4 } from "uuid"
import { QuoteService, Store } from "../../lib/ports"
import { RoomsRepository } from "./ports"
import QuoteServiceImpl from "../../lib/quote"
import { Room } from "../entities/room"
import { User } from "../entities/user"

export default class RoomsRepositoryImpl implements RoomsRepository {
  constructor(private store: Store, private quoteService: QuoteService) {}

  async create(userId: string): Promise<Room> {

    const room = new Room()
    room.id = Room.makeID(v4())
    room.quote = await this.quoteService.getQuote()
    room.users = [userId]

    await this.store.set(room.id, room.toString())

    return room
  }

  async get(roomId: string): Promise<Room> {
    const room = await this.store.get(Room.makeID(roomId))

    if (!room) {
      throw new Error(`Room ${roomId} not found`)
    }

    return JSON.parse(room)
  }

  async update(room: Room): Promise<Room> {
    await this.store.set(room.id, room.toString())
    return room
  }

  // async join(roomId: string, nickname: string, color: string): Promise<User> {
  //   return new Promise((resolve, reject) => {})
  // }

  // async leave(roomId: string, userId: string): Promise<Room> {
  //   return new Promise((resolve, reject) => {})
  // }

  // async bye(roomId: string): Promise<void> {}
}
