import Drawer from '../Drawer'
import constants from '../constants/constants'
import EventManager from '../util/EventManager'
import Dimensions from './Dimensions'
import { DrawableClass } from './Types'

interface PlayerProps {
    x: number // center of the player
    y: number
}

const dimensions = Dimensions.getInstance()

class Player implements DrawableClass {
    public x: number
    public y: number
    public width: number
    private velocity: number

    constructor(props: PlayerProps) {
        this.x = props.x
        this.y = props.y
        this.velocity = 0
        this.updateDimensions()
        EventManager.on('space', this.moveUp)
    }

    public moveUp = () => {
        this.velocity += this.getLift()
        if (this.velocity < this.getMaxVelocity()) {
            this.velocity = this.getMaxVelocity()
        }
    }

    public update = () => {
        this.velocity += this.getGravity()
        this.velocity += this.getAirResistance()
        if (this.velocity > -this.getMaxVelocity()) {
            this.velocity = -this.getMaxVelocity()
        }
        this.y += this.velocity
        if (this.y >= dimensions.getGameHeight() - this.width) {
            this.y = dimensions.getGameHeight() - this.width
            this.velocity = 0
        }
        if (this.y <= 0) {
            this.y = 0
            this.velocity = 0
        }
    }

    public draw = () => {
        const x = this.x
        const y = this.y

        const color = constants.COLORS.PLAYER_COLOR

        Drawer.fillRect(x, y, this.width, this.width, color)
    }

    public updateDimensions = () => {
        this.width = dimensions.getPlayerWidth()
    }

    // GRAVITY = 0.5
    private getGravity = (): number => {
        return dimensions.getGameWidth() / 2250
    }

    // AIR_RESISTANCE = 0.5
    private getAirResistance = (): number => {
        return dimensions.getGameWidth() / 2250
    }

    // LIFT = -25
    private getLift = (): number => {
        return -dimensions.getGameWidth() / 40
    }

    // MAX_VELOCITY = -15
    private getMaxVelocity = (): number => {
        return -dimensions.getGameWidth() / 50
    }
}

export default Player
