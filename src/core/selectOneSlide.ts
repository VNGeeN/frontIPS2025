import { type Editor } from "./types/editorTypes"
import { type SelectOneSlideAction } from "./redux/actions"

function selectOneSlide(editor: Editor, action: SelectOneSlideAction): Editor {
    return {
        ...editor,
        slideSelection: [action.payload],
        elementSelection: [],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "slide"
        }
    }
}

export {
    selectOneSlide,
}