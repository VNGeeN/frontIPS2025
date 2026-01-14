import { type Editor } from "./types/editorTypes";
import { openJSONAction } from "./redux/actions";
import { validate } from "../../ajvValidator";


function openJSON(editor: Editor, action: openJSONAction): Editor {
    const valid = validate(action.payload)
    if (!valid) {
        console.log("Not valid JSON data")
        return editor
    }
    return {
        ...editor,
        presentation: action.payload,
        slideSelection: []
    }
}

export {
    openJSON
}