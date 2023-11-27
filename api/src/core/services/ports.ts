import { Room } from "../entities/room"
import { User } from "../entities/user"

export interface GameRoomService {
    makeRoom(userId: string, nickname: string, color: string): Promise<Room>
    getRoom(roomId: string): Promise<Room>
    join(roomId: string, userId: string, nickname: string, color: string): Promise<User>
    // leave(roomId: string, userId: string): Promise<Room>
    // bye(roomId: string): Promise<void>
}