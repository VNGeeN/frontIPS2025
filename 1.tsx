// import { CSSProperties, PointerEventHandler, useCallback, useEffect, useRef, useState } from "react";
// import { type Position, type Size } from "../../../core/types/presentationTypes";
// import { TextObject } from "../slide-object/text-object/TextObject";
// import { ImageObject } from "../slide-object/image-object/ImageObject";
// import styles from './SlideObject.module.css'
// import { slideStart, SLIDE_WIDTH, SLIDE_HEIGHT } from "../../presentation/slide/Slide";
// import { useAppActions } from "../../hooks/useAppActions";

// type SlideObjectProps = {
//     object: TextObject | ImageObject,
//     scale: number,
//     isSelected?: boolean
// }

// type ResizeAttribute = null | 'LT' | 'LM' | 'LB' | 'RT' | 'RM' | 'RB' | 'MB' | 'MT'

// function SlideObject({ object, scale, isSelected }: SlideObjectProps) {
//     const { selectOneElement } = useAppActions()
//     const { addToElementSelection } = useAppActions()
//     const { changeSlideObjectPosition } = useAppActions()
//     const { changeSlideObjectSize } = useAppActions()

//     const slideObjectStyles: CSSProperties = {
//         left: `${object.position.x * scale}px`,
//         top: `${object.position.y * scale}px`,
//         width: `${object.size.width * scale}px`,
//         height: `${object.size.height * scale}px`,
//     }

//     const dragElementRef = useRef<HTMLDivElement>(null)
//     const offset = useRef({ x: 0, y: 0 });

//     const handleDrag = (event: PointerEvent) => {
//         if (!dragElementRef.current) return;

//         const x = event.clientX - dragElementRef.current.getBoundingClientRect().left
//         const y = event.clientY - dragElementRef.current.getBoundingClientRect().top

//         offset.current = {
//             x,
//             y,
//         };
//     }

//     const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
//         if (!isSelected && event.ctrlKey) {
//             return addToElementSelection(object.id)
//         }

//         selectOneElement(object.id)

//         if (!dragElementRef.current) return;
//     }

//     if (isSelected && scale === 1) {
//         slideObjectStyles.border = "solid 1px #4071db"
//     }

//     let slideElement

//     switch (object.type) {
//         case "text":
//             slideElement = <TextObject
//                 value={object.value}
//                 fontFamily={object.fontFamily}
//                 fontSize={object.fontSize * scale}
//                 fontWeight={object.fontWeight}
//                 fontColor={object.fontColor}
//             />
//             break
//         case "image":
//             slideElement = <ImageObject src={object.src} />
//             break
//         default:
//             throw new Error(`Unknown slide-object type: ${object}`)
//     }

//     return (
//         <div
//             ref={dragElementRef}
//             onPointerDown={handleDragStart}
//             style={slideObjectStyles}
//             className={styles.slideObject}
//         >
//             {slideElement}
//             {(isSelected && scale === 1) &&
//                 <>
//                     <div
//                         className={styles.resizePointLT}
//                     />
//                     <div
//                         className={styles.resizePointLM}
//                     />
//                     <div
//                         className={styles.resizePointLB}
//                     />
//                     <div
//                         className={styles.resizePointRT}
//                     />
//                     <div
//                         className={styles.resizePointRM}
//                     />
//                     <div
//                         className={styles.resizePointRB}
//                     />
//                     <div
//                         className={styles.resizePointMT}
//                     />
//                     <div
//                         className={styles.resizePointMB}
//                     />
//                 </>
//             }
//         </div>
//     )
// }

// export {
//     SlideObject,
// }