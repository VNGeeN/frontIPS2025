import { SelectOneElementAction } from "./redux/actions";
import { type Editor, type EditBarState } from "./types/editorTypes";

function selectOneElement(editor: Editor, action: SelectOneElementAction): Editor {
    let elemType: EditBarState = "no-edit";
    editor.presentation.slides.forEach((slide) => {
        slide.objects.forEach((object) => {
            if (object.id === action.payload) {
                elemType = object.type
            }
        })
    })
    return {
        ...editor,
        elementSelection: [action.payload],
        interfaceState: {
            ...editor.interfaceState,
            editBarState: elemType
        }
    }
}

export {
    selectOneElement,
}