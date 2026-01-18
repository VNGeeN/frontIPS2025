import { type Editor } from "../types/editorTypes";

function openSetSlideBackgroundImagePopup(editor: Editor): Editor {
    return {
        ...editor,
        elementSelection: [],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "no-edit",
            isPreviewActive: false,
            isChangeImagePopupActive: false,
            isSetSlideBackgroundImagePopupActive: true
        }
    }
}

export {
    openSetSlideBackgroundImagePopup,
}