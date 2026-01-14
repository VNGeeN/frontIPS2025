import { Presentation } from "./types/presentationTypes";

function saveToLocalStorage(presentation: Presentation): void {
    localStorage.clear()
    localStorage.setItem('presentation', JSON.stringify(presentation))
}

export {
    saveToLocalStorage,
}