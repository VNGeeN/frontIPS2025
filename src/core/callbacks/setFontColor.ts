import { type Editor } from "../types/editorTypes";
import { SetFontColorAction } from "../redux/actions";
import { Slide } from "../types/presentationTypes";

function setFontColor(editor: Editor, action: SetFontColorAction): Editor {
    const newSlides: Slide[] = structuredClone(editor.presentation.slides)
    newSlides.forEach((slide) => {
        slide.objects.forEach((element) => {
            editor.elementSelection.forEach((elemId) => {
                if (elemId === element.id && element.type === "text") {
                    element.fontColor = action.payload
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
    setFontColor,
}