import { Room } from "../entities/room"
import { User } from "../entities/user"

export interface RoomsRepository {
    create(userId: string): Promise<Room>
    get(roomId: string): Promise<Room>
    update(room: Room): Promise<Room>
    // join(roomId: string, nickname: string, color: string): Promise<User>
    // leave(roomId: string, userId: string): Promise<Room>
    // bye(roomId: string): Promise<void>
}


export interface UsersRepository {
    create(userId: string, nickname: string, color: string): Promise<User>
    getBatch(userIds: string[]): Promise<User[]>
    // get(roomId: string): Promise<User>
    // join(roomId: string, nickname: string, color: string): Promise<User>
    // leave(roomId: string, userId: string): Promise<Room>
    // bye(roomId: string): Promise<void>
}