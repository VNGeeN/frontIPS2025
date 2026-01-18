import { type Editor } from "../types/editorTypes";

function openSetBackgroundPopup(editor: Editor): Editor {
    return {
        ...editor,
        elementSelection: [],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "slide",
            isSetSlideBackgroundPopupActive: true,
        }
    }
}

export {
    openSetBackgroundPopup,
}