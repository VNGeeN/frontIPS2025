import { type Editor } from "./types/editorTypes";
// import { type Presentation } from "./types/PresentationTypes";

function renamePresentation(editor: Editor, newTitle: string): Editor {
    console.log('editor', editor)
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: newTitle,
        }
    }
}

export {
    renamePresentation,
}