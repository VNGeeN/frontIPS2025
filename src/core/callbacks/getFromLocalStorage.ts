import { Presentation } from "../types/presentationTypes";
import { validate } from "../../../ajvValidator";

function getFromLocalStorage(): Presentation | undefined {
    const localStoragePresentation = localStorage.getItem('presentation')
    if (localStoragePresentation) {
        const presentation: Presentation = JSON.parse(localStoragePresentation)
        const valid = validate(presentation)
        if (!valid) {
            console.log("Not valid JSON data")
            return
        }
        return presentation
    }
}

export {
    getFromLocalStorage,
}