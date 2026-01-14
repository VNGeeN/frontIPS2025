import { type Editor } from "./types/editorTypes";
import { type OptionsBarState } from './types/editorTypes'

function renderOptionsBar(editor: Editor, newState: OptionsBarState): Editor {
    console.log('editor', editor)
    return {
        ...editor,
        interfaceState: {
            ...editor.interfaceState,
            optionsBarState: newState
        }
    }
}

export {
    renderOptionsBar,
}