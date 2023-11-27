import { QuoteService } from "./ports"


export default class QuoteServiceImpl implements QuoteService {
    async getQuote(): Promise<string> {
        const quote = `The greatest glory in living lies not in never falling, but in rising every time we fall. -Nelson Mandela`

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(quote)
            }, 1000)
        })
    }
}