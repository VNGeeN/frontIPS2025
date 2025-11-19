import {
    changePresentationTitle,
    addNewSlide,
    deleteSlide,
    addTextElement,
    addImageElement,
    deleteSlideElements,
    moveElements,
    changeElementSize,
    changeElementText,
    changeFontSize,
    changeFontFamily,
    changeSlideBackground,
    moveSlide,
} from '../functions';

import { Slide, TextType, ImageType, SlideBackground, Presentation } from '../../types/type'

import { minimalPresentation, maximalPresentation } from './testData';

// Проверка изменения названия презентации
console.log("Testing changePresentationTitle");

const minChangePresTitle = changePresentationTitle(minimalPresentation, "New Title(min)");
console.log("Test with min data: ", minChangePresTitle.title === "New Title(min)" ? "PASS" : "FAIL");

const maxChangePresTitle = changePresentationTitle(maximalPresentation, "New Title(max)");
console.log("Test with max data: ", maxChangePresTitle.title === "New Title(max)" ? "PASS" : "FAIL");

// Проверка добавления слайда
console.log("Testing addNewSlide");

const newSlide: Slide = {
    id: "newSlide",
    slideElements: [],
    background: {
        type: "color",
        color: "#cccccc"
    }
};

const minAddNewSlide = addNewSlide(minimalPresentation, newSlide);
console.log("Test with min data: ", minAddNewSlide.slideCollection.slides.length === 2 ? "PASS" : "FAIL");


const maxAddNewSlide = addNewSlide(maximalPresentation, newSlide);
console.log("Test with max data: ", maxAddNewSlide.slideCollection.slides.length === 3 ? "PASS" : "FAIL");

// проверка удаление слайда
console.log("Testing deleteSlide");

const minimalCurrentSlide = {
    ...minimalPresentation,
    state: {
        ...minimalPresentation.state,
        currentSlide: "slide1",
    }
}

const minAfterDeleteSlide = deleteSlide(minimalPresentation);
console.log("Test with min data: ", minAfterDeleteSlide.slideCollection.slides.length === 0 ? "PASS" : "FAIL");

const maxAfterDeleteSlide = deleteSlide(maximalPresentation);
console.log("Test with max data: ", maxAfterDeleteSlide.slideCollection.slides.length === 1 ? "PASS" : "FAIL");

// проверка вставки текстового элемента
console.log("Testing addTextElement");

const newTextElement: TextType = {
    id: "",
    type: "text",
    value: "New Text",
    fontFamily: "Times New Roman",
    fontSize: "14px",
    fontWeight: "normal",
    color: "#0000ff",
    x: 50,
    y: 50,
    width: 100,
    height: 30
};

const minAddNewText = addTextElement(minimalPresentation, newTextElement);
console.log("Test with min data: ", minAddNewText.slideCollection.slides[0].slideElements.length === 1 ? "PASS" : "FAIL");

const maxAddNewText = addTextElement(maximalPresentation, newTextElement);
console.log("Test with max data: ", maxAddNewText.slideCollection.slides[0].slideElements.length === 3 ? "PASS" : "FAIL");

// проверка добавления новой каритнки
console.log("Testing addImageElement");

const newImageElement: ImageType = {
    id: "",
    type: "image",
    src: "image3.png",
    x: 400,
    y: 250,
    width: 200,
    height: 200,
}

const minAddNewImage = addImageElement(minimalPresentation, newImageElement);
console.log("Test with min data: ", minAddNewImage.slideCollection.slides[0].slideElements.length === 1 ? "PASS" : "FAIL");

const maxAddNewImage = addImageElement(maximalPresentation, newImageElement);
console.log("Test with max data: ", maxAddNewImage.slideCollection.slides[0].slideElements.length === 3 ? "PASS" : "FAIL");

// проверка на удаления элемента слайда

console.log("Testing deleteSlideElements");

const minWithNewText = addTextElement(minimalPresentation, {
    type: "text",
    value: "New Text",
    fontFamily: "Times New Roman",
    fontSize: "14px",
    fontWeight: "normal",
    color: "#000000",
    x: 50,
    y: 50,
    width: 100,
    height: 30
});

const minAfterDeleteElements = deleteSlideElements(minWithNewText, [minWithNewText.slideCollection.slides[0].slideElements[0].id]);
console.log("Test with min data: ", minAfterDeleteElements.slideCollection.slides[0].slideElements.length === 0 ? "PASS" : "FAIL");

const maxAfterDeleteElement = deleteSlideElements(maximalPresentation, ["text1"]);
console.log("Test with max data: ", maxAfterDeleteElement.slideCollection.slides[0].slideElements.length === 1 ? "PASS" : "FAIL");

// проверка на перемещение элемента
console.log("Testing moveElements");

const delta = { x: 10, y: 10 };

const minAfterMove = moveElements(minWithNewText, [minWithNewText.slideCollection.slides[0].slideElements[0].id], delta);
console.log("Test with min data: ", minAfterMove !== minWithNewText ? "PASS" : "FAIL");
console.log("Test with min data: ", (minAfterMove.slideCollection.slides[0].slideElements[0].x - minWithNewText.slideCollection.slides[0].slideElements[0].x) === delta.x ? "PASS" : "FAIL");
console.log("Test with min data: ", (minAfterMove.slideCollection.slides[0].slideElements[0].y - minWithNewText.slideCollection.slides[0].slideElements[0].y) === delta.y ? "PASS" : "FAIL");

const maxAfterMove = moveElements(maximalPresentation, ["text1"], delta);
console.log("Test with max data: ", maxAfterMove !== maximalPresentation ? "PASS" : "FAIL");
console.log("Test with max data: ", (maxAfterMove.slideCollection.slides[0].slideElements[0].x - maximalPresentation.slideCollection.slides[0].slideElements[0].x) === delta.x ? "PASS" : "FAIL");
console.log("Test with max data: ", (maxAfterMove.slideCollection.slides[0].slideElements[0].y - maximalPresentation.slideCollection.slides[0].slideElements[0].y) === delta.y ? "PASS" : "FAIL");


// проверка на изменение размера элемента
console.log("Testing changeElementSize");

const newSize = { width: 300, height: 100 };

const minAfterNewSize = changeElementSize(minWithNewText, minWithNewText.slideCollection.slides[0].slideElements[0].id, newSize);
console.log("Test with min data: ", minAfterNewSize !== minWithNewText ? "PASS" : "FAIL");

const maxAfterNewSize = changeElementSize(maximalPresentation, "text1", newSize);
console.log("Test with min data: ", maxAfterNewSize !== maximalPresentation ? "PASS" : "FAIL");

// проверка на изменение текста
console.log("Testing changeElementText");

const minAfterTextChange = changeElementText(minWithNewText, minWithNewText.slideCollection.slides[0].slideElements[0].id, "Updated text");
console.log("Test with min data: ", minAfterTextChange !== minWithNewText ? "PASS" : "FAIL");

const maxAfterTextChange = changeElementText(maximalPresentation, "text1", "Updated text");
console.log("Test with min data: ", maxAfterTextChange !== maximalPresentation ? "PASS" : "FAIL");

// проверка на изменение размера текста 
console.log("Testing changeFontSize");

const minAfterChangeFontSize = changeFontSize(minWithNewText, minWithNewText.slideCollection.slides[0].slideElements[0].id, "20px");
console.log("Test with min data: ", minAfterChangeFontSize !== minWithNewText ? "PASS" : "FAIL");

const maxAfterChangeFontSize = changeElementText(maximalPresentation, "text1", "20px");
console.log("Test with min data: ", maxAfterChangeFontSize !== maximalPresentation ? "PASS" : "FAIL");

// проверка на изменение fontFamily
console.log("Testing changeFontFamily");

const minAfterChaneFontFamily = changeFontFamily(minWithNewText, minWithNewText.slideCollection.slides[0].slideElements[0].id, "Arial");
console.log("Test with min data: ", minAfterChaneFontFamily !== minWithNewText ? "PASS" : "FAIL");

const maxAfterChaneFontFamily = changeFontFamily(maximalPresentation, "text1", "Times New Roman");
console.log("Test with max data: ", maxAfterChaneFontFamily !== maximalPresentation ? "PASS" : "FAIL");

// проверка на изменение заднего фона слайда
console.log("Testing changeSlideBackground");

const newBackground: SlideBackground = {
    type: "color",
    color: "#ffcc00"
};

const minAfterChangeBackground = changeSlideBackground(minimalPresentation, newBackground);
console.log("Test with min data: ", minAfterChangeBackground !== minimalPresentation ? "PASS" : "FAIL");

const maxAfterChangeBackground = changeSlideBackground(maximalPresentation, newBackground);
console.log("Test with max data: ", maxAfterChangeBackground !== maximalPresentation ? "PASS" : "FAIL");


console.log("Testing moveSlide");
const minAddThirdSlide = addNewSlide(minAddNewSlide, newSlide);
const minimalAddTSlide: Presentation = {
    ...minAddThirdSlide,
    state: {
        ...minAddThirdSlide.state,
        currentSlide: "slide1",
        selectedSlides: ["slide1"]
    }
}
const expectedMinWithMovedSlides = moveSlide(minimalAddTSlide, 3);

console.log(`Before move: ${minAddThirdSlide.slideCollection.slides.map(s => s.id).join(', ')}`);
console.log(`After move: ${expectedMinWithMovedSlides.slideCollection.slides.map(s => s.id).join(', ')}`);

console.log(`test with min data: `, minAddThirdSlide.slideCollection.slides.map(s => s.id).join(', ') !== expectedMinWithMovedSlides.slideCollection.slides.map(s => s.id).join(', ') ? "PASS" : "FAIL");

console.log(`Before move: ${maximalPresentation.slideCollection.slides.map(s => s.id).join(', ')}`);
const expectedMaxWithMovedSlides = moveSlide(maximalPresentation, 2);
console.log(`After move: ${expectedMaxWithMovedSlides.slideCollection.slides.map(s => s.id).join(', ')}`);

console.log(`test with max data: `, maximalPresentation.slideCollection.slides.map(s => s.id).join(', ') !== expectedMaxWithMovedSlides.slideCollection.slides.map(s => s.id).join(', ') ? "PASS" : "FAIL");

