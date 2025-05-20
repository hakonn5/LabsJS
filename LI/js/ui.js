export class UI {
    constructor(portfolio, api) {
        this.portfolio = portfolio;
        this.api = api;
        this.cryptoList = [];
        
        this.dom = {
            cryptoSelect: document.getElementById('cryptoSelect'),
            cryptoAmount: document.getElementById('cryptoAmount'),
            addCryptoForm: document.getElementById('addCryptoForm'),
            formError: document.getElementById('formError'),
            portfolioList: document.getElementById('portfolioList'),
            emptyPortfolio: document.getElementById('emptyPortfolio'),
            totalValue: document.getElementById('totalValue'),
            assetsCount: document.getElementById('assetsCount'),
            dailyChange: document.getElementById('dailyChange'),
            searchInput: document.getElementById('searchInput'),
            sortSelect: document.getElementById('sortSelect'),
            cryptoModal: document.getElementById('cryptoModal'),
            modalTitle: document.getElementById('modalTitle'),
            modalContent: document.getElementById('modalContent'),
            closeModal: document.querySelector('.close-modal')
        };
    }
    
    async init() {
        this.cryptoList = await this.api.getCryptoList();
        this.populateCryptoSelect();
        await this.updatePortfolioPrices();
        this.renderPortfolio();
        this.updateStats();
        this.setupEventListeners();
    }
    
    populateCryptoSelect() {
        this.dom.cryptoSelect.innerHTML = '';
        
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '-- Выберите криптовалюту --';
        this.dom.cryptoSelect.appendChild(defaultOption);
        
        this.cryptoList.forEach(crypto => {
            const option = document.createElement('option');
            option.value = crypto.id;
            option.textContent = `${crypto.name} (${crypto.symbol.toUpperCase()})`;
            this.dom.cryptoSelect.appendChild(option);
        });
    }
    
    async updatePortfolioPrices() {
        if (this.portfolio.assets.length === 0) return;
        const ids = this.portfolio.assets.map(asset => asset.id).join(',');
        const pricesData = await this.api.getCryptoPrices(ids);
        this.portfolio.updateAssetsPrices(pricesData);
    }
    
    renderPortfolio(filtered = false) {
        this.dom.portfolioList.innerHTML = '';
        
        let assetsToDisplay = filtered ? 
            this.filteredAssets : 
            this.portfolio.sortAssets(this.dom.sortSelect.value);
        
        if (assetsToDisplay.length === 0) {
            this.dom.emptyPortfolio.style.display = 'block';
            this.dom.portfolioList.style.display = 'none';
        } else {
            this.dom.emptyPortfolio.style.display = 'none';
            this.dom.portfolioList.style.display = 'grid';
            
            assetsToDisplay.forEach(asset => {
                const assetElement = this.createAssetCard(asset);
                this.dom.portfolioList.appendChild(assetElement);
            });
        }
    }
    
    createAssetCard(asset) {
        const card = document.createElement('div');
        card.className = 'crypto-card';
        
        const value = asset.price * asset.amount;
        const changeClass = asset.change24h >= 0 ? 'positive' : 'negative';
        const changeSign = asset.change24h >= 0 ? '+' : '';
        
        card.innerHTML = `
            <div class="crypto-header">
                <span class="crypto-name">${asset.name} (${asset.symbol.toUpperCase()})</span>
                <span class="crypto-price">$${asset.price.toLocaleString('en-US', { maximumFractionDigits: 6 })}</span>
            </div>
            <div class="crypto-details">
                <div class="detail-row">
                    <span class="detail-label">Количество:</span>
                    <span class="detail-value">${asset.amount.toLocaleString('en-US', { maximumFractionDigits: 8 })}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Стоимость:</span>
                    <span class="detail-value">$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">24ч изменение:</span>
                    <span class="detail-value ${changeClass}">${changeSign}${asset.change24h?.toFixed(2) || '0.00'}%</span>
                </div>
            </div>
            <div class="crypto-actions">
                <button class="action-btn edit-btn" data-id="${asset.id}">Изменить</button>
                <button class="action-btn delete-btn" data-id="${asset.id}">Удалить</button>
            </div>
        `;
        
        return card;
    }
    
    updateStats() {
        const totalValue = this.portfolio.getTotalValue();
        const change24h = this.portfolio.getPortfolioChange24h();
        const changeClass = change24h >= 0 ? 'positive' : 'negative';
        const changeSign = change24h >= 0 ? '+' : '';
        
        this.dom.totalValue.textContent = `$${totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
        this.dom.assetsCount.textContent = this.portfolio.assets.length;
        this.dom.dailyChange.textContent = `${changeSign}${change24h.toFixed(2)}%`;
        this.dom.dailyChange.className = changeClass;
    }
    
    setupEventListeners() {
        this.dom.addCryptoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const cryptoId = this.dom.cryptoSelect.value;
            const amount = this.dom.cryptoAmount.value;
            
            if (!cryptoId || !amount) {
                this.showError('Пожалуйста, выберите криптовалюту и укажите количество');
                return;
            }
            
            if (parseFloat(amount) <= 0) {
                this.showError('Количество должно быть больше нуля');
                return;
            }
            
            const selectedCrypto = this.cryptoList.find(c => c.id === cryptoId);
            
            try {
                const priceData = await this.api.getCryptoPrices(cryptoId);
                const price = priceData[0]?.current_price || 0;
                const change24h = priceData[0]?.price_change_percentage_24h || 0;
                
                this.portfolio.addAsset({
                    id: selectedCrypto.id,
                    symbol: selectedCrypto.symbol,
                    name: selectedCrypto.name,
                    amount,
                    price,
                    change24h
                });
                
                this.renderPortfolio();
                this.updateStats();
                
                this.dom.cryptoSelect.value = '';
                this.dom.cryptoAmount.value = '';
                this.dom.formError.textContent = '';
            } catch (error) {
                this.showError('Ошибка при получении данных. Пожалуйста, попробуйте позже.');
                console.error(error);
            }
        });
        
        this.dom.searchInput.addEventListener('input', () => {
            const searchTerm = this.dom.searchInput.value.trim();
            this.filteredAssets = this.portfolio.filterAssets(searchTerm);
            this.renderPortfolio(true);
        });
        
        this.dom.sortSelect.addEventListener('change', () => {
            this.renderPortfolio();
        });
        
        this.dom.portfolioList.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.classList.contains('delete-btn')) {
                const assetId = target.getAttribute('data-id');
                this.portfolio.removeAsset(assetId);
                this.renderPortfolio();
                this.updateStats();
            }
            
            if (target.classList.contains('edit-btn')) {
                const assetId = target.getAttribute('data-id');
                this.showEditModal(assetId);
            }
        });
        
        this.dom.closeModal.addEventListener('click', () => {
            this.dom.cryptoModal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === this.dom.cryptoModal) {
                this.dom.cryptoModal.style.display = 'none';
            }
        });
    }
    
    showEditModal(assetId) {
        const asset = this.portfolio.assets.find(a => a.id === assetId);
        if (!asset) return;
        
        this.dom.modalTitle.textContent = `Редактировать ${asset.name}`;
        
        this.dom.modalContent.innerHTML = `
            <div class="form-group">
                <label for="editAmount">Количество ${asset.symbol.toUpperCase()}:</label>
                <input type="number" id="editAmount" value="${asset.amount}" min="0.00000001" step="any" class="modal-input">
            </div>
            <div class="modal-actions">
                <button id="saveEdit" class="btn-add">Сохранить</button>
            </div>
        `;
        
        this.dom.cryptoModal.style.display = 'block';
        
        document.getElementById('saveEdit').addEventListener('click', () => {
            const newAmount = document.getElementById('editAmount').value;
            
            if (!newAmount || parseFloat(newAmount) <= 0) {
                alert('Пожалуйста, введите корректное количество');
                return;
            }
            
            this.portfolio.updateAssetAmount(assetId, newAmount);
            this.renderPortfolio();
            this.updateStats();
            this.dom.cryptoModal.style.display = 'none';
        });
    }
    
    showError(message) {
        this.dom.formError.textContent = message;
        setTimeout(() => {
            this.dom.formError.textContent = '';
        }, 5000);
    }
}