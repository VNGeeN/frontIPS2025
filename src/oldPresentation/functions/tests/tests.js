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
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../functions");
var testData_1 = require("./testData");
// Проверка изменения названия презентации
console.log("Testing changePresentationTitle");
var minChangePresTitle = (0, functions_1.changePresentationTitle)(testData_1.minimalPresentation, "New Title(min)");
console.log("Test with min data: ", minChangePresTitle.title === "New Title(min)" ? "PASS" : "FAIL");
var maxChangePresTitle = (0, functions_1.changePresentationTitle)(testData_1.maximalPresentation, "New Title(max)");
console.log("Test with max data: ", maxChangePresTitle.title === "New Title(max)" ? "PASS" : "FAIL");
// Проверка добавления слайда
console.log("Testing addNewSlide");
var newSlide = {
    id: "newSlide",
    slideElements: [],
    background: {
        type: "color",
        color: "#cccccc"
    }
};
var minAddNewSlide = (0, functions_1.addNewSlide)(testData_1.minimalPresentation, newSlide);
console.log("Test with min data: ", minAddNewSlide.slideCollection.slides.length === 2 ? "PASS" : "FAIL");
var maxAddNewSlide = (0, functions_1.addNewSlide)(testData_1.maximalPresentation, newSlide);
console.log("Test with max data: ", maxAddNewSlide.slideCollection.slides.length === 3 ? "PASS" : "FAIL");
// проверка удаление слайда
console.log("Testing deleteSlide");
var minimalCurrentSlide = __assign(__assign({}, testData_1.minimalPresentation), { state: __assign(__assign({}, testData_1.minimalPresentation.state), { currentSlide: "slide1" }) });
var minAfterDeleteSlide = (0, functions_1.deleteSlide)(testData_1.minimalPresentation);
console.log("Test with min data: ", minAfterDeleteSlide.slideCollection.slides.length === 0 ? "PASS" : "FAIL");
var maxAfterDeleteSlide = (0, functions_1.deleteSlide)(testData_1.maximalPresentation);
console.log("Test with max data: ", maxAfterDeleteSlide.slideCollection.slides.length === 1 ? "PASS" : "FAIL");
// проверка вставки текстового элемента
console.log("Testing addTextElement");
var newTextElement = {
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
var minAddNewText = (0, functions_1.addTextElement)(testData_1.minimalPresentation, newTextElement);
console.log("Test with min data: ", minAddNewText.slideCollection.slides[0].slideElements.length === 1 ? "PASS" : "FAIL");
var maxAddNewText = (0, functions_1.addTextElement)(testData_1.maximalPresentation, newTextElement);
console.log("Test with max data: ", maxAddNewText.slideCollection.slides[0].slideElements.length === 3 ? "PASS" : "FAIL");
// проверка добавления новой каритнки
console.log("Testing addImageElement");
var newImageElement = {
    id: "",
    type: "image",
    src: "image3.png",
    x: 400,
    y: 250,
    width: 200,
    height: 200,
};
var minAddNewImage = (0, functions_1.addImageElement)(testData_1.minimalPresentation, newImageElement);
console.log("Test with min data: ", minAddNewImage.slideCollection.slides[0].slideElements.length === 1 ? "PASS" : "FAIL");
var maxAddNewImage = (0, functions_1.addImageElement)(testData_1.maximalPresentation, newImageElement);
console.log("Test with max data: ", maxAddNewImage.slideCollection.slides[0].slideElements.length === 3 ? "PASS" : "FAIL");
// проверка на удаления элемента слайда
console.log("Testing deleteSlideElements");
// const minWithNewText = {
//     ...minimalPresentation,
//     slideElements: {
//         ...minimalPresentation.slideCollection.slides[0].slideElements,
//     },
// }
var minWithNewText = (0, functions_1.addTextElement)(testData_1.minimalPresentation, {
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
var minAfterDeleteElements = (0, functions_1.deleteSlideElements)(minWithNewText, [minWithNewText.slideCollection.slides[0].slideElements[0].id]);
console.log("Test with min data: ", minAfterDeleteElements.slideCollection.slides[0].slideElements.length === 0 ? "PASS" : "FAIL");
var maxAfterDeleteElement = (0, functions_1.deleteSlideElements)(testData_1.maximalPresentation, ["text1"]);
console.log("Test with max data: ", maxAfterDeleteElement.slideCollection.slides[0].slideElements.length === 1 ? "PASS" : "FAIL");
// проверка на перемещение элемента
console.log("Testing moveElements");
var delta = { x: 10, y: 10 };
var minAfterMove = (0, functions_1.moveElements)(minWithNewText, [minWithNewText.slideCollection.slides[0].slideElements[0].id], delta);
console.log("Test with min data: ", minAfterMove !== minWithNewText ? "PASS" : "FAIL");
console.log("Test with min data: ", (minAfterMove.slideCollection.slides[0].slideElements[0].x - minWithNewText.slideCollection.slides[0].slideElements[0].x) === delta.x ? "PASS" : "FAIL");
console.log("Test with min data: ", (minAfterMove.slideCollection.slides[0].slideElements[0].y - minWithNewText.slideCollection.slides[0].slideElements[0].y) === delta.y ? "PASS" : "FAIL");
var maxAfterMove = (0, functions_1.moveElements)(testData_1.maximalPresentation, ["text1"], delta);
console.log("Test with max data: ", maxAfterMove !== testData_1.maximalPresentation ? "PASS" : "FAIL");
console.log("Test with max data: ", (maxAfterMove.slideCollection.slides[0].slideElements[0].x - testData_1.maximalPresentation.slideCollection.slides[0].slideElements[0].x) === delta.x ? "PASS" : "FAIL");
console.log("Test with max data: ", (maxAfterMove.slideCollection.slides[0].slideElements[0].y - testData_1.maximalPresentation.slideCollection.slides[0].slideElements[0].y) === delta.y ? "PASS" : "FAIL");
// проверка на изменение размера элемента
console.log("Testing changeElementSize");
var newSize = { width: 300, height: 100 };
var minAfterNewSize = (0, functions_1.changeElementSize)(minWithNewText, minWithNewText.slideCollection.slides[0].slideElements[0].id, newSize);
console.log("Test with min data: ", minAfterNewSize !== minWithNewText ? "PASS" : "FAIL");
var maxAfterNewSize = (0, functions_1.changeElementSize)(testData_1.maximalPresentation, "text1", newSize);
console.log("Test with min data: ", maxAfterNewSize !== testData_1.maximalPresentation ? "PASS" : "FAIL");
// проверка на изменение текста
console.log("Testing changeElementText");
var minAfterTextChange = (0, functions_1.changeElementText)(minWithNewText, minWithNewText.slideCollection.slides[0].slideElements[0].id, "Updated text");
console.log("Test with min data: ", minAfterTextChange !== minWithNewText ? "PASS" : "FAIL");
var maxAfterTextChange = (0, functions_1.changeElementText)(testData_1.maximalPresentation, "text1", "Updated text");
console.log("Test with min data: ", maxAfterTextChange !== testData_1.maximalPresentation ? "PASS" : "FAIL");
// проверка на изменение размера текста 
console.log("Testing changeFontSize");
var minAfterChangeFontSize = (0, functions_1.changeFontSize)(minWithNewText, minWithNewText.slideCollection.slides[0].slideElements[0].id, "20px");
console.log("Test with min data: ", minAfterChangeFontSize !== minWithNewText ? "PASS" : "FAIL");
var maxAfterChangeFontSize = (0, functions_1.changeElementText)(testData_1.maximalPresentation, "text1", "20px");
console.log("Test with min data: ", maxAfterChangeFontSize !== testData_1.maximalPresentation ? "PASS" : "FAIL");
// проверка на изменение fontFamily
console.log("Testing changeFontFamily");
var minAfterChaneFontFamily = (0, functions_1.changeFontFamily)(minWithNewText, minWithNewText.slideCollection.slides[0].slideElements[0].id, "Arial");
console.log("Test with min data: ", minAfterChaneFontFamily !== minWithNewText ? "PASS" : "FAIL");
var maxAfterChaneFontFamily = (0, functions_1.changeFontFamily)(testData_1.maximalPresentation, "text1", "Times New Roman");
console.log("Test with max data: ", maxAfterChaneFontFamily !== testData_1.maximalPresentation ? "PASS" : "FAIL");
// проверка на изменение заднего фона слайда
console.log("Testing changeSlideBackground");
var newBackground = {
    type: "color",
    color: "#ffcc00"
};
var minAfterChangeBackground = (0, functions_1.changeSlideBackground)(testData_1.minimalPresentation, newBackground);
console.log("Test with min data: ", minAfterChangeBackground !== testData_1.minimalPresentation ? "PASS" : "FAIL");
var maxAfterChangeBackground = (0, functions_1.changeSlideBackground)(testData_1.maximalPresentation, newBackground);
console.log("Test with max data: ", maxAfterChangeBackground !== testData_1.maximalPresentation ? "PASS" : "FAIL");
console.log("Testing moveSlide");
var minAddThirdSlide = (0, functions_1.addNewSlide)(minAddNewSlide, newSlide);
var minimalAddTSlide = __assign(__assign({}, minAddThirdSlide), { state: __assign(__assign({}, minAddThirdSlide.state), { currentSlide: "slide1", selectedSlides: ["slide1"] }) });
var expectedMinWithMovedSlides = (0, functions_1.moveSlide)(minimalAddTSlide, 3);
console.log("Before move: ".concat(minAddThirdSlide.slideCollection.slides.map(function (s) { return s.id; }).join(', ')));
console.log("After move: ".concat(expectedMinWithMovedSlides.slideCollection.slides.map(function (s) { return s.id; }).join(', ')));
console.log("test with min data: ", minAddThirdSlide.slideCollection.slides.map(function (s) { return s.id; }).join(', ') !== expectedMinWithMovedSlides.slideCollection.slides.map(function (s) { return s.id; }).join(', ') ? "PASS" : "FAIL");
console.log("Before move: ".concat(testData_1.maximalPresentation.slideCollection.slides.map(function (s) { return s.id; }).join(', ')));
var expectedMaxWithMovedSlides = (0, functions_1.moveSlide)(testData_1.maximalPresentation, 2);
console.log("After move: ".concat(expectedMaxWithMovedSlides.slideCollection.slides.map(function (s) { return s.id; }).join(', ')));
console.log("test with max data: ", testData_1.maximalPresentation.slideCollection.slides.map(function (s) { return s.id; }).join(', ') !== expectedMaxWithMovedSlides.slideCollection.slides.map(function (s) { return s.id; }).join(', ') ? "PASS" : "FAIL");
