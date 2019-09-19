import Drawer from '../Drawer';
import Player from './Player';
import Pipe from './Pipe';
import '../util/KeyEventHandler';
import constants from '../constants/constants';

const PIPE_WIDTH = constants.GAME_WIDTH / 20;
const PLAYER_WIDTH = PIPE_WIDTH / 2;
const DISTANCE_BETWEEN_PIPES = constants.GAME_WIDTH / 5;
const PIPE_SPAWN_X = constants.GAME_WIDTH + PIPE_WIDTH; // initial pipe start position

class Game {
    private player: Player;
    private pipes: Pipe[];
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
                this.setHightScore();
            }
        });
        // Remove pipe if its outside of the window
        if (this.pipes[0] && this.pipes[0].x < (0 - PIPE_WIDTH)) {
            this.pipes.shift();
        }

        const lastPipe = this.pipes.slice(-1)[0];
        if (!lastPipe) {
            this.addPipe();
        } else if (lastPipe.x < constants.GAME_WIDTH - DISTANCE_BETWEEN_PIPES) {
            this.addPipe();
            if (this.pipeCount > 5 && this.pipeCount % 4 === 0) {
                this.level++;
                this.pipes.forEach(pipe => pipe.setSpeed(this.getPipeSpeed()));
            }
        }
    }

    public draw = () => {
        Drawer.clearCanvas();
        this.pipes.forEach(pipe => pipe.draw());
        this.player.draw();
        Drawer.drawText(constants.GAME_WIDTH - 150, 25, `Level ${this.level}`, '20px Arial', '#ecf0f1');
        const highscore = localStorage.getItem('flappy-highscore');
        if (highscore) {
            Drawer.drawText(constants.GAME_WIDTH - 150, 50, `Highscore ${highscore}`, '20px Arial', '#ecf0f1');
        }
    }

    private addPipe = () => {
        const pipe = new Pipe({ x: PIPE_SPAWN_X, width: PIPE_WIDTH, speed: this.getPipeSpeed() });
        this.pipes.push(pipe);
        this.pipeCount += 1;
    }

    private getPipeSpeed = () => {
        return 5 + (this.level * 1.5);
    }

    private setHightScore = () => {
        const oldHighscore = localStorage.getItem('flappy-highscore');
        if (!oldHighscore) {
            localStorage.setItem('flappy-highscore', '' + this.level);
        } else if (parseInt(oldHighscore) < this.level) {
            localStorage.setItem('flappy-highscore', '' + this.level);
        }
    }
}

export default Game;
