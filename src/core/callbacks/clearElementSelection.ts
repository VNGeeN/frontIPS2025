import { type Editor } from "../types/editorTypes";

function clearElementSelection(editor: Editor): Editor {
    return {
        ...editor,
        elementSelection: [],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: "no-edit"
        }
    }
}

export {
    clearElementSelection
}