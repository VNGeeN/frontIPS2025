// export * from './types/type';
// export * from './functions/functions';

export type {
  Presentation,
  Slide,
  TextObject,
  ImageObject,
  Background,
  SolidBackground,
  ImageBackground,
  Position,
  Size
} from '../types/presentationTypes';

export {
  changePresentationTitle,
  addSlide,
  deleteSlide,
  swapSlides,
  addSlideObject,
  removeSlideObject,
  incSlideObjectLayer,
  decSlideObjectLayer,
  changeSlideObjectPosition,
  changeSlideObjectSize,
  changeSlideObjectTextValue,
  changeSlideObjectFontSize,
  changeSlideObjectFontFamily,
  changeSlideObjectFontWeight,
  changeSlideObjectFontColor,
  changeSlideObjectImageSrc,
  setSlideBackgroundType,
  setSlideBackgroundColor,
  setSlideBackgroundImage,
  defaultImageElement
} from '../functions/functions';

export {
    SLIDE_WIDTH,
    SLIDE_HEIGHT    
} from '../../views/presentation/slide/Slide';