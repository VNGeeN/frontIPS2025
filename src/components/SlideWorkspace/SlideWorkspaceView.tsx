// import { Slide } from '../../core/types/presentationTypes';
// import { SlideBackgroundView } from '../SlideBackground/SlideBackgroundView';
// import { SlideElementView } from '../SlideElement/SlideElementView';

// import styles from './SlideWorkspaceView.module.css';

// interface SlideViewProps {
//   width: number;
//   height: number;
//   slide: Slide;
//   onElementClick?: (elementId: string) => void;
// }

// export const SlideWorkspaceView: React.FC<SlideViewProps> = ({
//   width,
//   height,
//   slide,
//   onElementClick,
// }) => {
//   const handleElementClick = (elementId: string) => () => {
//     onElementClick?.(elementId);
//   };

//   return (
//     <div
//       className={styles.slide}
//       style={{
//         width,
//         height
//       }}
//     >
//       <SlideBackgroundView background={slide.background} />

//       <div className={styles.slideElements}>
//         {slide.slideElements.map(element => (
//           <SlideElementView
//             key={element.id}
//             element={element}
//             onClick={handleElementClick(element.id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };