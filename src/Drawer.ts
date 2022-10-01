import Dimensions from './game/Dimensions'
import * as DrawUtils from './util/drawUtils'

const dimensions = Dimensions.getInstance()

class Drawer {
    public fillRect = (
        x1: number, // x-coordinate of the upper left corner of rectangle
        y1: number, // y-coordinate of the upper left corner of rectangle
        width: number, // rectangle width
        height: number, // rectangle height
        color: string
    ) => {
        const ctx = DrawUtils.getContext()
        ctx.fillStyle = color

        // Translate game the center of the screen
        let yMargin = (window.innerHeight - dimensions.getGameHeight()) / 2
        let xMargin = (window.innerWidth - dimensions.getGameWidth()) / 2

        ctx.fillRect(x1 + xMargin, y1 + yMargin, width, height)
    }

    public drawBackground = (color: string) => {
        let gameWidth = dimensions.getGameWidth()
        let gameHeight = dimensions.getGameHeight()
        this.fillRect(0, 0, gameWidth, gameHeight, color)
    }

    public drawText = (
        x: number,
        y: number,
        text: string,
        font: string,
        color: string
    ) => {
        const ctx = DrawUtils.getContext()
        ctx.fillStyle = color
        ctx.font = font
        ctx.fillText(text, x, y)
    }

    public clearCanvas = () => {
        const ctx = DrawUtils.getContext()
        const canvas = DrawUtils.getCanvas()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
}

export default new Drawer()
