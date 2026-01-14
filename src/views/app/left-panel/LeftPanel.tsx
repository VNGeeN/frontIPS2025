import { CSSProperties, useState } from "react";
import { Slide } from "../../presentation/slide/Slide";
import styles from './LeftPanel.module.css'
import { dispatch } from "../../../core/editor";
import { renamePresentation } from "../../../core/renamePresentation";
import { addToSlideSelection } from "./../../../core/setSelection";
import { selectOneSlide } from "./../../../core/setSelection";
import { setSlidesOrder } from "../../../core/setSlidesOrder";

type LeftPanelProps = {
    title: string,
    slides: Slide[],
    slideSelection: string[]
}

const SLIDE_PREVIEW_SCALE = 0.2

function LeftPanel(props: LeftPanelProps) {
    const onRenamePresentation: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentation, (event.target as HTMLInputElement).value)
    }
    const onSlideClick = (slideId: string, event: React.MouseEvent) => {
        if (event.ctrlKey) {
            dispatch(addToSlideSelection, slideId)
        } else {
            dispatch(selectOneSlide, slideId)
        }
    }
    const [currentSlide, setCurrentSlide] = useState<Slide | null>(null)
    const dragStartHandler = (event: React.DragEvent<HTMLDivElement>, slide: Slide) => {
        setCurrentSlide(slide)
    }
    const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }
    const dropHandler = (event: React.DragEvent<HTMLDivElement>, slide: Slide) => {
        event.preventDefault()
        if (currentSlide == null) return
        const payload: { dragSlideId: string, dropSlideId: string } = {
            dragSlideId: currentSlide?.id,
            dropSlideId: slide.id
        }
        dispatch(setSlidesOrder, payload)
    }
    return (
        <div>
            <p className={styles.inputTitleLabel}>Change project name</p>
            <input type='text' className={styles.inputPresentationTitle} value={props.title} onChange={onRenamePresentation} />
            <div className={styles.leftPanel}>
                {props.slides.map((slide, i) => {
                    const inlineStyles: CSSProperties = {}
                    let isSlideSelected = false
                    props.slideSelection.forEach((element) => {
                        if (element === slide.id) {
                            isSlideSelected = true
                        }
                    })
                    if (isSlideSelected) {
                        inlineStyles.backgroundColor = "#e4e4e4"
                    }
                    return <div
                        key={slide.id}
                        onDragStart={(event) => dragStartHandler(event, slide)}
                        onDragOver={(event) => dragOverHandler(event)}
                        onDrop={(event) => dropHandler(event, slide)}
                        onClick={(event) => {onSlideClick(slide.id, event)}}
                        draggable={true}
                        style={inlineStyles}
                        className={styles.slidePreviewContainer}
                    >
                        <p className={styles.slideIndex}>
                            {i + 1}
                        </p>
                        <Slide
                            slide={slide}
                            scale={SLIDE_PREVIEW_SCALE}
                        />
                        <div className={styles.slidePreviewContainerGuard} />
                    </div>
                }
                )}
            </div>
        </div>
    )
}

export {
    LeftPanel
}