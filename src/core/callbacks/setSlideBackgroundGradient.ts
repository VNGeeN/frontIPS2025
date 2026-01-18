import { type Editor } from "../types/editorTypes";
import { type GradientBackground } from "../types/presentationTypes";
import { SetSlideBackgroundGradientAction } from "../redux/actions";

function setSlideBackgroundGradient(editor: Editor, action: SetSlideBackgroundGradientAction): Editor {
    function setBackground(value: {color1: string, color2: string, tilt: number}): GradientBackground {
        return {
            type: "gradient",
            colorOne: value.color1,
            colorTwo: value.color2,
            angle: value.tilt
        }
    }
    const newSlides = structuredClone(editor.presentation.slides)
    newSlides.forEach((slide) => {
        editor.slideSelection.forEach((idStr) => {
            if (slide.id === idStr) {
                slide.background = setBackground(action.payload)
            }
        })
    })
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

export {
    setSlideBackgroundGradient,
}