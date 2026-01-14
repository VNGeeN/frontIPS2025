import { type Editor } from "./types/editorTypes";
import { type Slide } from "./types/presentationTypes";
import { SetSlidesOrderAction } from "./redux/actions";

function setSlidesOrder(editor: Editor, action: SetSlidesOrderAction): Editor {
    const dragSlideIndex: number = editor.presentation.slides.findIndex((slide) => slide.id === action.payload.dragSlideId)
    const dropSlideIndex: number = editor.presentation.slides.findIndex((slide) => slide.id === action.payload.dropSlideId)
    const draggableSlide: Slide = structuredClone(editor.presentation.slides[dragSlideIndex])
    const newSlides = structuredClone(editor.presentation.slides)
    newSlides.splice(dragSlideIndex, 1)
    newSlides.splice(dropSlideIndex, 0, draggableSlide)
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides

        },
        slideSelection: [action.payload.dragSlideId],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "slide"
        }
    }
}

export {
    setSlidesOrder,
}