import { type Editor } from "./types/editorTypes";
import { type Background } from "./types/presentationTypes";


function setSlideBackgroundImage(editor: Editor, backgroundImage: string): Editor {
    function setBackground(srcStr: string): Background {
        return {
            type: {
                type: "image",
                src: srcStr
            }
        }
    }
    const newSlides = structuredClone(editor.presentation.slides)
    newSlides.forEach((slide) => {
        editor.slideSelection.forEach((idStr) => {
            if (slide.id === idStr) {
                slide.background = setBackground(backgroundImage)
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