import React from 'react';
import { Slide, SlideBackground } from '../../core/types/type';
import { SlideBackgroundView } from '../SlideBackground/SlideBackgroundView';
import { SlideElementView } from '../SlideElement/SlideElementView';
import styles from './SlideView.module.css';

interface SlideViewProps {
  slide: Slide;
  presentationSize: { width: number; height: number };
  onElementClick?: (elementId: string) => void;
  isCurrent: boolean;
}

export const SlideView: React.FC<SlideViewProps> = ({
  slide,
  presentationSize,
  onElementClick,
  isCurrent
}) => {
  const handleBackgroundClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleElementClick = (elementId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onElementClick?.(elementId);
  };

  return (
    <div 
      className={`${styles.slide} ${isCurrent ? styles.slideCurrent : ''}`}
      style={{
        width: presentationSize.width,
        height: presentationSize.height
      }}
      onClick={handleBackgroundClick}
    >
      <SlideBackgroundView background={slide.background} />
      
      <div className={styles.slideElements}>
        {slide.slideElements.map(element => (
          <SlideElementView
            key={element.id}
            element={element}
            onClick={(e) => handleElementClick(element.id, e)}
          />
        ))}
      </div>
    </div>
  );
};