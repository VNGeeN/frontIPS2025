// import React from 'react';
// import { SlideElement, TextType, ImageType } from '../../core/types/presentationTypes';
// import styles from './SlideElementView.module.css';

// interface SlideElementViewProps {
//   element: SlideElement;
//   onClick: (e: React.MouseEvent) => void;
// }

// export const SlideElementView: React.FC<SlideElementViewProps> = ({ element, onClick }) => {
//   const commonStyle: React.CSSProperties = {
//     position: 'absolute',
//     left: element.x,
//     top: element.y,
//     width: element.width,
//     height: element.height,
//     cursor: 'pointer'
//   };

//   if (element.type === 'text') {
//     const textElement = element as TextType;
//     return (
//       <div
//         style={{
//           ...commonStyle,
//           fontFamily: textElement.fontFamily,
//           fontSize: textElement.fontSize,
//           fontWeight: textElement.fontWeight,
//           color: textElement.color,
//           overflow: 'hidden',
//           wordWrap: 'break-word'
//         }}
//         onClick={onClick}
//         className={`${styles.slideElement} ${styles.textElement}`}
//       >
//         {textElement.value}
//       </div>
//     );
//   } else {
//     const imageElement = element as ImageType;
//     return (
//       <img
//         src={imageElement.src}
//         alt="Slide element"
//         style={commonStyle}
//         onClick={onClick}
//         className={`${styles.slideElement} ${styles.imageElement}`}
//       />
//     );
//   }
// };