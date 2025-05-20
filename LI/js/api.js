export class API {
    constructor() {
        this.baseUrl = 'https://api.coingecko.com/api/v3';
    }

    async getCryptoList() {
        try {
            const response = await fetch(`${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`);
            const data = await response.json();
            
            return data.map(coin => ({
                id: coin.id,
                symbol: coin.symbol,
                name: coin.name,
                current_price: coin.current_price,
                price_change_percentage_24h: coin.price_change_percentage_24h
            }));
        } catch (error) {
            console.error('Error fetching crypto list:', error);
            return [];
        }
    }

    async getCryptoPrices(ids) {
        try {
            const response = await fetch(`${this.baseUrl}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=250&page=1`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching crypto prices:', error);
            return [];
        }
    }
}