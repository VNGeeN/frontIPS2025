import { type Editor } from "../types/editorTypes";
import { SetFontSizeAction } from "../redux/actions";
import { Slide } from "../types/presentationTypes";

function setFontSize(editor: Editor, action: SetFontSizeAction): Editor {
    const newSlides: Slide[] = structuredClone(editor.presentation.slides)
    newSlides.forEach((slide) => {
        slide.objects.forEach((element) => {
            editor.elementSelection.forEach((elemId) => {
                if (elemId === element.id && element.type === "text") {
                    element.fontSize = action.payload
                }
            })
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
    setFontSize,
}