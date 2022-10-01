import Drawer from '../Drawer'
import Player from './Player'
import Pipe from './Pipe'
import '../util/KeyEventHandler'
import Dimensions from './Dimensions'

const dimensions = Dimensions.getInstance()

class Game {
    private player: Player
    private pipes: Pipe[]
    private isGameOver: boolean
    private level: number
    private pipeCount: number

    constructor() {
        this.isGameOver = false
        dimensions.initDimensions()
        this.initNewGame()
        this.updateDimensions()
    }

    private initNewGame = () => {
        this.player = new Player({
            x: dimensions.getPlayerWidth(),
            y: 0,
        })
        this.pipes = []
        this.level = 1
        this.pipeCount = 0
    }

    public gameLoop = () => {
        if (!this.isGameOver) {
            this.update()
            this.draw()
        }
    }

    public update = () => {
        this.player.update()
        this.pipes.forEach(pipe => {
            pipe.update()
            if (pipe.isIntersecting(this.player)) {
                this.isGameOver = true
                this.setHightScore()
            }
        })
        // Remove pipe if its outside of the window
        let xMargin = (window.innerWidth - dimensions.getGameWidth()) / 2
        if (
            this.pipes[0] &&
            this.pipes[0].x < -xMargin - dimensions.getPipeWidth()
        ) {
            this.pipes.shift()
        }

        const lastPipe = this.pipes.slice(-1)[0]
        if (!lastPipe) {
            this.addPipe()
        } else if (
            lastPipe.x + xMargin <
            dimensions.getGameWidth() - dimensions.getDistanceBetweenPipes()
        ) {
            this.addPipe()
            if (this.pipeCount > 4 && this.pipeCount % 3 === 0) {
                this.level++
                this.pipes.forEach(pipe => pipe.setSpeed(this.getPipeSpeed()))
            }
        }
    }

    public updateDimensions = () => {
        dimensions.updateDimensions()
        this.player.updateDimensions()
        this.pipes.forEach(pipe => {
            pipe.updateDimensions()
        })
        this.draw()
    }

    public draw = () => {
        Drawer.clearCanvas()
        Drawer.drawBackground('#001d26')
        this.pipes.forEach(pipe => pipe.draw())
        this.player.draw()
        Drawer.drawText(
            dimensions.getGameWidth() - 150,
            25,
            `Level ${this.level}`,
            '20px Arial',
            '#ecf0f1'
        )
        const highscore = localStorage.getItem('flappy-highscore')
        if (highscore) {
            Drawer.drawText(
                dimensions.getGameWidth() - 150,
                50,
                `Highscore ${highscore}`,
                '20px Arial',
                '#ecf0f1'
            )
        }
    }

    private addPipe = () => {
        const pipe = new Pipe({
            x: dimensions.getInitialPipeSpawnXPosition(),
            speed: this.getPipeSpeed(),
        })
        this.pipes.push(pipe)
        this.pipeCount += 1
    }

    private getPipeSpeed = () => {
        return dimensions.getGameWidth() / 200 + this.level * 1.25
    }

    private setHightScore = () => {
        const oldHighscore = localStorage.getItem('flappy-highscore')
        if (!oldHighscore) {
            localStorage.setItem('flappy-highscore', '' + this.level)
        } else if (parseInt(oldHighscore) < this.level) {
            localStorage.setItem('flappy-highscore', '' + this.level)
        }
    }
}

export default Game
