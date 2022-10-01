import Drawer from '../Drawer'
import constants from '../constants/constants'
import Player from './Player'
import Dimensions from './Dimensions'
import { DrawableClass } from './Types'

const dimensions = Dimensions.getInstance()

interface PipeProps {
    x: number
    speed: number
}

interface Rectangle {
    left: number
    top: number
    bottom: number
    right: number
}

class Pipe implements DrawableClass {
    public x: number
    private width: number
    private topPartY: number
    private bottomPartY: number
    private speed: number

    constructor(props: PipeProps) {
        this.x = props.x
        this.topPartY =
            Math.random() *
                (dimensions.getGameHeight() - dimensions.getHoleSize()) -
            20 // 20 = buffer
        this.bottomPartY = this.topPartY + dimensions.getHoleSize()
        this.speed = props.speed
        this.updateDimensions()
    }

    public isIntersecting = (player: Player) => {
        const playerRectangle: Rectangle = {
            left: player.x,
            top: player.y,
            bottom: player.y + player.width,
            right: player.x + player.width,
        }
        const topPartRectangle: Rectangle = {
            left: this.x,
            top: 0,
            bottom: this.topPartY,
            right: this.x + this.width,
        }
        const bottomPartRectangle: Rectangle = {
            left: this.x,
            top: this.bottomPartY,
            bottom: dimensions.getGameHeight() + this.bottomPartY,
            right: this.x + this.width,
        }
        if (
            this.intersectRect(playerRectangle, topPartRectangle) ||
            this.intersectRect(playerRectangle, bottomPartRectangle)
        ) {
            return true
        }
        return false
    }
    private intersectRect = (r1: Rectangle, r2: Rectangle) => {
        return !(
            r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top
        )
    }

    public update = () => {
        this.x -= this.speed
    }

    public draw = () => {
        // Draw top part
        Drawer.fillRect(
            this.x,
            0,
            this.width,
            this.topPartY,
            constants.COLORS.PIPE_COLOR
        )
        // Draw bottom part
        Drawer.fillRect(
            this.x,
            this.bottomPartY,
            this.width,
            dimensions.getGameHeight() - this.bottomPartY,
            constants.COLORS.PIPE_COLOR
        )
    }

    public setSpeed = (speed: number) => {
        this.speed = speed
    }

    public updateDimensions = () => {
        this.width = dimensions.getPipeWidth()
    }
}

export default Pipe
