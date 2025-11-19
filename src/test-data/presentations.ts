import { Presentation } from '../core/types/type';


export const minimalPresentation: Presentation = {
    title: "Minimal Presentation",
    slideCollection: {
        slides: [
            {
                id: "slide1",
                slideElements: [],
                background: {
                    type: "color",
                    color: "#ffffff"
                }
            }
        ]
    },
    size: {
        width: 800,
        height: 600
    },
    state: {
        currentSlide: "slide1",
        selectedSlides: ["slide1"],
        activeElements: []
    }
};

export const maximalPresentation: Presentation = {
    title: "Maximal Presentation",
    slideCollection: {
        slides: [
            {
                id: "slide1",
                slideElements: [
                    {
                        id: "text1",
                        type: "text",
                        value: "Sample Text 1",
                        fontFamily: "Arial",
                        fontSize: "16px",
                        fontWeight: "normal",
                        color: "#000000",
                        x: 100,
                        y: 100,
                        width: 200,
                        height: 50
                    },
                    {
                        id: "image1",
                        type: "image",
                        src: "image1.jpg",
                        x: 300,
                        y: 200,
                        width: 150,
                        height: 150
                    }
                ],
                background: {
                    type: "image",
                    src: "background1.jpg"
                }
            },
            {
                id: "slide2",
                slideElements: [
                    {
                        id: "text2",
                        type: "text",
                        value: "Sample Text 2",
                        fontFamily: "Verdana",
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#ff0000",
                        x: 200,
                        y: 150,
                        width: 250,
                        height: 60
                    },
                    {
                        id: "image2",
                        type: "image",
                        src: "image2.png",
                        x: 400,
                        y: 250,
                        width: 200,
                        height: 200
                    }
                ],
                background: {
                    type: "color",
                    color: "#f0f0f0"
                }
            }
        ]
    },
    size: {
        width: 1024,
        height: 768
    },
    state: {
        currentSlide: "slide1",
        selectedSlides: ["slide1"],
        activeElements: ["text1"]
    }
};