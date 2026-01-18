import { type Editor } from "../types/editorTypes";

function openPreviewPopup(editor: Editor): Editor {
    return {
        ...editor,
        elementSelection: [],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "no-edit",
            isPreviewActive: true
        }
    }
}

export {
    openPreviewPopup,
}