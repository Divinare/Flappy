const getCanvas = (): HTMLCanvasElement => {
    return document.getElementById('gameCanvas') as HTMLCanvasElement;
};

const getContext = (): CanvasRenderingContext2D => {
    return getCanvas().getContext('2d') as CanvasRenderingContext2D;
};

export { getCanvas, getContext };
