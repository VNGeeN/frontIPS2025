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

export type Background = SolidBackground | ImageBackground;

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
  // angle: number;
};

// Размер
export type Size = {
  width: number;
  height: number;
};