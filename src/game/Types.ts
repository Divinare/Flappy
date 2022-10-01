export interface DrawableClass {
    update: () => void
    draw: () => void
    updateDimensions: () => void
}
