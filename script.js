* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.game-container {
    background: #f5f5f5;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 1000px;
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
    border-radius: 15px;
    color: white;
}

.header h1 {
    font-size: 2.5em;
    margin-bottom: 15px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.stats {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
}

.stat-item {
    font-size: 1.3em;
    background: rgba(255, 255, 255, 0.2);
    padding: 10px 20px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
}

.stat-item span {
    font-weight: bold;
    color: #ffeb3b;
}

.game-board {
    background: #90ee90;
    border-radius: 15px;
    padding: 20px;
    margin: 20px 0;
    min-height: 300px;
    border: 3px solid #228b22;
}

.farm-field {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
}

.farm-tile {
    aspect-ratio: 1;
    border: 3px solid #8b4513;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, #d2b48c 0%, #8b7355 100%);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    position: relative;
}

.farm-tile:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.farm-tile.empty {
    background: linear-gradient(135deg, #daa520 0%, #cd853f 100%);
}

.farm-tile.planted {
    background: linear-gradient(135deg, #90ee90 0%, #228b22 100%);
}

.farm-tile.growing {
    background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%);
}

.farm-tile.ready {
    background: linear-gradient(135deg, #ffa500 0%, #ff8c00 100%);
}

.growth-bar {
    position: absolute;
    bottom: 5px;
    width: 90%;
    height: 5px;
    background: #ccc;
    border-radius: 3px;
    overflow: hidden;
}

.growth-bar-fill {
    height: 100%;
    background: #4caf50;
    transition: width 0.3s ease;
}

.controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    margin: 20px 0;
}

.btn {
    padding: 12px 20px;
    font-size: 1em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.btn:active {
    transform: translateY(0);
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.btn-secondary {
    background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
    color: white;
}

.btn-success {
    background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
    color: white;
}

.btn-warning {
    background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
    color: white;
}

.btn-info {
    background: linear-gradient(135deg, #2196f3 0%, #1565c0 100%);
    color: white;
}

.info-panel {
    background: linear-gradient(135deg, #fff9c4 0%, #fff176 100%);
    padding: 20px;
    border-radius: 10px;
    border: 2px solid #fbc02d;
    margin-bottom: 20px;
}

.info-panel h3 {
    color: #f57f17;
    margin-bottom: 10px;
}

.info-panel p {
    color: #333;
    font-size: 1.1em;
}

.log {
    background: #f0f0f0;
    border: 2px solid #ccc;
    border-radius: 10px;
    padding: 15px;
    height: 150px;
    overflow-y: auto;
    font-size: 0.95em;
    line-height: 1.6;
}

.log-entry {
    padding: 5px 0;
    border-bottom: 1px solid #ddd;
}

.log-entry:last-child {
    border-bottom: none;
}

.log-entry.success {
    color: #4caf50;
    font-weight: bold;
}

.log-entry.warning {
    color: #ff9800;
    font-weight: bold;
}

.log-entry.info {
    color: #2196f3;
}

/* Scrollbar styling */
.log::-webkit-scrollbar {
    width: 8px;
}

.log::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.log::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

.log::-webkit-scrollbar-thumb:hover {
    background: #555;
}

/* Responsive Design */
@media (max-width: 768px) {
    .farm-field {
        grid-template-columns: repeat(3, 1fr);
    }

    .header h1 {
        font-size: 1.8em;
    }

    .stats {
        gap: 15px;
    }

    .controls {
        flex-direction: column;
    }

    .btn {
        width: 100%;
    }

    .game-container {
        padding: 20px;
    }
}

@media (max-width: 480px) {
    .farm-field {
        grid-template-columns: repeat(2, 1fr);
    }

    .game-container {
        padding: 15px;
    }

    .header h1 {
        font-size: 1.5em;
    }

    .stat-item {
        font-size: 1em;
        padding: 8px 15px;
    }

    .farm-tile {
        font-size: 2em;
    }

    .btn {
        padding: 10px 15px;
        font-size: 0.9em;
    }
}

/* Animation */
@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

.farm-tile.ready {
    animation: bounce 1s infinite;
}
