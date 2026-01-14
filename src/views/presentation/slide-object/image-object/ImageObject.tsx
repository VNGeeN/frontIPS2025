import { type ImageObject } from "../../../../core/types/presentationTypes";

import styles from './ImageObject.module.css'
import { selectOneElement } from "../../../../core/setSelection";
import { addToElementSelection } from "../../../../core/setSelection";
import { dispatch } from "../../../../core/editor";

import { CSSProperties } from "react";

type ImageProps = {
    object: ImageObject,
    scale: number,
    isSelected?: boolean
}

function ImageObject({ object, scale, isSelected}: ImageProps) {
    const imageStyles: CSSProperties = {
        position: "absolute",
        boxSizing: "border-box",
        display: "block",
        top: `${object.position.x * scale}px`,
        left: `${object.position.y * scale}px`,
        width: `${object.size.width * scale}px`,
        // height: `${object.size.height * scale}px`,
        // transform: `rotate(${object.position.angle}deg)`,
    }
    if (isSelected) {
        imageStyles.border = "solid 0.5px #4071db"
    }

    const onElementMouseDown = (object: ImageObject, event: React.MouseEvent) => {
        if (!isSelected) {
            if (event.ctrlKey) {
                dispatch(addToElementSelection, object.id)
            } else {
                dispatch(selectOneElement, object.id)
            }
            console.log(event.pageX)
            console.log(event.pageY)
        }
    }

    return (
        <img 
            style={imageStyles} 
            className={styles.imageObject} 
            onMouseDown={(event) => { onElementMouseDown(object, event) }}
            src={object.src}
        />
    )
}

export {
    ImageObject
}