import Drawer from '../Drawer';
import constants from '../constants/constants';
import Player from './Player';

const HOLE_SIZE = constants.GAME_HEIGHT / 3;

interface PipeProps {
    width: number;
    x: number;
    speed: number;
}

interface Rectangle {
    left: number;
    top: number;
    bottom: number;
    right: number;
}

class Pipe {
    public x: number;
    private width: number;
    private topPartY: number;
    private bottomPartY: number;
    private speed: number;

    constructor(props: PipeProps) {
        this.x = props.x;
        this.width = props.width; // 10 - 480
        this.topPartY = (Math.random() * (constants.GAME_HEIGHT - HOLE_SIZE)) - 20; // 20 = buffer
        this.bottomPartY = this.topPartY + HOLE_SIZE;
        this.speed = props.speed;
    }

    public isIntersecting = (player: Player) => {
        const playerRectangle: Rectangle = {
            left: player.x,
            top: player.y,
            bottom: player.y + player.width,
            right: player.x + player.width
        }
        const topPartRectangle: Rectangle = {
            left: this.x,
            top: 0,
            bottom: this.topPartY,
            right: this.x + this.width
        }
        const bottomPartRectangle: Rectangle = {
            left: this.x,
            top: this.bottomPartY,
            bottom: constants.GAME_HEIGHT,
            right: this.x + this.width
        }
        if (this.intersectRect(playerRectangle, topPartRectangle) || this.intersectRect(playerRectangle, bottomPartRectangle)) {
            return true;
        }
        return false;
    }
    private intersectRect = (r1: Rectangle, r2: Rectangle) => {
        return !(r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
    }

    public update = () => {
        this.x -= this.speed;
    }

    public draw = () => {
        // Draw top part
        Drawer.fillRect(
            this.x,
            0,
            this.width,
            this.topPartY,
            constants.COLORS.PIPE_COLOR
        );
        // Draw bottom part
        Drawer.fillRect(
            this.x,
            this.bottomPartY,
            this.width,
            constants.GAME_HEIGHT,
            constants.COLORS.PIPE_COLOR
        );
    }

    public setSpeed = (speed: number) => {
        this.speed = speed;
    }

}

export default Pipe;