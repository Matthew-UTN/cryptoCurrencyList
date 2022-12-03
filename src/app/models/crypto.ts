export interface crypto{
    "symbol": string,
    "baseAsset": string,
    "quoteAsset"?: string,
    "openPrice": string,
    "lowPrice": string,
    "highPrice": string,
    "lastPrice": string,
    "volume": string,
    "bidPrice"?: string,
    "askPrice"?: string,
    "at"?: number
}