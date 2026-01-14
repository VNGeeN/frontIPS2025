import { CSSProperties } from "react";
import { type TextObject } from "../../../../core/types/presentationTypes";
import styles from './TextObject.module.css'
import { useAppActions } from "../../../hooks/useAppActions";


type TextProps = {
    value: string,
    fontFamily: string,
    fontSize: number,
    fontWeight: number,
    fontColor: string
}

function TextObject({ value, fontFamily, fontSize, fontWeight, fontColor }: TextProps) {
    const { changeTextValue } = useAppActions()

    const textStyles: CSSProperties = {
        fontFamily: `${fontFamily}`,
        fontSize: `${fontSize}px`,
        fontWeight: `${fontWeight}`,
        color: `${fontColor}`,
    }
    return (
        <textarea
            style={textStyles}
            className={styles.textObjectInput}
            onChange={(event) => {
                changeTextValue((event.target as HTMLTextAreaElement).value)
            }}
            value={value}
        />
    )
}

export {
    TextObject
}