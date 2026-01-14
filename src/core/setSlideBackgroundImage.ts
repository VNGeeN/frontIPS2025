import { type Editor } from "./types/editorTypes";
import { type ImageBackground } from "./types/presentationTypes";
import { SetSlideBackgroundImageAction } from "./redux/actions";

function setSlideBackgroundImage(editor: Editor, action: SetSlideBackgroundImageAction): Editor {
    function setBackground(srcStr: string): ImageBackground {
        return {
            type: "image",
            src: srcStr
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
    setSlideBackgroundImage,
}