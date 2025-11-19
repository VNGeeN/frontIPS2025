import React from 'react';
import { Presentation } from '../../core/types/type';
import { SlideView } from '../Slide/SlideView';
import styles from './PresentationView.module.css';

interface PresentationViewProps {
  presentation: Presentation;
  onSlideClick?: (slideId: string) => void;
  onElementClick?: (elementId: string) => void;
  className?: string;
}

export const PresentationView: React.FC<PresentationViewProps> = ({
  presentation,
  onSlideClick,
  onElementClick,
  className = ''
}) => {
  const currentSlideId = presentation.state.currentSlide;
  const currentSlide = presentation.slideCollection.slides.find(
    slide => slide.id === currentSlideId
  );

  return (
    <div className={`${styles.presentationView} ${className}`}>
      <header className={styles.presentationHeader}>
        <h1 className={styles.presentationTitle}>{presentation.title}</h1>
      </header>
      
      <div className={styles.slidesContainer}>
        {currentSlide ? (
          <SlideView
            slide={currentSlide}
            presentationSize={presentation.size}
            onElementClick={onElementClick}
            isCurrent={true}
          />
        ) : (
          <div className={styles.noSlides}>Нет слайдов для отображения</div>
        )}
      </div>
    </div>
  );
};