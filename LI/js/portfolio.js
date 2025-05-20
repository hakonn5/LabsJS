export class Portfolio {
    constructor() {
        this.assets = JSON.parse(localStorage.getItem('cryptoPortfolio')) || [];
    }
    
    addAsset(asset) {
        const existingAsset = this.assets.find(a => a.id === asset.id);
        
        if (existingAsset) {
            existingAsset.amount = parseFloat(existingAsset.amount) + parseFloat(asset.amount);
        } else {
            this.assets.push({
                id: asset.id,
                symbol: asset.symbol,
                name: asset.name,
                amount: parseFloat(asset.amount),
                price: asset.price || 0,
                change24h: asset.change24h || 0
            });
        }
        
        this.saveToLocalStorage();
    }
    
    updateAssetsPrices(assetsData) {
        this.assets.forEach(asset => {
            const currentData = assetsData.find(a => a.id === asset.id);
            if (currentData) {
                asset.price = currentData.current_price;
                asset.change24h = currentData.price_change_percentage_24h;
            }
        });
        
        this.saveToLocalStorage();
    }
    
    removeAsset(assetId) {
        this.assets = this.assets.filter(asset => asset.id !== assetId);
        this.saveToLocalStorage();
    }
    
    updateAssetAmount(assetId, newAmount) {
        const asset = this.assets.find(a => a.id === assetId);
        if (asset) {
            asset.amount = parseFloat(newAmount);
            this.saveToLocalStorage();
        }
    }
    
    getTotalValue() {
        return this.assets.reduce((total, asset) => total + (asset.price * asset.amount), 0);
    }
    
    getPortfolioChange24h() {
        if (this.assets.length === 0) return 0;
        
        const totalValue = this.getTotalValue();
        if (totalValue === 0) return 0;
        
        const weightedChanges = this.assets.map(asset => {
            const assetValue = asset.price * asset.amount;
            return (assetValue / totalValue) * (asset.change24h || 0);
        });
        
        return weightedChanges.reduce((sum, change) => sum + change, 0);
    }
    
    filterAssets(searchTerm) {
        if (!searchTerm) return this.assets;
        return this.assets.filter(asset => 
            asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    sortAssets(sortOption) {
        const sortedAssets = [...this.assets];
        
        switch (sortOption) {
            case 'name-asc': return sortedAssets.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc': return sortedAssets.sort((a, b) => b.name.localeCompare(a.name));
            case 'value-asc': return sortedAssets.sort((a, b) => (a.price * a.amount) - (b.price * b.amount));
            case 'value-desc': return sortedAssets.sort((a, b) => (b.price * b.amount) - (a.price * a.amount));
            default: return sortedAssets;
        }
    }
    
    saveToLocalStorage() {
        localStorage.setItem('cryptoPortfolio', JSON.stringify(this.assets));
    }
}