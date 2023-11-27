
export interface QuoteService {
    getQuote(): Promise<string>
}

export interface Store {
    has(key: string): Promise<boolean>
    get(key: string): Promise<string | null>
    getMany(keys: string[]): Promise<string[]>
    set(key: string, value: string): Promise<string>
    del(key: string): Promise<number>
}