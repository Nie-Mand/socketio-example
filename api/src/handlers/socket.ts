import { Server as HTTPServer } from "http"
import { Server as SocketServer, Socket } from "socket.io"
import RedisStoreImpl from "../lib/redis"
import QuoteServiceImpl from "../lib/quote"
import RoomsRepositoryImpl from "../core/repositoris/room"
import UsersRepositoryImpl from "../core/repositoris/user"
import GameRoomServiceImpl from "../core/services/gameroom"

export default class SocketHandler {
    io: SocketServer
    gameRoomService: GameRoomServiceImpl
    
    constructor(httpServer: HTTPServer) {
        // Define Repositories and Services
        const store = new RedisStoreImpl()
        const quoteService = new QuoteServiceImpl()
        const roomRepository = new RoomsRepositoryImpl(store, quoteService)
        const userRepository = new UsersRepositoryImpl(store)
        this.gameRoomService = new GameRoomServiceImpl(userRepository, roomRepository)


        // Create Socket Server
        this.io = new SocketServer(httpServer)

        this.io.on("connection", (socket) => {
            console.log("a user connected, socket id:", socket.id)

            this.handle(socket)

            socket.on("disconnect", () => {
              console.log("user disconnected")
            })
          })
    }

    handle(socket: Socket) {
        // MAKE ROOM
        socket.on("MAKE_ROOM", async (msg) => {
            const data = JSON.parse(msg)
            if (!socket.id || !data.nickname || !data.color) {
                socket.emit("error", "Invalid data")
                return
            }

            const nickname = data.nickname
            const color = data.color
            const userId = socket.id

            const room = await this.gameRoomService.makeRoom(userId, nickname, color)
            socket.join(room.id)
            socket.emit("ROOM_CREATED", room.toString())
        })


        // JOIN ROOM
        socket.on("JOIN_ROOM", async (msg) => {
            const data = JSON.parse(msg)
            if (!socket.id || !data.nickname || !data.color || !data.room) {
                socket.emit("error", "Invalid data")
                return
            }

            const room = await this.gameRoomService.getRoom(data.room)

            // try {
                const users = await this.gameRoomService.join(room.id, socket.id, data.nickname, data.color)
                socket.join(room.id)
                socket.emit("ROOM_JOINED", room.toString())
            // }

        })
    }
}