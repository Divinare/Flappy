const commonConstants = {
    FRAME_RATE: 20,
    COLORS: {
        PLAYER_COLOR: '#3498db',
        PIPE_COLOR: '#16a085',
    },
}

const developmentConstants = {
    ...commonConstants,
}

const productionConstants = {
    ...commonConstants,
}

const isDevelopment = process.env.NODE_ENV === 'development'

export default isDevelopment ? developmentConstants : productionConstants
