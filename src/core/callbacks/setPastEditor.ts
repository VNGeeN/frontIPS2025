import { type UndoAction } from "../redux/actions";
import { type Editor } from "../types/editorTypes";

function setPastEditor(action: UndoAction): Editor {
    return action.payload
}

export {
    setPastEditor,
}