import Drawer from '../Drawer';
import constants from '../constants/constants';
import EventManager from '../util/EventManager';

const GRAVITY = 0.5;
const MAX_VELOCITY = -15;
const LIFT = -25;
const AIR_RESISTANCE = 0.5;

interface PlayerProps {
    x: number; // center of the player
    y: number;
    width: number;
}

class Player {
    public x: number;
    public y: number;
    public width: number;
    private gravity: number;
    private velocity: number;
    private maxVelocity: number;
    private lift: number;
    private airResistance: number;

    constructor(props: PlayerProps) {
        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.velocity = 0;
        EventManager.on('space', this.moveUp);
    }

    public moveUp = () => {
        this.velocity += LIFT;
        if (this.velocity < MAX_VELOCITY) {
            this.velocity = MAX_VELOCITY;
        }
    }


    public update = () => {
        this.velocity += GRAVITY;
        this.velocity += AIR_RESISTANCE;
        if (this.velocity > -MAX_VELOCITY) {
            this.velocity = -MAX_VELOCITY;
        }
        this.y += this.velocity;
        if (this.y >= constants.GAME_HEIGHT - this.width) {
            this.y = constants.GAME_HEIGHT - this.width;
            this.velocity = 0;
        }
        if (this.y <= 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }

    public draw = () => {
        const x = this.x;
        const y = this.y;

        const color = constants.COLORS.PLAYER_COLOR;

        Drawer.fillRect(
            x,
            y,
            this.width,
            this.width,
            color
        );
    };
}

export default Player;
