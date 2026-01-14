import { type Editor } from "../types/editorTypes";
import { Presentation } from "../types/presentationTypes";
import { ActionType } from "./actions";

function setEditor(newEditor: Editor) {
    return {
        type: ActionType.SET_EDITOR,
        payload: newEditor,
    }
}

function saveJSON() {
    return {
        type: ActionType.SAVE_JSON,
    }
}

function openJSON(newPresentation: Presentation) {
    return {
        type: ActionType.OPEN_JSON,
        payload: newPresentation,
    }
}

export {
    setEditor,
    saveJSON,
    openJSON
}