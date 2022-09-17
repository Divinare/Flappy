type EventName = 'space' | 'click'

class EventManager {
    public trigger(eventName: EventName, data?: any) {
        const event = new CustomEvent(eventName, {
            bubbles: true,
            detail: data,
        })
        document.dispatchEvent(event)
    }
    public on(eventName: EventName, callback: any) {
        document.addEventListener(eventName, callback)
    }

    public off(eventName: EventName, callback: any) {
        document.removeEventListener(eventName, callback)
    }
}

export { EventName }

export default new EventManager()
