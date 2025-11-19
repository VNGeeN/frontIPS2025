export enum EventType {
    TITLE_CHANGE = "TITLE_CHANGE",
    SLIDE_CLICK = "SLIDE_CLICK",
    ELEMENT_CLICK = "ELEMENT_CLICK",
    TOOLBAR_ACTION = "TOOLBAR_ACTION",
    MODEL_UPDATE = "MODEL_UPDATE"
}

export interface AppEvent {
    type: EventType,
    data?: any
}