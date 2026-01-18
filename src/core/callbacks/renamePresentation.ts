import { type Editor } from "../types/editorTypes";
import { type RenamePresentationAction } from "../redux/actions";

function renamePresentation(editor: Editor, action: RenamePresentationAction): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: action.payload,
        }
    }
}

export {
    renamePresentation,
}