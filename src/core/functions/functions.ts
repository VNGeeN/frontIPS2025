import {
  Presentation,
  SlideCollection,
  Slide,
  SlideElement,
  TextType,
  ImageType,
  Size,
  Position,
  SelectionState,
  SlideBackground,
  BackgroundImage,
  BackgroundColor
} from '../types/type';

export const changePresentationTitle = (presentation: Presentation, title: string): Presentation => {
  return {
    ...presentation,
    title,
  };
};

export const setCurrentSlide = (presentation: Presentation, slideId: string): Presentation => {
  return {
    ...presentation,
    state: {
      ...presentation.state,
      currentSlide: slideId,
      activeElements: []
    }
  };
};

export const addNewSlide = (presentation: Presentation, slide: Slide): Presentation => {
  const slides = presentation.slideCollection.slides;

  let insertIndex = slides.length;
  if (presentation.state.currentSlide) {
    const currentSlideIndex = getSlideIndexById(presentation, presentation.state.currentSlide);
    if (currentSlideIndex !== -1) {
      insertIndex = currentSlideIndex + 1;
    }
  }
  let newSlides: Slide[] = [];

  newSlides = [
    ...slides.slice(0, insertIndex),
    slide,
    ...slides.slice(insertIndex)
  ];

  const newSlideCollection: SlideCollection = {
    slides: newSlides,
  };

  return {
    ...presentation,
    slideCollection: newSlideCollection,
    state: {
      ...presentation.state,
      currentSlide: slide.id,
      selectedSlides: [slide.id],
      activeElements: []
    }
  };
};

export const deleteSlide = (presentation: Presentation): Presentation => {
  const slides = presentation.slideCollection.slides;

  if (slides.length === 0 || !presentation.state.currentSlide) {
    return presentation;
  }

  const currentSlideIndex = getSlideIndexById(presentation, presentation.state.currentSlide);
  if (currentSlideIndex === -1) {
    return presentation;
  }

  let newSlides: Slide[] = [];

  newSlides = [
    ...slides.slice(0, currentSlideIndex),
    ...slides.slice(currentSlideIndex + 1)
  ];

  if (newSlides.length === 0) {
    console.warn('Последний слайд был удален');
  }

  const newSlideCollection: SlideCollection = {
    slides: newSlides,
  };

  let newCurrentSlideId: string | null = null;

  if (newSlides.length > 0) {
    // Если удалили не последний слайд, берем следующий
    if (currentSlideIndex < newSlides.length) {
      newCurrentSlideId = newSlides[currentSlideIndex].id;
    }
    // Если удалили последний слайд, берем предыдущий
    else if (currentSlideIndex > 0) {
      newCurrentSlideId = newSlides[currentSlideIndex - 1].id;
    }
    // Если остался только один слайд
    else {
      newCurrentSlideId = newSlides[0].id;
    }
  }

  return {
    ...presentation,
    slideCollection: newSlideCollection,
    state: {
      ...presentation.state,
      currentSlide: newCurrentSlideId,
      selectedSlides: newCurrentSlideId ? [newCurrentSlideId] : [],
      activeElements: []
    }
  };
};

export const moveSlide = (presentation: Presentation, toIndex: number): Presentation => {
  const slides = presentation.slideCollection.slides;
  const selectedSlides = presentation.state.selectedSlides;

  if (selectedSlides.length === 0) {
    return presentation;
  }

  const selectedIndices = selectedSlides
    .map(id => slides.findIndex(slide => slide.id === id))
    .filter(index => index !== -1)
    .sort((a, b) => a - b);

  if (selectedIndices.length === 0) {
    return presentation;
  }

  const newSlides = [...slides];

  const movedSlides = [];
  for (let i = selectedIndices.length - 1; i >= 0; i--) {
    const index = selectedIndices[i];
    movedSlides.unshift(newSlides.splice(index, 1)[0]);
  }

  newSlides.splice(toIndex, 0, ...movedSlides);

  return {
    ...presentation,
    slideCollection: {
      slides: newSlides
    }
  };
};

export const addTextElement = (presentation: Presentation, textElement: Omit<TextType, 'id'>): Presentation => {
  if (!presentation.state.currentSlide) {
    console.error("Не выбран текущий слайд");
    return presentation;
  }

  const currentSlideId = presentation.state.currentSlide;

  try {
    const currentSlide = getSlideById(presentation, currentSlideId);
    const slides = presentation.slideCollection.slides;
    const slideIndex = getSlideIndexById(presentation, currentSlideId);

    if (slideIndex === -1) {
      console.error("Слайд не найден");
      return presentation;
    }

    // Генерация ID с fallback для сред без crypto
    let newId: string;
    try {
      newId = crypto.randomUUID();
    } catch (e) {
      newId = `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    const newTextElement: TextType = {
      ...textElement,
      id: newId,
    };

    const updatedSlide: Slide = {
      ...currentSlide,
      slideElements: [...currentSlide.slideElements, newTextElement]
    };

    const newSlides = [...slides];
    newSlides[slideIndex] = updatedSlide;

    return {
      ...presentation,
      slideCollection: {
        slides: newSlides
      },
      state: {
        ...presentation.state,
        activeElements: [newTextElement.id]
      }
    };
  } catch (error) {
    console.error("Ошибка добавления текстового элемента:", error);
    return presentation;
  }
};


export const addImageElement = (presentation: Presentation, imageElement: Omit<ImageType, 'id'>): Presentation => {
  if (!presentation.state.currentSlide) {
    console.error("Не выбран текущий слайд");
    return presentation;
  }

  const currentSlideId = presentation.state.currentSlide;

  try {
    const currentSlide = getSlideById(presentation, currentSlideId);
    const slides = presentation.slideCollection.slides;
    const slideIndex = getSlideIndexById(presentation, currentSlideId);

    if (slideIndex === -1) {
      console.error("Слайд не найден");
      return presentation;
    }

    // Генерация ID с fallback для сред без crypto
    let newId: string;
    try {
      newId = crypto.randomUUID();
    } catch (e) {
      newId = `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    const newImageElement: ImageType = {
      ...imageElement,
      id: newId,
    };

    const updatedSlide: Slide = {
      ...currentSlide,
      slideElements: [...currentSlide.slideElements, newImageElement]
    };

    const newSlides = [...slides];
    newSlides[slideIndex] = updatedSlide;

    return {
      ...presentation,
      slideCollection: {
        slides: newSlides
      },
      state: {
        ...presentation.state,
        activeElements: [newImageElement.id]
      }
    };
  } catch (error) {
    console.error("Ошибка добавления изображения:", error);
    return presentation;
  }
};

export const deleteSlideElements = (presentation: Presentation, elementIds: string[]): Presentation => {
  if (!presentation.state.currentSlide) {
    console.error('Не выбран текущий слайд');
    return presentation;
  }

  if (elementIds.length === 0) {
    console.error('Не указаны элементы для удаления');
    return presentation;
  }

  const currentSlideId = presentation.state.currentSlide;

  try {
    const currentSlide = getSlideById(presentation, currentSlideId);
    const slides = presentation.slideCollection.slides;
    const slideIndex = getSlideIndexById(presentation, currentSlideId);

    if (slideIndex === -1) {
      console.error('Слайд не найден');
      return presentation;
    }

    const newSlideElements = currentSlide.slideElements.filter(
      element => !elementIds.includes(element.id)
    );

    if (newSlideElements.length === currentSlide.slideElements.length) {
      console.error('Элементы для удаления не найдены на слайде');
      return presentation;
    }

    const updateSlide: Slide = {
      ...currentSlide,
      slideElements: newSlideElements,
    };
    const newSlides = [...slides];
    newSlides[slideIndex] = updateSlide;

    const newActiveElements = presentation.state.activeElements.filter(
      id => !elementIds.includes(id)
    );

    return {
      ...presentation,
      slideCollection: {
        slides: newSlides
      },
      state: {
        ...presentation.state,
        activeElements: newActiveElements
      }
    };
  }
  catch (error) {
    console.error('Ошибка удаления элемента');
    return presentation;
  }
};

export const moveElements = (presentation: Presentation, elementIds: string[], delta: Position): Presentation => {
  if (!presentation.state.currentSlide) {
    console.error('Не выбран текущий слайд');
    return presentation;
  }

  const currentSlideId = presentation.state.currentSlide;

  try {
    const currentSlide = getSlideById(presentation, currentSlideId);
    const slides = presentation.slideCollection.slides;
    const slideIndex = getSlideIndexById(presentation, currentSlideId);

    if (slideIndex === -1) {
      console.error('Слайд не найден');
      return presentation;
    }

    // Проверяем, есть ли элементы для перемещения
    const elementsToMove = currentSlide.slideElements.filter(element =>
      elementIds.includes(element.id)
    );
    if (elementsToMove.length === 0) {
      console.error('Элементы для перемещения не найдены на слайде');
      return presentation;
    }

    const updatedSlideElements = currentSlide.slideElements.map(element => {
      if (elementIds.includes(element.id)) {
        // Применяем смещение к позиции элемента с проверкой типа
        if (element.type === 'text') {
          // Для текстового элемента
          const newX = element.x + delta.x;
          const newY = element.y + delta.y;

          return {
            ...element,
            x: newX,
            y: newY
          };
        } else if (element.type === 'image') {
          // Для изображения
          const newX = element.x + delta.x;
          const newY = element.y + delta.y;

          return {
            ...element,
            x: newX,
            y: newY
          };
        }
      }
      return element;
    });

    const updatedSlide: Slide = {
      ...currentSlide,
      slideElements: updatedSlideElements
    };

    const newSlides = [...slides];
    newSlides[slideIndex] = updatedSlide;

    return {
      ...presentation,
      slideCollection: {
        slides: newSlides
      }
    };

  } catch (error) {
    console.error('Ошибка перемещения элементов:', error);
    return presentation;
  }
};

export const changeElementSize = (presentation: Presentation, elementId: string, newSize: Size): Presentation => {
  if (!presentation.state.currentSlide) {
    console.error('Не выбран текущий слайд');
    return presentation;
  }

  const currentSlideId = presentation.state.currentSlide;

  try {
    const currentSlide = getSlideById(presentation, currentSlideId);
    const slides = presentation.slideCollection.slides;
    const slideIndex = getSlideIndexById(presentation, currentSlideId);

    if (slideIndex === -1) {
      console.error('Слайд не найден');
      return presentation;
    }

    const elementIndex = currentSlide.slideElements.findIndex(element => element.id === elementId);
    if (elementIndex === -1) {
      console.error('Элемент не найден на слайде');
      return presentation;
    }

    const updatedSlideElements = currentSlide.slideElements.map(element => {
      if (element.id === elementId) {
        if (element.type === 'text') {
          return {
            ...element,
            width: newSize.width,
            height: newSize.height
          };
        } else if (element.type === 'image') {
          return {
            ...element,
            width: newSize.width,
            height: newSize.height
          };
        }
      }
      return element;
    });

    const updatedSlide: Slide = {
      ...currentSlide,
      slideElements: updatedSlideElements
    };

    const newSlides = [...slides];
    newSlides[slideIndex] = updatedSlide;

    return {
      ...presentation,
      slideCollection: {
        slides: newSlides
      }
    };

  } catch (error) {
    console.error('Ошибка изменения размера элемента:', error);
    return presentation;
  }
};

export const changeElementText = (presentation: Presentation, elementId: string, newText: string): Presentation => {
  if (!presentation.state.currentSlide) {
    console.error('Не выбран текущий слайд');
    return presentation;
  }

  const currentSlideId = presentation.state.currentSlide;

  try {
    const currentSlide = getSlideById(presentation, currentSlideId);
    const slides = presentation.slideCollection.slides;
    const slideIndex = getSlideIndexById(presentation, currentSlideId);

    if (slideIndex === -1) {
      console.error('Слайд не найден');
      return presentation;
    }

    const elementIndex = currentSlide.slideElements.findIndex(element => element.id === elementId);
    if (elementIndex === -1) {
      console.error('Элемент не найден на слайде');
      return presentation;
    }

    const element = currentSlide.slideElements[elementIndex];

    if (element.type !== 'text') {
      console.error('Элемент не является текстовым');
      return presentation;
    }

    const updatedSlideElements = currentSlide.slideElements.map(element => {
      if (element.id === elementId && element.type === 'text') {
        return {
          ...element,
          value: newText
        };
      }
      return element;
    });

    const updatedSlide: Slide = {
      ...currentSlide,
      slideElements: updatedSlideElements
    };

    const newSlides = [...slides];
    newSlides[slideIndex] = updatedSlide;

    return {
      ...presentation,
      slideCollection: {
        slides: newSlides
      }
    };

  } catch (error) {
    console.error('Ошибка изменения текста элемента:', error);
    return presentation;
  }
};

export const changeFontSize = (presentation: Presentation, elementId: string, newFontSize: string): Presentation => {
  if (!presentation.state.currentSlide) {
    console.error('Не выбран текущий слайд');
    return presentation;
  }

  const currentSlideId = presentation.state.currentSlide;

  try {
    const currentSlide = getSlideById(presentation, currentSlideId);
    const slides = presentation.slideCollection.slides;
    const slideIndex = getSlideIndexById(presentation, currentSlideId);

    if (slideIndex === -1) {
      console.error('Слайд не найден');
      return presentation;
    }

    const elementIndex = currentSlide.slideElements.findIndex(element => element.id === elementId);
    if (elementIndex === -1) {
      console.error('Элемент не найден на слайде');
      return presentation;
    }

    const element = currentSlide.slideElements[elementIndex];

    if (element.type !== 'text') {
      console.error('Элемент не является текстовым');
      return presentation;
    }

    const updatedSlideElements = currentSlide.slideElements.map(element => {
      if (element.id === elementId && element.type === 'text') {
        return {
          ...element,
          fontSize: newFontSize
        };
      }
      return element;
    });

    const updatedSlide: Slide = {
      ...currentSlide,
      slideElements: updatedSlideElements
    };

    const newSlides = [...slides];
    newSlides[slideIndex] = updatedSlide;

    return {
      ...presentation,
      slideCollection: {
        slides: newSlides
      }
    };

  } catch (error) {
    console.error('Ошибка изменения размера шрифта:', error);
    return presentation;
  }
};

export const changeFontFamily = (presentation: Presentation, elementId: string, newFontFamily: string): Presentation => {
  if (!presentation.state.currentSlide) {
    console.error('Не выбран текущий слайд');
    return presentation;
  }

  const currentSlideId = presentation.state.currentSlide;

  try {
    const currentSlide = getSlideById(presentation, currentSlideId);
    const slides = presentation.slideCollection.slides;
    const slideIndex = getSlideIndexById(presentation, currentSlideId);

    if (slideIndex === -1) {
      console.error('Слайд не найден');
      return presentation;
    }

    const elementIndex = currentSlide.slideElements.findIndex(element => element.id === elementId);
    if (elementIndex === -1) {
      console.error('Элемент не найден на слайде');
      return presentation;
    }

    const element = currentSlide.slideElements[elementIndex];

    if (element.type !== 'text') {
      console.error('Элемент не является текстовым');
      return presentation;
    }

    const updatedSlideElements = currentSlide.slideElements.map(element => {
      if (element.id === elementId && element.type === 'text') {
        return {
          ...element,
          fontFamily: newFontFamily
        };
      }
      return element;
    });

    const updatedSlide: Slide = {
      ...currentSlide,
      slideElements: updatedSlideElements
    };

    const newSlides = [...slides];
    newSlides[slideIndex] = updatedSlide;

    return {
      ...presentation,
      slideCollection: {
        slides: newSlides
      }
    };

  } catch (error) {
    console.error('Ошибка изменения семейства шрифтов:', error);
    return presentation;
  }
};

export const changeSlideBackground = (presentation: Presentation, newBackground: SlideBackground): Presentation => {
  if (!presentation.state.currentSlide) {
    console.error('Не выбран текущий слайд');
    return presentation;
  }

  const currentSlideId = presentation.state.currentSlide;

  try {

    const currentSlide = getSlideById(presentation, currentSlideId);
    const slides = presentation.slideCollection.slides;
    const slideIndex = getSlideIndexById(presentation, currentSlideId);

    if (slideIndex === -1) {
      console.error('Слайд не найден');
      return presentation;
    }

    const updateSlide: Slide = {
      ...currentSlide,
      background: newBackground,
    };

    const newSlides = [...slides];
    newSlides[slideIndex] = updateSlide;

    return {
      ...presentation,
      slideCollection: {
        slides: newSlides
      }
    };

  } catch (error) {
    console.error('Ошибка изменения фона слайда:', error);
    return presentation;
  }
};

const getSlideById = (presentation: Presentation, id: string): Slide => {
  const slide = presentation.slideCollection.slides.find(slide => slide.id === id);

  if (!slide) {
    throw new Error(`Slide with id ${id} not found`);
  }

  return { ...slide };
};

export const getSlideIndexById = (presentation: Presentation, id: string): number => {
  return presentation.slideCollection.slides.findIndex(slide => slide.id === id);
};

const getSlideIdByIndex = (presentation: Presentation, slideIndex: number): string | null => {
  if (slideIndex < 0 || slideIndex >= presentation.slideCollection.slides.length) {
    return null;
  }

  return presentation.slideCollection.slides[slideIndex].id;
};

const getElementIndexById = (slide: Slide, elementId: string): number => {
  return slide.slideElements.findIndex(element => element.id === elementId);
};

const createImageBackground = (src: string): BackgroundImage => {
  return {
    type: 'image',
    src: src
  };
};

const createColorBackground = (color: string): BackgroundColor => {
  return {
    type: 'color',
    color: color
  };
};
