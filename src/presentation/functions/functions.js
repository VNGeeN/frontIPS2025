"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeSlideBackground = exports.changeFontFamily = exports.changeFontSize = exports.changeElementText = exports.changeElementSize = exports.moveElements = exports.deleteSlideElements = exports.addImageElement = exports.addTextElement = exports.moveSlide = exports.deleteSlide = exports.addNewSlide = exports.setCurrentSlide = exports.changePresentationTitle = void 0;
var changePresentationTitle = function (presentation, title) {
    return __assign(__assign({}, presentation), { title: title });
};
exports.changePresentationTitle = changePresentationTitle;
var setCurrentSlide = function (presentation, slideId) {
    return __assign(__assign({}, presentation), { state: __assign(__assign({}, presentation.state), { currentSlide: slideId, activeElements: [] }) });
};
exports.setCurrentSlide = setCurrentSlide;
var addNewSlide = function (presentation, slide) {
    var slides = presentation.slideCollection.slides;
    var insertIndex = slides.length;
    if (presentation.state.currentSlide) {
        var currentSlideIndex = getSlideIndexById(presentation, presentation.state.currentSlide);
        if (currentSlideIndex !== -1) {
            insertIndex = currentSlideIndex + 1;
        }
    }
    var newSlides = [];
    newSlides = __spreadArray(__spreadArray(__spreadArray([], slides.slice(0, insertIndex), true), [
        slide
    ], false), slides.slice(insertIndex), true);
    var newSlideCollection = {
        slides: newSlides,
    };
    return __assign(__assign({}, presentation), { slideCollection: newSlideCollection, state: __assign(__assign({}, presentation.state), { currentSlide: slide.id, selectedSlides: [slide.id], activeElements: [] }) });
};
exports.addNewSlide = addNewSlide;
var deleteSlide = function (presentation) {
    var slides = presentation.slideCollection.slides;
    if (slides.length === 0 || !presentation.state.currentSlide) {
        return presentation;
    }
    var currentSlideIndex = getSlideIndexById(presentation, presentation.state.currentSlide);
    if (currentSlideIndex === -1) {
        return presentation;
    }
    var newSlides = [];
    newSlides = __spreadArray(__spreadArray([], slides.slice(0, currentSlideIndex), true), slides.slice(currentSlideIndex + 1), true);
    if (newSlides.length === 0) {
        console.warn('Последний слайд был удален');
    }
    var newSlideCollection = {
        slides: newSlides,
    };
    var newCurrentSlideId = null;
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
    return __assign(__assign({}, presentation), { slideCollection: newSlideCollection, state: __assign(__assign({}, presentation.state), { currentSlide: newCurrentSlideId, selectedSlides: newCurrentSlideId ? [newCurrentSlideId] : [], activeElements: [] }) });
};
exports.deleteSlide = deleteSlide;
var moveSlide = function (presentation, toIndex) {
    var slides = presentation.slideCollection.slides;
    var selectedSlides = presentation.state.selectedSlides;
    if (selectedSlides.length === 0) {
        return presentation;
    }
    var selectedIndices = selectedSlides
        .map(function (id) { return slides.findIndex(function (slide) { return slide.id === id; }); })
        .filter(function (index) { return index !== -1; })
        .sort(function (a, b) { return a - b; });
    if (selectedIndices.length === 0) {
        return presentation;
    }
    var newSlides = __spreadArray([], slides, true);
    var movedSlides = [];
    for (var i = selectedIndices.length - 1; i >= 0; i--) {
        var index = selectedIndices[i];
        movedSlides.unshift(newSlides.splice(index, 1)[0]);
    }
    newSlides.splice.apply(newSlides, __spreadArray([toIndex, 0], movedSlides, false));
    return __assign(__assign({}, presentation), { slideCollection: {
            slides: newSlides
        } });
};
exports.moveSlide = moveSlide;
var addTextElement = function (presentation, textElement) {
    if (!presentation.state.currentSlide) {
        console.error("Не выбран текущий слайд");
        return presentation;
    }
    var currentSlideId = presentation.state.currentSlide;
    try {
        var currentSlide = getSlideById(presentation, currentSlideId);
        var slides = presentation.slideCollection.slides;
        var slideIndex = getSlideIndexById(presentation, currentSlideId);
        if (slideIndex === -1) {
            console.error("Слайд не найден");
            return presentation;
        }
        // Генерация ID с fallback для сред без crypto
        var newId = void 0;
        try {
            newId = crypto.randomUUID();
        }
        catch (e) {
            newId = "text-".concat(Date.now(), "-").concat(Math.random().toString(36).substr(2, 9));
        }
        var newTextElement = __assign(__assign({}, textElement), { id: newId });
        var updatedSlide = __assign(__assign({}, currentSlide), { slideElements: __spreadArray(__spreadArray([], currentSlide.slideElements, true), [newTextElement], false) });
        var newSlides = __spreadArray([], slides, true);
        newSlides[slideIndex] = updatedSlide;
        return __assign(__assign({}, presentation), { slideCollection: {
                slides: newSlides
            }, state: __assign(__assign({}, presentation.state), { activeElements: [newTextElement.id] }) });
    }
    catch (error) {
        console.error("Ошибка добавления текстового элемента:", error);
        return presentation;
    }
};
exports.addTextElement = addTextElement;
var addImageElement = function (presentation, imageElement) {
    if (!presentation.state.currentSlide) {
        console.error("Не выбран текущий слайд");
        return presentation;
    }
    var currentSlideId = presentation.state.currentSlide;
    try {
        var currentSlide = getSlideById(presentation, currentSlideId);
        var slides = presentation.slideCollection.slides;
        var slideIndex = getSlideIndexById(presentation, currentSlideId);
        if (slideIndex === -1) {
            console.error("Слайд не найден");
            return presentation;
        }
        // Генерация ID с fallback для сред без crypto
        var newId = void 0;
        try {
            newId = crypto.randomUUID();
        }
        catch (e) {
            newId = "image-".concat(Date.now(), "-").concat(Math.random().toString(36).substr(2, 9));
        }
        var newImageElement = __assign(__assign({}, imageElement), { id: newId });
        var updatedSlide = __assign(__assign({}, currentSlide), { slideElements: __spreadArray(__spreadArray([], currentSlide.slideElements, true), [newImageElement], false) });
        var newSlides = __spreadArray([], slides, true);
        newSlides[slideIndex] = updatedSlide;
        return __assign(__assign({}, presentation), { slideCollection: {
                slides: newSlides
            }, state: __assign(__assign({}, presentation.state), { activeElements: [newImageElement.id] }) });
    }
    catch (error) {
        console.error("Ошибка добавления изображения:", error);
        return presentation;
    }
};
exports.addImageElement = addImageElement;
var deleteSlideElements = function (presentation, elementIds) {
    if (!presentation.state.currentSlide) {
        console.error('Не выбран текущий слайд');
        return presentation;
    }
    if (elementIds.length === 0) {
        console.error('Не указаны элементы для удаления');
        return presentation;
    }
    var currentSlideId = presentation.state.currentSlide;
    try {
        var currentSlide = getSlideById(presentation, currentSlideId);
        var slides = presentation.slideCollection.slides;
        var slideIndex = getSlideIndexById(presentation, currentSlideId);
        if (slideIndex === -1) {
            console.error('Слайд не найден');
            return presentation;
        }
        var newSlideElements = currentSlide.slideElements.filter(function (element) { return !elementIds.includes(element.id); });
        if (newSlideElements.length === currentSlide.slideElements.length) {
            console.error('Элементы для удаления не найдены на слайде');
            return presentation;
        }
        var updateSlide = __assign(__assign({}, currentSlide), { slideElements: newSlideElements });
        var newSlides = __spreadArray([], slides, true);
        newSlides[slideIndex] = updateSlide;
        var newActiveElements = presentation.state.activeElements.filter(function (id) { return !elementIds.includes(id); });
        return __assign(__assign({}, presentation), { slideCollection: {
                slides: newSlides
            }, state: __assign(__assign({}, presentation.state), { activeElements: newActiveElements }) });
    }
    catch (error) {
        console.error('Ошибка удаления элемента');
        return presentation;
    }
};
exports.deleteSlideElements = deleteSlideElements;
var moveElements = function (presentation, elementIds, delta) {
    if (!presentation.state.currentSlide) {
        console.error('Не выбран текущий слайд');
        return presentation;
    }
    var currentSlideId = presentation.state.currentSlide;
    try {
        var currentSlide = getSlideById(presentation, currentSlideId);
        var slides = presentation.slideCollection.slides;
        var slideIndex = getSlideIndexById(presentation, currentSlideId);
        if (slideIndex === -1) {
            console.error('Слайд не найден');
            return presentation;
        }
        // Проверяем, есть ли элементы для перемещения
        var elementsToMove = currentSlide.slideElements.filter(function (element) {
            return elementIds.includes(element.id);
        });
        if (elementsToMove.length === 0) {
            console.error('Элементы для перемещения не найдены на слайде');
            return presentation;
        }
        var updatedSlideElements = currentSlide.slideElements.map(function (element) {
            if (elementIds.includes(element.id)) {
                // Применяем смещение к позиции элемента с проверкой типа
                if (element.type === 'text') {
                    // Для текстового элемента
                    var newX = element.x + delta.x;
                    var newY = element.y + delta.y;
                    return __assign(__assign({}, element), { x: newX, y: newY });
                }
                else if (element.type === 'image') {
                    // Для изображения
                    var newX = element.x + delta.x;
                    var newY = element.y + delta.y;
                    return __assign(__assign({}, element), { x: newX, y: newY });
                }
            }
            return element;
        });
        var updatedSlide = __assign(__assign({}, currentSlide), { slideElements: updatedSlideElements });
        var newSlides = __spreadArray([], slides, true);
        newSlides[slideIndex] = updatedSlide;
        return __assign(__assign({}, presentation), { slideCollection: {
                slides: newSlides
            } });
    }
    catch (error) {
        console.error('Ошибка перемещения элементов:', error);
        return presentation;
    }
};
exports.moveElements = moveElements;
var changeElementSize = function (presentation, elementId, newSize) {
    if (!presentation.state.currentSlide) {
        console.error('Не выбран текущий слайд');
        return presentation;
    }
    var currentSlideId = presentation.state.currentSlide;
    try {
        var currentSlide = getSlideById(presentation, currentSlideId);
        var slides = presentation.slideCollection.slides;
        var slideIndex = getSlideIndexById(presentation, currentSlideId);
        if (slideIndex === -1) {
            console.error('Слайд не найден');
            return presentation;
        }
        var elementIndex = currentSlide.slideElements.findIndex(function (element) { return element.id === elementId; });
        if (elementIndex === -1) {
            console.error('Элемент не найден на слайде');
            return presentation;
        }
        var updatedSlideElements = currentSlide.slideElements.map(function (element) {
            if (element.id === elementId) {
                if (element.type === 'text') {
                    return __assign(__assign({}, element), { width: newSize.width, height: newSize.height });
                }
                else if (element.type === 'image') {
                    return __assign(__assign({}, element), { width: newSize.width, height: newSize.height });
                }
            }
            return element;
        });
        var updatedSlide = __assign(__assign({}, currentSlide), { slideElements: updatedSlideElements });
        var newSlides = __spreadArray([], slides, true);
        newSlides[slideIndex] = updatedSlide;
        return __assign(__assign({}, presentation), { slideCollection: {
                slides: newSlides
            } });
    }
    catch (error) {
        console.error('Ошибка изменения размера элемента:', error);
        return presentation;
    }
};
exports.changeElementSize = changeElementSize;
var changeElementText = function (presentation, elementId, newText) {
    if (!presentation.state.currentSlide) {
        console.error('Не выбран текущий слайд');
        return presentation;
    }
    var currentSlideId = presentation.state.currentSlide;
    try {
        var currentSlide = getSlideById(presentation, currentSlideId);
        var slides = presentation.slideCollection.slides;
        var slideIndex = getSlideIndexById(presentation, currentSlideId);
        if (slideIndex === -1) {
            console.error('Слайд не найден');
            return presentation;
        }
        var elementIndex = currentSlide.slideElements.findIndex(function (element) { return element.id === elementId; });
        if (elementIndex === -1) {
            console.error('Элемент не найден на слайде');
            return presentation;
        }
        var element = currentSlide.slideElements[elementIndex];
        if (element.type !== 'text') {
            console.error('Элемент не является текстовым');
            return presentation;
        }
        var updatedSlideElements = currentSlide.slideElements.map(function (element) {
            if (element.id === elementId && element.type === 'text') {
                return __assign(__assign({}, element), { value: newText });
            }
            return element;
        });
        var updatedSlide = __assign(__assign({}, currentSlide), { slideElements: updatedSlideElements });
        var newSlides = __spreadArray([], slides, true);
        newSlides[slideIndex] = updatedSlide;
        return __assign(__assign({}, presentation), { slideCollection: {
                slides: newSlides
            } });
    }
    catch (error) {
        console.error('Ошибка изменения текста элемента:', error);
        return presentation;
    }
};
exports.changeElementText = changeElementText;
var changeFontSize = function (presentation, elementId, newFontSize) {
    if (!presentation.state.currentSlide) {
        console.error('Не выбран текущий слайд');
        return presentation;
    }
    var currentSlideId = presentation.state.currentSlide;
    try {
        var currentSlide = getSlideById(presentation, currentSlideId);
        var slides = presentation.slideCollection.slides;
        var slideIndex = getSlideIndexById(presentation, currentSlideId);
        if (slideIndex === -1) {
            console.error('Слайд не найден');
            return presentation;
        }
        var elementIndex = currentSlide.slideElements.findIndex(function (element) { return element.id === elementId; });
        if (elementIndex === -1) {
            console.error('Элемент не найден на слайде');
            return presentation;
        }
        var element = currentSlide.slideElements[elementIndex];
        if (element.type !== 'text') {
            console.error('Элемент не является текстовым');
            return presentation;
        }
        var updatedSlideElements = currentSlide.slideElements.map(function (element) {
            if (element.id === elementId && element.type === 'text') {
                return __assign(__assign({}, element), { fontSize: newFontSize });
            }
            return element;
        });
        var updatedSlide = __assign(__assign({}, currentSlide), { slideElements: updatedSlideElements });
        var newSlides = __spreadArray([], slides, true);
        newSlides[slideIndex] = updatedSlide;
        return __assign(__assign({}, presentation), { slideCollection: {
                slides: newSlides
            } });
    }
    catch (error) {
        console.error('Ошибка изменения размера шрифта:', error);
        return presentation;
    }
};
exports.changeFontSize = changeFontSize;
var changeFontFamily = function (presentation, elementId, newFontFamily) {
    if (!presentation.state.currentSlide) {
        console.error('Не выбран текущий слайд');
        return presentation;
    }
    var currentSlideId = presentation.state.currentSlide;
    try {
        var currentSlide = getSlideById(presentation, currentSlideId);
        var slides = presentation.slideCollection.slides;
        var slideIndex = getSlideIndexById(presentation, currentSlideId);
        if (slideIndex === -1) {
            console.error('Слайд не найден');
            return presentation;
        }
        var elementIndex = currentSlide.slideElements.findIndex(function (element) { return element.id === elementId; });
        if (elementIndex === -1) {
            console.error('Элемент не найден на слайде');
            return presentation;
        }
        var element = currentSlide.slideElements[elementIndex];
        if (element.type !== 'text') {
            console.error('Элемент не является текстовым');
            return presentation;
        }
        var updatedSlideElements = currentSlide.slideElements.map(function (element) {
            if (element.id === elementId && element.type === 'text') {
                return __assign(__assign({}, element), { fontFamily: newFontFamily });
            }
            return element;
        });
        var updatedSlide = __assign(__assign({}, currentSlide), { slideElements: updatedSlideElements });
        var newSlides = __spreadArray([], slides, true);
        newSlides[slideIndex] = updatedSlide;
        return __assign(__assign({}, presentation), { slideCollection: {
                slides: newSlides
            } });
    }
    catch (error) {
        console.error('Ошибка изменения семейства шрифтов:', error);
        return presentation;
    }
};
exports.changeFontFamily = changeFontFamily;
var changeSlideBackground = function (presentation, newBackground) {
    if (!presentation.state.currentSlide) {
        console.error('Не выбран текущий слайд');
        return presentation;
    }
    var currentSlideId = presentation.state.currentSlide;
    try {
        var currentSlide = getSlideById(presentation, currentSlideId);
        var slides = presentation.slideCollection.slides;
        var slideIndex = getSlideIndexById(presentation, currentSlideId);
        if (slideIndex === -1) {
            console.error('Слайд не найден');
            return presentation;
        }
        var updateSlide = __assign(__assign({}, currentSlide), { background: newBackground });
        var newSlides = __spreadArray([], slides, true);
        newSlides[slideIndex] = updateSlide;
        return __assign(__assign({}, presentation), { slideCollection: {
                slides: newSlides
            } });
    }
    catch (error) {
        console.error('Ошибка изменения фона слайда:', error);
        return presentation;
    }
};
exports.changeSlideBackground = changeSlideBackground;
var getSlideById = function (presentation, id) {
    var slide = presentation.slideCollection.slides.find(function (slide) { return slide.id === id; });
    if (!slide) {
        throw new Error("Slide with id ".concat(id, " not found"));
    }
    return __assign({}, slide);
};
var getSlideIndexById = function (presentation, id) {
    return presentation.slideCollection.slides.findIndex(function (slide) { return slide.id === id; });
};
var getSlideIdByIndex = function (presentation, slideIndex) {
    if (slideIndex < 0 || slideIndex >= presentation.slideCollection.slides.length) {
        return null;
    }
    return presentation.slideCollection.slides[slideIndex].id;
};
var getElementIndexById = function (slide, elementId) {
    return slide.slideElements.findIndex(function (element) { return element.id === elementId; });
};
var createImageBackground = function (src) {
    return {
        type: 'image',
        src: src
    };
};
var createColorBackground = function (color) {
    return {
        type: 'color',
        color: color
    };
};
