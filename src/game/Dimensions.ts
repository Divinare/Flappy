class Dimensions {
    private gameWidth: number
    private gameHeight: number
    private holeSize: number
    private distanceBetweenPipes: number

    private static _instance: Dimensions
    public static getInstance(): Dimensions {
        return this._instance || (this._instance = new this())
    }

    public initDimensions = () => {
        this.updateDimensions()
    }

    public updateDimensions = () => {
        let dimensions = this.getGameDimensions()
        this.gameWidth = dimensions.width
        this.gameHeight = dimensions.height
        this.holeSize = this.gameHeight / 2.5
        this.distanceBetweenPipes = this.gameWidth / 1.5
    }

    // The idea here is to keep the same aspect ratio (16:9), no matter what screen width and height are
    private getGameDimensions = () => {
        let height: number
        let width: number
        if (window.innerHeight > window.innerWidth * 0.5625) {
            height = window.innerWidth * 0.5625
            width = window.innerWidth
        } else {
            height = window.innerHeight
            width = window.innerHeight / 0.5625
        }
        return {
            height,
            width,
        }
    }

    public getGameWidth = (): number => {
        return this.gameWidth
    }

    public getGameHeight = (): number => {
        return this.gameHeight
    }

    public getPlayerWidth = (): number => {
        return this.getGameWidth() / 30
    }

    public getPipeWidth = (): number => {
        return this.getPlayerWidth() * 2
    }

    public getHoleSize = (): number => {
        return this.holeSize
    }

    public getDistanceBetweenPipes = (): number => {
        return this.distanceBetweenPipes
    }

    public getInitialPipeSpawnXPosition = (): number => {
        return this.gameWidth + this.getPipeWidth()
    }
}

export default Dimensions
