import { type Editor, type SavePopupState } from "../types/editorTypes";
import { type OpenSavePopupAction } from "../redux/actions";

function openSavePopup(editor: Editor, action: OpenSavePopupAction): Editor {
    const newSavePopupState: SavePopupState = {
        type: action.payload,
        isActive: true

    }
    return {
        ...editor,
        elementSelection: [],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "no-edit",
            savePopupState: newSavePopupState
            // isSavePopupActive: true,
        }
    }
}

export {
    openSavePopup,
}