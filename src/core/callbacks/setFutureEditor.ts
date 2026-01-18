import { type RedoAction } from "../redux/actions";
import { type Editor } from "../types/editorTypes";

function setFutureEditor(action: RedoAction): Editor {
    return action.payload
}

export {
    setFutureEditor,
}