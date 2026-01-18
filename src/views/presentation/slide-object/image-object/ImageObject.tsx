import { type ImageObject } from "../../../../core/types/presentationTypes";
import styles from './ImageObject.module.css'

type ImageProps = {
    src: string,
}

function ImageObject(props: ImageProps) {
    return (
        <div className={styles.imageContainer}>
            <img draggable={false} src={props.src} className={styles.imageObject} />
        </div>
    )
}

export {
    ImageObject
}