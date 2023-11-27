import Redis from "ioredis"
import { Store } from "./ports"


export default class RedisStoreImpl implements Store {
    private redis: Redis

    constructor() {
        this.redis = getRedis()
    }

    async getMany(keys: string[]): Promise<string[]> {
        return this.redis.mget(keys).then((result) => {
            return result.map(v => v?.toString() || "")
        })
    }

    async get(key: string): Promise<string | null> {
        return this.redis.get(key)
    }

    async set(key: string, value: string): Promise<string> {
        return this.redis.set(key, value)
    }

    async has(key: string): Promise<boolean> {
        return this.redis.exists(key).then((result) => {
            return result === 1
        })
    }

    async del(key: string): Promise<number> {
        return this.redis.del(key)
    }
}


let redis: Redis
function getRedis() {

    const config = {
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
        db: Number(process.env.REDIS_DB) || 0,
    }

    if (redis && redis.status === "ready") {
        console.log("[*] redis is ready")
        return redis
    }

    console.log("[*] redis is not ready, trying to connect...")
    redis = new Redis(config)
    redis.on("connect", () => {
        console.log("[*] redis is connected")
    })

    redis.on("error", (err) => {
        console.log("[*] redis error", err)
    })

    redis.on("close", () => {
        console.log("[*] redis is closed")
    })

    return redis
}

getRedis()