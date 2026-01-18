import { type Editor } from "../types/editorTypes";
import { RenderOptionsBarAction } from "../redux/actions";

function renderOptionsBar(editor: Editor, action: RenderOptionsBarAction): Editor {
    return {
        ...editor,
        interfaceState: {
            ...editor.interfaceState,
            optionsBarState: action.payload
        }
    }
}

export {
    renderOptionsBar,
}