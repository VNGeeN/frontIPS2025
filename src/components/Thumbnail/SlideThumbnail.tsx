import React from 'react';
import { Slide } from '../../core/types/type';
import { SlideBackgroundView } from '../SlideBackground/SlideBackgroundView';
import styles from './SlideThumbnail.module.css';

interface SlideThumbnailProps {
  slide: Slide;
  isSelected: boolean;
  isCurrent: boolean;
  onClick: (slideId: string) => void;
  width?: number;
  height?: number;
}

export const SlideThumbnail: React.FC<SlideThumbnailProps> = ({
  slide,
  isSelected,
  isCurrent,
  onClick,
  width = 120,
  height = 80
}) => {
  const scaleX = width / 800;
  const scaleY = height / 600;

  const thumbnailClasses = [
    styles.slideThumbnail,
    isSelected ? styles.selected : '',
    isCurrent ? styles.current : ''
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={thumbnailClasses}
      onClick={() => onClick(slide.id)}
      style={{ width, height }}
    >
      <div className={styles.thumbnailBackground}>
        <SlideBackgroundView background={slide.background} />
      </div>
      <div className={styles.thumbnailElements}>
        {slide.slideElements.map(element => (
          <div
            key={element.id}
            className={styles.thumbnailElement}
            style={{
              left: element.x * scaleX,
              top: element.y * scaleY,
              width: element.width * scaleX,
              height: element.height * scaleY,
              backgroundColor: element.type === 'text' ? 'transparent' : '#ccc',
              border: element.type === 'text' ? '1px dashed #999' : 'none'
            }}
          />
        ))}
      </div>
      <div className={styles.thumbnailOverlay} />
    </div>
  );
};