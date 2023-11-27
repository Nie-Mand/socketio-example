
export class User {
    id: string = ''
    nickname: string = ''
    color: string = ''
    wpm: number = 0
    errors: number = 0

    static makeID(id: string) {
        return `users:${id}` 
    }

    toString() {
        return JSON.stringify(this, null, 2)
    }
}