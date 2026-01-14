// import {
//   Presentation,
//   SlideCollection,
//   Slide,
//   SlideElement,
//   TextType,
//   ImageType,
//   Size,
//   Position,
//   SelectionState,
//   SlideBackground,
//   BackgroundImage,
//   BackgroundColor
// } from '../types/type';

// export const changePresentationTitle = (presentation: Presentation, title: string): Presentation => {
//   return {
//     ...presentation,
//     title,
//   };
// };

// export const setCurrentSlide = (presentation: Presentation, slideId: string): Presentation => {
//   return {
//     ...presentation,
//     state: {
//       ...presentation.state,
//       currentSlide: slideId,
//       activeElements: []
//     }
//   };
// };

// export const addNewSlide = (presentation: Presentation, slide: Slide): Presentation => {
//   const slides = presentation.slideCollection.slides;

//   let insertIndex = slides.length;
//   if (presentation.state.currentSlide) {
//     const currentSlideIndex = getSlideIndexById(presentation, presentation.state.currentSlide);
//     if (currentSlideIndex !== -1) {
//       insertIndex = currentSlideIndex + 1;
//     }
//   }
//   let newSlides: Slide[] = [];

//   newSlides = [
//     ...slides.slice(0, insertIndex),
//     slide,
//     ...slides.slice(insertIndex)
//   ];

//   const newSlideCollection: SlideCollection = {
//     slides: newSlides,
//   };

//   return {
//     ...presentation,
//     slideCollection: newSlideCollection,
//     state: {
//       ...presentation.state,
//       currentSlide: slide.id,
//       selectedSlides: [slide.id],
//       activeElements: []
//     }
//   };
// };

// export const deleteSlide = (presentation: Presentation): Presentation => {
//   const slides = presentation.slideCollection.slides;

//   if (slides.length === 0 || !presentation.state.currentSlide) {
//     return presentation;
//   }

//   const currentSlideIndex = getSlideIndexById(presentation, presentation.state.currentSlide);
//   if (currentSlideIndex === -1) {
//     return presentation;
//   }

//   let newSlides: Slide[] = [];

//   newSlides = [
//     ...slides.slice(0, currentSlideIndex),
//     ...slides.slice(currentSlideIndex + 1)
//   ];

//   if (newSlides.length === 0) {
//     console.warn('Последний слайд был удален');
//   }

//   const newSlideCollection: SlideCollection = {
//     slides: newSlides,
//   };

//   let newCurrentSlideId: string | null = null;

//   if (newSlides.length > 0) {
//     // Если удалили не последний слайд, берем следующий
//     if (currentSlideIndex < newSlides.length) {
//       newCurrentSlideId = newSlides[currentSlideIndex].id;
//     }
//     // Если удалили последний слайд, берем предыдущий
//     else if (currentSlideIndex > 0) {
//       newCurrentSlideId = newSlides[currentSlideIndex - 1].id;
//     }
//     // Если остался только один слайд
//     else {
//       newCurrentSlideId = newSlides[0].id;
//     }
//   }

//   return {
//     ...presentation,
//     slideCollection: newSlideCollection,
//     state: {
//       ...presentation.state,
//       currentSlide: newCurrentSlideId,
//       selectedSlides: newCurrentSlideId ? [newCurrentSlideId] : [],
//       activeElements: []
//     }
//   };
// };

// export const moveSlide = (presentation: Presentation, toIndex: number): Presentation => {
//   const slides = presentation.slideCollection.slides;
//   const selectedSlides = presentation.state.selectedSlides;

//   if (selectedSlides.length === 0) {
//     return presentation;
//   }

//   const selectedIndices = selectedSlides
//     .map(id => slides.findIndex(slide => slide.id === id))
//     .filter(index => index !== -1)
//     .sort((a, b) => a - b);

//   if (selectedIndices.length === 0) {
//     return presentation;
//   }

//   const newSlides = [...slides];

//   const movedSlides = [];
//   for (let i = selectedIndices.length - 1; i >= 0; i--) {
//     const index = selectedIndices[i];
//     movedSlides.unshift(newSlides.splice(index, 1)[0]);
//   }

//   newSlides.splice(toIndex, 0, ...movedSlides);

//   return {
//     ...presentation,
//     slideCollection: {
//       slides: newSlides
//     }
//   };
// };

// export const addTextElement = (presentation: Presentation, textElement: Omit<TextType, 'id'>): Presentation => {
//   if (!presentation.state.currentSlide) {
//     console.error("Не выбран текущий слайд");
//     return presentation;
//   }

//   const currentSlideId = presentation.state.currentSlide;

//   try {
//     const currentSlide = getSlideById(presentation, currentSlideId);
//     const slides = presentation.slideCollection.slides;
//     const slideIndex = getSlideIndexById(presentation, currentSlideId);

//     if (slideIndex === -1) {
//       console.error("Слайд не найден");
//       return presentation;
//     }

//     // Генерация ID с fallback для сред без crypto
//     let newId: string;
//     try {
//       newId = crypto.randomUUID();
//     } catch (e) {
//       newId = `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
//     }

//     const newTextElement: TextType = {
//       ...textElement,
//       id: newId,
//     };

//     const updatedSlide: Slide = {
//       ...currentSlide,
//       slideElements: [...currentSlide.slideElements, newTextElement]
//     };

//     const newSlides = [...slides];
//     newSlides[slideIndex] = updatedSlide;

//     return {
//       ...presentation,
//       slideCollection: {
//         slides: newSlides
//       },
//       state: {
//         ...presentation.state,
//         activeElements: [newTextElement.id]
//       }
//     };
//   } catch (error) {
//     console.error("Ошибка добавления текстового элемента:", error);
//     return presentation;
//   }
// };


// export const addImageElement = (presentation: Presentation, imageElement: Omit<ImageType, 'id'>): Presentation => {
//   if (!presentation.state.currentSlide) {
//     console.error("Не выбран текущий слайд");
//     return presentation;
//   }

//   const currentSlideId = presentation.state.currentSlide;

//   try {
//     const currentSlide = getSlideById(presentation, currentSlideId);
//     const slides = presentation.slideCollection.slides;
//     const slideIndex = getSlideIndexById(presentation, currentSlideId);

//     if (slideIndex === -1) {
//       console.error("Слайд не найден");
//       return presentation;
//     }

//     // Генерация ID с fallback для сред без crypto
//     let newId: string;
//     try {
//       newId = crypto.randomUUID();
//     } catch (e) {
//       newId = `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
//     }

//     const newImageElement: ImageType = {
//       ...imageElement,
//       id: newId,
//     };

//     const updatedSlide: Slide = {
//       ...currentSlide,
//       slideElements: [...currentSlide.slideElements, newImageElement]
//     };

//     const newSlides = [...slides];
//     newSlides[slideIndex] = updatedSlide;

//     return {
//       ...presentation,
//       slideCollection: {
//         slides: newSlides
//       },
//       state: {
//         ...presentation.state,
//         activeElements: [newImageElement.id]
//       }
//     };
//   } catch (error) {
//     console.error("Ошибка добавления изображения:", error);
//     return presentation;
//   }
// };

// export const deleteSlideElements = (presentation: Presentation, elementIds: string[]): Presentation => {
//   if (!presentation.state.currentSlide) {
//     console.error('Не выбран текущий слайд');
//     return presentation;
//   }

//   if (elementIds.length === 0) {
//     console.error('Не указаны элементы для удаления');
//     return presentation;
//   }

//   const currentSlideId = presentation.state.currentSlide;

//   try {
//     const currentSlide = getSlideById(presentation, currentSlideId);
//     const slides = presentation.slideCollection.slides;
//     const slideIndex = getSlideIndexById(presentation, currentSlideId);

//     if (slideIndex === -1) {
//       console.error('Слайд не найден');
//       return presentation;
//     }

//     const newSlideElements = currentSlide.slideElements.filter(
//       element => !elementIds.includes(element.id)
//     );

//     if (newSlideElements.length === currentSlide.slideElements.length) {
//       console.error('Элементы для удаления не найдены на слайде');
//       return presentation;
//     }

//     const updateSlide: Slide = {
//       ...currentSlide,
//       slideElements: newSlideElements,
//     };
//     const newSlides = [...slides];
//     newSlides[slideIndex] = updateSlide;

//     const newActiveElements = presentation.state.activeElements.filter(
//       id => !elementIds.includes(id)
//     );

//     return {
//       ...presentation,
//       slideCollection: {
//         slides: newSlides
//       },
//       state: {
//         ...presentation.state,
//         activeElements: newActiveElements
//       }
//     };
//   }
//   catch (error) {
//     console.error('Ошибка удаления элемента');
//     return presentation;
//   }
// };

// export const moveElements = (presentation: Presentation, elementIds: string[], delta: Position): Presentation => {
//   if (!presentation.state.currentSlide) {
//     console.error('Не выбран текущий слайд');
//     return presentation;
//   }

//   const currentSlideId = presentation.state.currentSlide;

//   try {
//     const currentSlide = getSlideById(presentation, currentSlideId);
//     const slides = presentation.slideCollection.slides;
//     const slideIndex = getSlideIndexById(presentation, currentSlideId);

//     if (slideIndex === -1) {
//       console.error('Слайд не найден');
//       return presentation;
//     }

//     // Проверяем, есть ли элементы для перемещения
//     const elementsToMove = currentSlide.slideElements.filter(element =>
//       elementIds.includes(element.id)
//     );
//     if (elementsToMove.length === 0) {
//       console.error('Элементы для перемещения не найдены на слайде');
//       return presentation;
//     }

//     const updatedSlideElements = currentSlide.slideElements.map(element => {
//       if (elementIds.includes(element.id)) {
//         // Применяем смещение к позиции элемента с проверкой типа
//         if (element.type === 'text') {
//           // Для текстового элемента
//           const newX = element.x + delta.x;
//           const newY = element.y + delta.y;

//           return {
//             ...element,
//             x: newX,
//             y: newY
//           };
//         } else if (element.type === 'image') {
//           // Для изображения
//           const newX = element.x + delta.x;
//           const newY = element.y + delta.y;

//           return {
//             ...element,
//             x: newX,
//             y: newY
//           };
//         }
//       }
//       return element;
//     });

//     const updatedSlide: Slide = {
//       ...currentSlide,
//       slideElements: updatedSlideElements
//     };

//     const newSlides = [...slides];
//     newSlides[slideIndex] = updatedSlide;

//     return {
//       ...presentation,
//       slideCollection: {
//         slides: newSlides
//       }
//     };

//   } catch (error) {
//     console.error('Ошибка перемещения элементов:', error);
//     return presentation;
//   }
// };

// export const changeElementSize = (presentation: Presentation, elementId: string, newSize: Size): Presentation => {
//   if (!presentation.state.currentSlide) {
//     console.error('Не выбран текущий слайд');
//     return presentation;
//   }

//   const currentSlideId = presentation.state.currentSlide;

//   try {
//     const currentSlide = getSlideById(presentation, currentSlideId);
//     const slides = presentation.slideCollection.slides;
//     const slideIndex = getSlideIndexById(presentation, currentSlideId);

//     if (slideIndex === -1) {
//       console.error('Слайд не найден');
//       return presentation;
//     }

//     const elementIndex = currentSlide.slideElements.findIndex(element => element.id === elementId);
//     if (elementIndex === -1) {
//       console.error('Элемент не найден на слайде');
//       return presentation;
//     }

//     const updatedSlideElements = currentSlide.slideElements.map(element => {
//       if (element.id === elementId) {
//         if (element.type === 'text') {
//           return {
//             ...element,
//             width: newSize.width,
//             height: newSize.height
//           };
//         } else if (element.type === 'image') {
//           return {
//             ...element,
//             width: newSize.width,
//             height: newSize.height
//           };
//         }
//       }
//       return element;
//     });

//     const updatedSlide: Slide = {
//       ...currentSlide,
//       slideElements: updatedSlideElements
//     };

//     const newSlides = [...slides];
//     newSlides[slideIndex] = updatedSlide;

//     return {
//       ...presentation,
//       slideCollection: {
//         slides: newSlides
//       }
//     };

//   } catch (error) {
//     console.error('Ошибка изменения размера элемента:', error);
//     return presentation;
//   }
// };

// export const changeElementText = (presentation: Presentation, elementId: string, newText: string): Presentation => {
//   if (!presentation.state.currentSlide) {
//     console.error('Не выбран текущий слайд');
//     return presentation;
//   }

//   const currentSlideId = presentation.state.currentSlide;

//   try {
//     const currentSlide = getSlideById(presentation, currentSlideId);
//     const slides = presentation.slideCollection.slides;
//     const slideIndex = getSlideIndexById(presentation, currentSlideId);

//     if (slideIndex === -1) {
//       console.error('Слайд не найден');
//       return presentation;
//     }

//     const elementIndex = currentSlide.slideElements.findIndex(element => element.id === elementId);
//     if (elementIndex === -1) {
//       console.error('Элемент не найден на слайде');
//       return presentation;
//     }

//     const element = currentSlide.slideElements[elementIndex];

//     if (element.type !== 'text') {
//       console.error('Элемент не является текстовым');
//       return presentation;
//     }

//     const updatedSlideElements = currentSlide.slideElements.map(element => {
//       if (element.id === elementId && element.type === 'text') {
//         return {
//           ...element,
//           value: newText
//         };
//       }
//       return element;
//     });

//     const updatedSlide: Slide = {
//       ...currentSlide,
//       slideElements: updatedSlideElements
//     };

//     const newSlides = [...slides];
//     newSlides[slideIndex] = updatedSlide;

//     return {
//       ...presentation,
//       slideCollection: {
//         slides: newSlides
//       }
//     };

//   } catch (error) {
//     console.error('Ошибка изменения текста элемента:', error);
//     return presentation;
//   }
// };

// export const changeFontSize = (presentation: Presentation, elementId: string, newFontSize: string): Presentation => {
//   if (!presentation.state.currentSlide) {
//     console.error('Не выбран текущий слайд');
//     return presentation;
//   }

//   const currentSlideId = presentation.state.currentSlide;

//   try {
//     const currentSlide = getSlideById(presentation, currentSlideId);
//     const slides = presentation.slideCollection.slides;
//     const slideIndex = getSlideIndexById(presentation, currentSlideId);

//     if (slideIndex === -1) {
//       console.error('Слайд не найден');
//       return presentation;
//     }

//     const elementIndex = currentSlide.slideElements.findIndex(element => element.id === elementId);
//     if (elementIndex === -1) {
//       console.error('Элемент не найден на слайде');
//       return presentation;
//     }

//     const element = currentSlide.slideElements[elementIndex];

//     if (element.type !== 'text') {
//       console.error('Элемент не является текстовым');
//       return presentation;
//     }

//     const updatedSlideElements = currentSlide.slideElements.map(element => {
//       if (element.id === elementId && element.type === 'text') {
//         return {
//           ...element,
//           fontSize: newFontSize
//         };
//       }
//       return element;
//     });

//     const updatedSlide: Slide = {
//       ...currentSlide,
//       slideElements: updatedSlideElements
//     };

//     const newSlides = [...slides];
//     newSlides[slideIndex] = updatedSlide;

//     return {
//       ...presentation,
//       slideCollection: {
//         slides: newSlides
//       }
//     };

//   } catch (error) {
//     console.error('Ошибка изменения размера шрифта:', error);
//     return presentation;
//   }
// };

// export const changeFontFamily = (presentation: Presentation, elementId: string, newFontFamily: string): Presentation => {
//   if (!presentation.state.currentSlide) {
//     console.error('Не выбран текущий слайд');
//     return presentation;
//   }

//   const currentSlideId = presentation.state.currentSlide;

//   try {
//     const currentSlide = getSlideById(presentation, currentSlideId);
//     const slides = presentation.slideCollection.slides;
//     const slideIndex = getSlideIndexById(presentation, currentSlideId);

//     if (slideIndex === -1) {
//       console.error('Слайд не найден');
//       return presentation;
//     }

//     const elementIndex = currentSlide.slideElements.findIndex(element => element.id === elementId);
//     if (elementIndex === -1) {
//       console.error('Элемент не найден на слайде');
//       return presentation;
//     }

//     const element = currentSlide.slideElements[elementIndex];

//     if (element.type !== 'text') {
//       console.error('Элемент не является текстовым');
//       return presentation;
//     }

//     const updatedSlideElements = currentSlide.slideElements.map(element => {
//       if (element.id === elementId && element.type === 'text') {
//         return {
//           ...element,
//           fontFamily: newFontFamily
//         };
//       }
//       return element;
//     });

//     const updatedSlide: Slide = {
//       ...currentSlide,
//       slideElements: updatedSlideElements
//     };

//     const newSlides = [...slides];
//     newSlides[slideIndex] = updatedSlide;

//     return {
//       ...presentation,
//       slideCollection: {
//         slides: newSlides
//       }
//     };

//   } catch (error) {
//     console.error('Ошибка изменения семейства шрифтов:', error);
//     return presentation;
//   }
// };

// export const changeSlideBackground = (presentation: Presentation, newBackground: SlideBackground): Presentation => {
//   if (!presentation.state.currentSlide) {
//     console.error('Не выбран текущий слайд');
//     return presentation;
//   }

//   const currentSlideId = presentation.state.currentSlide;

//   try {

//     const currentSlide = getSlideById(presentation, currentSlideId);
//     const slides = presentation.slideCollection.slides;
//     const slideIndex = getSlideIndexById(presentation, currentSlideId);

//     if (slideIndex === -1) {
//       console.error('Слайд не найден');
//       return presentation;
//     }

//     const updateSlide: Slide = {
//       ...currentSlide,
//       background: newBackground,
//     };

//     const newSlides = [...slides];
//     newSlides[slideIndex] = updateSlide;

//     return {
//       ...presentation,
//       slideCollection: {
//         slides: newSlides
//       }
//     };

//   } catch (error) {
//     console.error('Ошибка изменения фона слайда:', error);
//     return presentation;
//   }
// };

// const getSlideById = (presentation: Presentation, id: string): Slide => {
//   const slide = presentation.slideCollection.slides.find(slide => slide.id === id);

//   if (!slide) {
//     throw new Error(`Slide with id ${id} not found`);
//   }

//   return { ...slide };
// };

// export const getSlideIndexById = (presentation: Presentation, id: string): number => {
//   return presentation.slideCollection.slides.findIndex(slide => slide.id === id);
// };

// const getSlideIdByIndex = (presentation: Presentation, slideIndex: number): string | null => {
//   if (slideIndex < 0 || slideIndex >= presentation.slideCollection.slides.length) {
//     return null;
//   }

//   return presentation.slideCollection.slides[slideIndex].id;
// };

// const getElementIndexById = (slide: Slide, elementId: string): number => {
//   return slide.slideElements.findIndex(element => element.id === elementId);
// };

// const createImageBackground = (src: string): BackgroundImage => {
//   return {
//     type: 'image',
//     src: src
//   };
// };

// const createColorBackground = (color: string): BackgroundColor => {
//   return {
//     type: 'color',
//     color: color
//   };
// };

import {
  Presentation,
  Slide,
  SlideElement,
  TextObject,
  ImageObject,
  Background,
  SolidBackground,
  ImageBackground,
  Position,
  Size
} from '../types/presentationTypes';

// Вспомогательные утилиты
const getSlideIndexById = (slides: Slide[], id: string): number =>
  slides.findIndex(slide => slide.id === id);

const clone = typeof structuredClone === 'function'
  ? structuredClone
  : (obj: any) => JSON.parse(JSON.stringify(obj));

// ------------------ Presentation-level functions ------------------

export const changePresentationTitle = (presentation: Presentation, newTitle: string): Presentation => ({
  ...presentation,
  title: newTitle
});

// ------------------ Slide-level functions ------------------

export const addSlide = (presentation: Presentation, newSlide: Slide): Presentation => ({
  ...presentation,
  slides: [...presentation.slides, newSlide]
});

export const deleteSlide = (presentation: Presentation, delSlideId: string): Presentation => ({
  ...presentation,
  slides: presentation.slides.filter(slide => slide.id !== delSlideId)
});

export const swapSlides = (presentation: Presentation, slide1Id: string, slide2Id: string): Presentation => {
  const slides = clone(presentation.slides);
  const i1 = getSlideIndexById(slides, slide1Id);
  const i2 = getSlideIndexById(slides, slide2Id);
  if (i1 === -1 || i2 === -1) return presentation;
  [slides[i1], slides[i2]] = [slides[i2], slides[i1]];
  return { ...presentation, slides };
};

// ------------------ Object-level functions ------------------

export const addSlideObject = (
  presentation: Presentation,
  newElement: SlideElement,
  currentSlideId: string
): Presentation => ({
  ...presentation,
  slides: presentation.slides.map(slide =>
    slide.id === currentSlideId
      ? { ...slide, objects: [...slide.objects, newElement] }
      : slide
  )
});

export const removeSlideObject = (presentation: Presentation, objectId: string): Presentation => ({
  ...presentation,
  slides: presentation.slides.map(slide => ({
    ...slide,
    objects: slide.objects.filter(obj => obj.id !== objectId)
  }))
});

// Управление z-порядком
export const incSlideObjectLayer = (
  presentation: Presentation,
  objectId: string,
  currentSlideId: string
): Presentation => {
  const slides = clone(presentation.slides);
  const idx = getSlideIndexById(slides, currentSlideId);
  if (idx === -1) return presentation;

  const slide = slides[idx];
  const objIdx = slide.objects.findIndex(obj => obj.id === objectId);
  if (objIdx === -1 || objIdx >= slide.objects.length - 1) return presentation;

  [slide.objects[objIdx], slide.objects[objIdx + 1]] = [slide.objects[objIdx + 1], slide.objects[objIdx]];
  return { ...presentation, slides };
};

export const decSlideObjectLayer = (
  presentation: Presentation,
  objectId: string,
  currentSlideId: string
): Presentation => {
  const slides = clone(presentation.slides);
  const idx = getSlideIndexById(slides, currentSlideId);
  if (idx === -1) return presentation;

  const slide = slides[idx];
  const objIdx = slide.objects.findIndex(obj => obj.id === objectId);
  if (objIdx <= 0) return presentation;

  [slide.objects[objIdx - 1], slide.objects[objIdx]] = [slide.objects[objIdx], slide.objects[objIdx - 1]];
  return { ...presentation, slides };
};

// Изменение позиции (включая угол)
export const changeSlideObjectPosition = (
  presentation: Presentation,
  newPosX: number,
  newPosY: number,
  newAngle: number,
  objectId: string,
  currentSlideId: string
): Presentation => ({
  ...presentation,
  slides: presentation.slides.map(slide =>
    slide.id !== currentSlideId
      ? slide
      : {
          ...slide,
          objects: slide.objects.map(obj =>
            obj.id !== objectId
              ? obj
              : { ...obj, position: { x: newPosX, y: newPosY, angle: newAngle } }
          )
        }
  )
});

// Изменение размера
export const changeSlideObjectSize = (
  presentation: Presentation,
  newWidth: number,
  newHeight: number,
  objectId: string,
  currentSlideId: string
): Presentation => ({
  ...presentation,
  slides: presentation.slides.map(slide =>
    slide.id !== currentSlideId
      ? slide
      : {
          ...slide,
          objects: slide.objects.map(obj =>
            obj.id !== objectId ? obj : { ...obj, size: { width: newWidth, height: newHeight } }
          )
        }
  )
});

// ------------------ Text-specific ------------------

export const changeSlideObjectTextValue = (
  presentation: Presentation,
  newValue: string,
  objectId: string,
  currentSlideId: string
): Presentation => ({
  ...presentation,
  slides: presentation.slides.map(slide =>
    slide.id !== currentSlideId
      ? slide
      : {
          ...slide,
          objects: slide.objects.map(obj =>
            obj.id !== objectId || obj.type !== 'text'
              ? obj
              : { ...obj, value: newValue }
          )
        }
  )
});

export const changeSlideObjectFontSize = (
  presentation: Presentation,
  newFontSize: number,
  objectId: string,
  currentSlideId: string
): Presentation => ({
  ...presentation,
  slides: presentation.slides.map(slide =>
    slide.id !== currentSlideId
      ? slide
      : {
          ...slide,
          objects: slide.objects.map(obj =>
            obj.id !== objectId || obj.type !== 'text'
              ? obj
              : { ...obj, fontSize: newFontSize }
          )
        }
  )
});

export const changeSlideObjectFontFamily = (
  presentation: Presentation,
  newFontFamily: string,
  objectId: string,
  currentSlideId: string
): Presentation => ({
  ...presentation,
  slides: presentation.slides.map(slide =>
    slide.id !== currentSlideId
      ? slide
      : {
          ...slide,
          objects: slide.objects.map(obj =>
            obj.id !== objectId || obj.type !== 'text'
              ? obj
              : { ...obj, fontFamily: newFontFamily }
          )
        }
  )
});

export const changeSlideObjectFontWeight = (
  presentation: Presentation,
  newFontWeight: number,
  objectId: string,
  currentSlideId: string
): Presentation => ({
  ...presentation,
  slides: presentation.slides.map(slide =>
    slide.id !== currentSlideId
      ? slide
      : {
          ...slide,
          objects: slide.objects.map(obj =>
            obj.id !== objectId || obj.type !== 'text'
              ? obj
              : { ...obj, fontWeight: newFontWeight }
          )
        }
  )
});

export const changeSlideObjectFontColor = (
  presentation: Presentation,
  newFontColor: string,
  objectId: string,
  currentSlideId: string
): Presentation => ({
  ...presentation,
  slides: presentation.slides.map(slide =>
    slide.id !== currentSlideId
      ? slide
      : {
          ...slide,
          objects: slide.objects.map(obj =>
            obj.id !== objectId || obj.type !== 'text'
              ? obj
              : { ...obj, fontColor: newFontColor }
          )
        }
  )
});

// ------------------ Image-specific ------------------

export const changeSlideObjectImageSrc = (
  presentation: Presentation,
  newSrc: string,
  objectId: string,
  currentSlideId: string
): Presentation => ({
  ...presentation,
  slides: presentation.slides.map(slide =>
    slide.id !== currentSlideId
      ? slide
      : {
          ...slide,
          objects: slide.objects.map(obj =>
            obj.id !== objectId || obj.type !== 'image'
              ? obj
              : { ...obj, src: newSrc }
          )
        }
  )
});

// ------------------ Background ------------------

export const setSlideBackgroundType = (
  presentation: Presentation,
  backgroundType: 'solid' | 'image',
  currentSlideId: string,
  isForAll = false
): Presentation => {
  const setBackground = (): Background =>
    backgroundType === 'solid'
      ? { type: 'solid', color: '#ffffff' }
      : { type: 'image', src: 'path/to/default/image' };

  return {
    ...presentation,
    slides: presentation.slides.map(slide =>
      !isForAll && slide.id !== currentSlideId
        ? slide
        : { ...slide, background: setBackground() }
    )
  };
};

export const setSlideBackgroundColor = (
  presentation: Presentation,
  backgroundColor: string,
  currentSlideId: string,
  isForAll = false
): Presentation => ({
  ...presentation,
  slides: presentation.slides.map(slide =>
    !isForAll && slide.id !== currentSlideId
      ? slide
      : { ...slide, background: { type: 'solid', color: backgroundColor } }
  )
});

export const setSlideBackgroundImage = (
  presentation: Presentation,
  imageSrc: string,
  currentSlideId: string,
  isForAll = false
): Presentation => ({
  ...presentation,
  slides: presentation.slides.map(slide =>
    !isForAll && slide.id !== currentSlideId
      ? slide
      : { ...slide, background: { type: 'image', src: imageSrc } }
  )
});

// ------------------ Default elements ------------------

export const defaultImageElement: ImageObject = {
  type: "image",
  src: "",
  id: "",
  position: {
    x: 0,
    y: 0,
  },
  size: {
    width: 0,
    height: 0
  }
};

export const defaultTextElement: TextObject = {
    type: "text",
    value: "New text",
    fontFamily: "Montserrat",
    fontSize: 30,
    fontWeight: 400,
    fontColor: "#000000",
    id: "",
    position: {
        x: 0,
        y: 0
    },
    size: {
        width: 140,
        height: 50
    }
}