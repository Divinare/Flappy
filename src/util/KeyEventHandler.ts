import EventManager from './EventManager';

const KEYCODES = {
    space: 'Space',
    click: 'click'
};

class KeyEventHandler {
    constructor() {
        document.addEventListener('keydown', this.handleKeyDownEvent);
        document.addEventListener('click', this.handleClickEvent);
    }

    private handleKeyDownEvent = (event: KeyboardEvent) => {
        switch (event.code) {
            case KEYCODES.space: {
                EventManager.trigger('space');
                break;
            }
        }
    };

    private handleClickEvent = (event: MouseEvent) => {
        EventManager.trigger('space');
    };
}

new KeyEventHandler();
