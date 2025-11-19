export type Presentation = {
    title: string,
    slideCollection: SlideCollection,
    size: Size,
    state: SelectionState,
}

export type SlideCollection = {
    slides: Slide[];
}

export type Slide = {
    id: string,
    slideElements: SlideElement[],
    background: SlideBackground,
}

export type SlideBackground = BackgroundImage | BackgroundColor;

export type BackgroundImage = {
    type: 'image',
    src: string,
}

export type BackgroundColor = {
    type: 'color',
    color: string,
}

export type SlideElement = TextType | ImageType;

export type TextType = Position & Size & {
    id: string,
    type: 'text',
    value: string,
    fontFamily: string,
    fontSize: string,
    fontWeight: string,
    color: string,
}

export type ImageType = Position & Size & {
    id: string,
    type: 'image',
    src: string,
}

export type Size = {
    width: number,
    height: number
}

export type Position = {
    x: number,
    y: number,
}

export type SelectionState = {
    currentSlide: string | null,
    selectedSlides: string[],
    activeElements: string[],
}