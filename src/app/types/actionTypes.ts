export enum ActionType {
    ADD_SLIDE = "ADD_SLIDE",
    DELETE_SLIDE = "DELETE_SLIDE",
    MOVE_SLIDE = "MOVE_SLIDE",
    ADD_TEXT_ELEMENT = "ADD_TEXT_ELEMENT",
    ADD_IMAGE_ELEMENT = "ADD_IMAGE_ELEMENT",
    DELETE_ELEMENT = "DELETE_ELEMENT",
    MOVE_ELEMENT = "MOVE_ELEMENT",
    RESIZE_ELEMENT = "RESIZE_ELEMENT",
    CHANGE_TEXT = "CHANGE_TEXT",
    CHANGE_FONT_SIZE = "CHANGE_FONT_SIZE",
    CHANGE_FONT_FAMILY = "CHANGE_FONT_FAMILY",
    CHANGE_BACKGROUND = "CHANGE_BACKGROUND",
    CHANGE_TITLE = "CHANGE_TITLE",
    SELECT_SLIDE = "SELECT_SLIDE",
    SELECT_ELEMENT = "SELECT_SLIDE"
}

export enum ElementType {
    TEXT = "text",
    IMAGE = "image"
}

export enum BackgroundType {
    COLOR = "color",
    IMAGE = "image"
}

export enum FontWeight {
    NORMAL = "",
    BOLD = "",
    BOLDER = "",
    LIGHTER = "",
    _100 = "100",
    _200 = "200",
    _300 = "300",
    _400 = "400",
    _500 = "500",
    _600 = "600",
    _700 = "700",
    _800 = "800",
    _900 = "900",
}