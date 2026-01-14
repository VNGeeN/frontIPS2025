import { CSSProperties } from "react";
import { type TextObject } from "../../../../core/types/presentationTypes";
import styles from './TextObject.module.css'

import { dispatch } from "../../../../core/editor";

import { changeTextValue } from "../../../../core/changeTextValue";

type TextProps = {
    value: string,
    fontFamily: string,
    fontSize: number,
    fontWeight: number,
    fontColor: string
}

function TextObject({ value, fontFamily, fontSize, fontWeight, fontColor }: TextProps) {
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
                dispatch(changeTextValue, (event.target as HTMLTextAreaElement).value)
            }}
            value={value}
        />
    )
}

export {
    TextObject
}