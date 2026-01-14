// export type Presentation = {
//     title: string,
//     slideCollection: SlideCollection,
//     size: Size,
//     state: SelectionState,
// }

// export type SlideCollection = {
//     slides: Slide[];
// }

// export type Slide = {
//     id: string,
//     slideElements: SlideElement[],
//     background: SlideBackground,
// }

// export type SlideBackground = BackgroundImage | BackgroundColor;

// export type BackgroundImage = {
//     type: 'image',
//     src: string,
// }

// export type BackgroundColor = {
//     type: 'color',
//     color: string,
// }

// export type SlideElement = TextType | ImageType;

// export type TextType = Position & Size & {
//     id: string,
//     type: 'text',
//     value: string,
//     fontFamily: string,
//     fontSize: string,
//     fontWeight: string,
//     color: string,
// }

// export type ImageType = Position & Size & {
//     id: string,
//     type: 'image',
//     src: string,
// }

// export type Size = {
//     width: number,
//     height: number
// }

// export type Position = {
//     x: number,
//     y: number,
// }

// export type SelectionState = {
//     currentSlide: string | null,
//     selectedSlides: string[],
//     activeElements: string[],
// }

export type Presentation = {
  title: string;
  slides: Slide[];
};

// Базовый тип для всех объектов на слайде
export type SlideObjectProperties = {
  id: string;
  position: Position,
  size: Size
};

// Типы объектов
export type TextObject = SlideObjectProperties & {
  type: 'text';
  value: string;
  fontFamily: string;
  fontSize: number;      // number, как в первой реализации
  fontWeight: number;    // number, как в первой реализации
  fontColor: string;     // единое имя поля
};

export type ImageObject = SlideObjectProperties & {
  type: 'image';
  src: string;
};

export type SlideElement = TextObject | ImageObject;

// Фон
export type SolidBackground = {
  type: 'solid';
  color: string;
};

export type ImageBackground = {
  type: 'image';
  src: string;
};

export type Background = {
  type: SolidBackground | ImageBackground
};

// Слайд
export type Slide = {
  id: string;
  background: Background;
  objects: SlideElement[]; // переименовано из slideElements → objects
};

// Позиция теперь включает угол
export type Position = {
  x: number;
  y: number;
  angle: number;
};

// Размер
export type Size = {
  width: number;
  height: number;
};