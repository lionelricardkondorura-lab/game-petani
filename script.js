class FarmGame {
    constructor() {
        this.money = 1000;
        this.crops = 0;
        this.day = 1;
        this.farmTiles = [];
        this.selectedTile = null;
        
        // Inisialisasi lahan (4x4 = 16 tile)
        this.initializeFarm();
        this.setupEventListeners();
        this.render();
    }

    initializeFarm() {
        const farmField = document.getElementById('farm-field');
        farmField.innerHTML = '';
        
        for (let i = 0; i < 16; i++) {
            const tile = {
                id: i,
                status: 'empty', // empty, planted, growing, ready
                growth: 0,
                maxGrowth: 100,
                watered: false
            };
            this.farmTiles.push(tile);
            
            const tileElement = document.createElement('div');
            tileElement.className = 'farm-tile empty';
            tileElement.id = `tile-${i}`;
            tileElement.innerHTML = '🌾';
            tileElement.addEventListener('click', () => this.selectTile(i));
            
            farmField.appendChild(tileElement);
        }
    }

    selectTile(id) {
        this.selectedTile = id;
        this.updateInfoPanel(this.farmTiles[id]);
        
        // Update visual selection
        document.querySelectorAll('.farm-tile').forEach((tile, index) => {
            if (index === id) {
                tile.style.border = '5px solid gold';
            } else {
                tile.style.border = '3px solid #8b4513';
            }
        });
    }

    updateInfoPanel(tile) {
        const infoText = document.getElementById('info-text');
        let info = '';
        
        switch(tile.status) {
            case 'empty':
                info = '📍 Lahan kosong. Klik "Tanam" untuk menanam (100💰)';
                break;
            case 'planted':
                info = '🌱 Tanaman baru ditanam. Siram untuk mempercepat pertumbuhan.';
                break;
            case 'growing':
                info = `🌿 Tanaman sedang tumbuh... (${Math.floor(tile.growth)}%)`;
                break;
            case 'ready':
                info = '🌾 Tanaman siap dipanen! Klik "Panen".';
                break;
        }
        
        infoText.textContent = info;
    }

    plantCrop() {
        if (this.selectedTile === null) {
            this.addLog('Pilih lahan terlebih dahulu!', 'warning');
            return;
        }

        const tile = this.farmTiles[this.selectedTile];
        
        if (tile.status !== 'empty') {
            this.addLog('Lahan ini sudah ditanami!', 'warning');
            return;
        }

        if (this.money < 100) {
            this.addLog('Uang tidak cukup untuk menanam! (Butuh 100💰)', 'warning');
            return;
        }

        this.money -= 100;
        tile.status = 'planted';
        tile.growth = 0;
        tile.watered = false;
        
        this.addLog('✅ Tanaman berhasil ditanam!', 'success');
        this.updateInfoPanel(tile);
        this.render();
    }

    waterCrop() {
        if (this.selectedTile === null) {
            this.addLog('Pilih lahan terlebih dahulu!', 'warning');
            return;
        }

        const tile = this.farmTiles[this.selectedTile];
        
        if (tile.status === 'empty') {
            this.addLog('Tidak ada tanaman di lahan ini!', 'warning');
            return;
        }

        if (tile.status === 'ready') {
            this.addLog('Tanaman sudah siap panen!', 'warning');
            return;
        }

        if (this.money < 25) {
            this.addLog('Uang tidak cukup untuk menyiram! (Butuh 25💰)', 'warning');
            return;
        }

        this.money -= 25;
        tile.watered = true;
        tile.growth += 20;
        
        if (tile.growth >= 100) {
            tile.status = 'ready';
            tile.growth = 100;
            this.addLog('🌾 Tanaman siap dipanen!', 'success');
        } else {
            tile.status = 'growing';
            this.addLog('💧 Tanaman berhasil disiram!', 'success');
        }
        
        this.updateInfoPanel(tile);
        this.render();
    }

    harvestCrop() {
        if (this.selectedTile === null) {
            this.addLog('Pilih lahan terlebih dahulu!', 'warning');
            return;
        }

        const tile = this.farmTiles[this.selectedTile];
        
        if (tile.status !== 'ready') {
            this.addLog('Tanaman belum siap dipanen!', 'warning');
            return;
        }

        this.crops += 1;
        tile.status = 'empty';
        tile.growth = 0;
        
        this.addLog('✂️ Tanaman berhasil dipanen!', 'success');
        this.updateInfoPanel(tile);
        this.render();
    }

    sellCrops() {
        if (this.crops === 0) {
            this.addLog('Tidak ada tanaman untuk dijual!', 'warning');
            return;
        }

        const sellAmount = this.crops * 10;
        this.money += sellAmount;
        
        this.addLog(`💵 ${this.crops} buah terjual! Dapatkan ${sellAmount}💰`, 'success');
        this.crops = 0;
        this.render();
    }

    nextDay() {
        this.day += 1;
        
        // Tanaman tumbuh otomatis setiap hari
        this.farmTiles.forEach(tile => {
            if (tile.status !== 'empty' && tile.status !== 'ready') {
                if (tile.watered) {
                    tile.growth += 15; // Tumbuh lebih cepat jika disiram
                } else {
                    tile.growth += 5; // Tumbuh lambat jika tidak disiram
                }
                
                if (tile.growth >= 100) {
                    tile.status = 'ready';
                    tile.growth = 100;
                } else {
                    tile.status = 'growing';
                }
                
                tile.watered = false;
            }
        });
        
        this.addLog(`📅 Sekarang hari ke-${this.day}`, 'info');
        this.render();
    }

    addLog(message, type = 'info') {
        const logElement = document.getElementById('log');
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = message;
        
        logElement.insertBefore(entry, logElement.firstChild);
        
        // Limit log entries to 20
        if (logElement.children.length > 20) {
            logElement.removeChild(logElement.lastChild);
        }
    }

    render() {
        // Update stats
        document.getElementById('money').textContent = this.money;
        document.getElementById('crops').textContent = this.crops;
        document.getElementById('day').textContent = this.day;

        // Update tiles
        this.farmTiles.forEach((tile, index) => {
            const tileElement = document.getElementById(`tile-${index}`);
            let emoji = '🌾';
            let className = 'farm-tile';
            
            switch(tile.status) {
                case 'empty':
                    emoji = '🌾';
                    className += ' empty';
                    tileElement.innerHTML = emoji;
                    break;
                case 'planted':
                    emoji = '🌱';
                    className += ' planted';
                    tileElement.innerHTML = emoji;
                    break;
                case 'growing':
                    emoji = '🌿';
                    className += ' growing';
                    const growthPercent = Math.min((tile.growth / tile.maxGrowth) * 100, 100);
                    tileElement.innerHTML = `${emoji}<div class="growth-bar"><div class="growth-bar-fill" style="width: ${growthPercent}%"></div></div>`;
                    break;
                case 'ready':
                    emoji = '🌾';
                    className += ' ready';
                    tileElement.innerHTML = emoji;
                    break;
            }
            
            tileElement.className = className;
        });

        // Update button states
        const cropsGreaterThanZero = this.crops > 0;
        document.getElementById('sell-btn').disabled = !cropsGreaterThanZero;
    }

    setupEventListeners() {
        document.getElementById('plant-btn').addEventListener('click', () => this.plantCrop());
        document.getElementById('water-btn').addEventListener('click', () => this.waterCrop());
        document.getElementById('harvest-btn').addEventListener('click', () => this.harvestCrop());
        document.getElementById('sell-btn').addEventListener('click', () => this.sellCrops());
        document.getElementById('next-day-btn').addEventListener('click', () => this.nextDay());
    }
}

// Start game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new FarmGame();
});
