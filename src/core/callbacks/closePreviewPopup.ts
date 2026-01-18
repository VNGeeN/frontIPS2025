import { type Editor } from "../types/editorTypes";

function closePreviewPopup(editor: Editor): Editor {
    return {
        ...editor,
        interfaceState: {
            ...editor.interfaceState,
            isPreviewActive: false
        }
    }
}

export {
    closePreviewPopup,
}