import { SetEditorAction } from "./redux/actions";
import { type Editor } from "./types/editorTypes";

function setEditor(action: SetEditorAction): Editor {
    return action.payload
}

export {
    setEditor,
}