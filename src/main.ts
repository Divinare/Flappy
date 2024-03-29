import constants from './constants/constants'
import Game from './game/Game'

const gameCanvas: any = document.getElementById('gameCanvas')
gameCanvas.height = window.innerHeight
gameCanvas.width = window.innerWidth

const gameObj = new Game()

const updateDimensions = () => {
    gameCanvas.height = window.innerHeight
    gameCanvas.width = window.innerWidth
    gameObj.updateDimensions()
}

window.addEventListener('resize', updateDimensions)

window.setInterval(() => {
    update()
}, constants.FRAME_RATE)

const update = () => {
    gameObj.gameLoop()
}
