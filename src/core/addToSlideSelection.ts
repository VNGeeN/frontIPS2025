import { AddToSlideSelectionAction } from "./redux/actions";
import { type Editor } from "./types/editorTypes";

function addToSlideSelection(editor: Editor, action: AddToSlideSelectionAction): Editor {
    return {
        ...editor,
        slideSelection: [...editor.slideSelection, action.payload],
        elementSelection: [],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "slide"
        }
    }
}

export {
    addToSlideSelection,
}