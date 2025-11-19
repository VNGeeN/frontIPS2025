import React, { useState } from 'react';
import { Presentation } from '../../core/types/type';
import { PresentationView } from '../Presentation/PresentationView';
import { SlideThumbnail } from '../Thumbnail/SlideThumbnail';
import styles from './PresentationDemo.module.css';

interface PresentationDemoProps {
  minimalPresentation: Presentation;
  maximalPresentation: Presentation;
}

export const PresentationDemo: React.FC<PresentationDemoProps> = ({
  minimalPresentation,
  maximalPresentation
}) => {
  const [currentPresentation, setCurrentPresentation] = useState<Presentation>(maximalPresentation);
  const [showThumbnails, setShowThumbnails] = useState(true);

  const handleThumbnailClick = (slideId: string) => {
    const updatedPresentation = {
      ...currentPresentation,
      state: {
        ...currentPresentation.state,
        currentSlide: slideId,
        selectedSlides: [slideId]
      }
    };
    setCurrentPresentation(updatedPresentation);
  };

  const handleElementClick = (elementId: string) => {
    console.log('Clicked element:', elementId);
    const updatedPresentation = {
      ...currentPresentation,
      state: {
        ...currentPresentation.state,
        activeElements: [elementId]
      }
    };
    setCurrentPresentation(updatedPresentation);
  };

  const getButtonClass = (isActive: boolean) => {
    return isActive ? styles.active : '';
  };

  return (
    <div className={styles.presentationDemo}>
      <header className={styles.demoHeader}>
        <h1>Presentation Demo</h1>
        <div className={styles.demoControls}>
          <button 
            onClick={() => setCurrentPresentation(minimalPresentation)}
            className={getButtonClass(currentPresentation === minimalPresentation)}
          >
            Minimal Presentation
          </button>
          <button 
            onClick={() => setCurrentPresentation(maximalPresentation)}
            className={getButtonClass(currentPresentation === maximalPresentation)}
          >
            Maximal Presentation
          </button>
          <button 
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={styles.toggleThumbnails}
          >
            {showThumbnails ? 'Hide' : 'Show'} Thumbnails
          </button>
        </div>
      </header>

      <div className={styles.demoContent}>
        {showThumbnails && (
          <div className={styles.thumbnailsPanel}>
            <h3>Slides</h3>
            <div className={styles.thumbnailsGrid}>
              {currentPresentation.slideCollection.slides.map((slide, index) => (
                <div key={slide.id} className={styles.thumbnailItem}>
                  <SlideThumbnail
                    slide={slide}
                    isSelected={currentPresentation.state.selectedSlides.includes(slide.id)}
                    isCurrent={currentPresentation.state.currentSlide === slide.id}
                    onClick={handleThumbnailClick}
                    width={150}
                    height={100}
                  />
                  <div className={styles.thumbnailInfo}>
                    <span>Slide {index + 1}</span>
                    <span>{slide.slideElements.length} elements</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.presentationContainer}>
          <PresentationView
            presentation={currentPresentation}
            onElementClick={handleElementClick}
            className={styles.demoPresentation}
          />
        </div>
      </div>

      <div className={styles.demoInfo}>
        <h3>Presentation Info</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <label>Title:</label>
            <span>{currentPresentation.title}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Total Slides:</label>
            <span>{currentPresentation.slideCollection.slides.length}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Current Slide:</label>
            <span>{currentPresentation.state.currentSlide}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Active Elements:</label>
            <span>{currentPresentation.state.activeElements.join(', ') || 'None'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};