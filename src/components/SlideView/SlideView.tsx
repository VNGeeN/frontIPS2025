// import { Presentation } from '../../core/types/presentationTypes';
// import { SlideWorkspaceView } from '../SlideWorkspace';

// import styles from './SlideView.module.css';

// interface Props {
//   className?: string;
//   presentation: Presentation;
//   onElementClick?: (elementId: string) => void;
// }

// export const SlideView: React.FC<Props> = ({
//   className = '',
//   presentation,
//   onElementClick,
// }) => {
//   const currentSlideId = presentation.state.currentSlide;
//   const currentSlide = presentation.slideCollection.slides.find(
//     slide => slide.id === currentSlideId
//   );

//   return (
//     <div className={`${styles.presentationView} ${className}`}>
//       <header className={styles.presentationHeader}>
//         <h1 className={styles.presentationTitle}>{presentation.title}</h1>
//       </header>

//       <div className={styles.slidesContainer}>
//         {currentSlide ? (
//           <SlideWorkspaceView
//             width={presentation.size.width}
//             height={presentation.size.height}
//             slide={currentSlide}
//             onElementClick={onElementClick}
//           />
//         ) : (
//           <div className={styles.noSlides}>Нет слайдов для отображения</div>
//         )}
//       </div>
//     </div>
//   );
// };