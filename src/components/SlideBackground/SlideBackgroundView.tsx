// import React from 'react';
// import { SlideBackground } from '../../core/types/presentationTypes';
// import styles from './SlideBackgroundView.module.css';

// interface SlideBackgroundViewProps {
//   background: SlideBackground;
// }

// export const SlideBackgroundView: React.FC<SlideBackgroundViewProps> = ({ background }) => {
//   if (background.type === 'color') {
//     return (
//       <div 
//         className={styles.slideBackground}
//         style={{ backgroundColor: background.color }}
//       />
//     );
//   } else {
//     return (
//       <div 
//         className={styles.slideBackground}
//         style={{ 
//           backgroundImage: `url(${background.src})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center'
//         }}
//       />
//     );
//   }
// };