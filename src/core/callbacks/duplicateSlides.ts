import { type Editor } from "../types/editorTypes";
import { type Slide } from "../types/presentationTypes";

function duplicateSlides(editor: Editor): Editor {
    if (editor.slideSelection.length <= 0)
        return {
            ...editor
        }
    const copyingSlides: Slide[] = []
    editor.presentation.slides.forEach(slide => {
        editor.slideSelection.forEach(id => {
            if (id === slide.id) {
                copyingSlides.push(slide)
            }
        })
    })
    const slideCopies: Slide[] = structuredClone(copyingSlides)
    slideCopies.forEach(slide => {
        slide.id = crypto.randomUUID()
        slide.objects.forEach(slideObject => {
            slideObject.id = crypto.randomUUID()
        })
    })
    const newSlides: Slide[] = structuredClone(editor.presentation.slides)

    const lastSelectedSlideIndex: number = editor.presentation.slides.findIndex(slide => {
        slide.id === editor.slideSelection[editor.slideSelection.length - 1]
    })

    // slideCopies.forEach((slide, i) => {
    //     newSlides.splice(lastSelectedSlideIndex + i, 0, slide)
    // })

    slideCopies.forEach(slide => {
        newSlides.push(slide)
    })

    return {
        ...editor,
        slideSelection: [newSlides[newSlides.length - 1].id],
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    }
}

export {
    duplicateSlides,
}