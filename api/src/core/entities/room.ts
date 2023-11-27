export class Room {
    id: string = ''
    capacity: number = 8
    quote: string = ''
    users: string[] = []


    static makeID(id: string) {
        return `room:${id}` 
    }

    toString() {
        return JSON.stringify(this, null, 2)
    }
}