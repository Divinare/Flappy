import Drawer from '../Drawer';
import Player from './Player';
import Pipe from './Pipe';
import '../util/KeyEventHandler';
import constants from '../constants/constants';

const PIPE_COUNT = 4;
const PIPE_WIDTH = constants.GAME_WIDTH / 20;
const PLAYER_WIDTH = PIPE_WIDTH / 2;
const PIPE_SPAWN_X = constants.GAME_WIDTH + PIPE_WIDTH; // initial pipe start position

class Game {
    private player: Player;
    private pipes: Pipe[];
    private frameCount: number;
    private isGameOver: boolean;
    private level: number;
    private pipeCount: number;
    constructor() {
        this.isGameOver = false;
        this.initNewGame();
    }

    private initNewGame = () => {
        this.player = new Player({ x: 100, y: 0, width: PLAYER_WIDTH });
        this.pipes = [];
        this.frameCount = 0;
        this.level = 1;
        this.pipeCount = 0;
    }

    public gameLoop = () => {
        if (!this.isGameOver) {
            this.update();
            this.draw();
        }
    }

    public update = () => {
        this.player.update();
        this.pipes.forEach(pipe => {
            pipe.update();
            if (pipe.isIntersecting(this.player)) {
                this.isGameOver = true;
            }
        });
        // Remove pipe if its outside of the window
        if (this.pipes[0] && this.pipes[0].x < (0 - PIPE_WIDTH)) {
            this.pipes.shift();
        }
        if (this.frameCount % 100 === 0) {
            this.addPipe();
            this.pipeCount += 1;
            if (this.pipeCount > 5 && this.pipeCount % 4 === 0) {
                this.level++;
                this.pipes.forEach(pipe => pipe.setSpeed(this.level + 1));
            }
        }

        this.frameCount++;
    }

    private addPipe = () => {
        const pipe = new Pipe({ x: PIPE_SPAWN_X, width: PIPE_WIDTH, speed: this.level + 1 });
        this.pipes.push(pipe);
    }

    public draw = () => {
        Drawer.clearCanvas();
        this.pipes.forEach(pipe => pipe.draw());
        this.player.draw();
        Drawer.drawText(constants.GAME_WIDTH - 100, 25, `Level ${this.level}`, '20px Arial', '#ecf0f1');
    }

}

export default Game;
