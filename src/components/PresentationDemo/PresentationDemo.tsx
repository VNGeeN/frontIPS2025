import { getSlideIndexById } from '../../core';
import { Presentation } from '../../core/types/type';
import { SlideView } from '../SlideView';
import { SlideThumbnail } from '../Thumbnail';

import styles from './PresentationDemo.module.css';

interface PresentationDemoProps {
  presentation: Presentation;
}

export const PresentationDemo: React.FC<PresentationDemoProps> = ({
  presentation
}) => {
  const handleSlideElementClick = (elementId: string) => {
    console.log(elementId, presentation.slideCollection.slides.find(slide => slide.id === elementId)?.slideElements)
  }

  const handleThumbnailClick = (slideId: string) => {
    console.log(slideId, getSlideIndexById(presentation, slideId))
  }

  return (
    <div className={styles.presentationDemo}>
      <header className={styles.demoHeader}>
        <h1>Presentation Demo</h1>
        <div className={styles.demoControls}>
          {/* <button 
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={styles.toggleThumbnails}
          >
            {showThumbnails ? 'Hide' : 'Show'} Thumbnails
          </button> */}
        </div>
      </header>

      <div className={styles.demoContent}>
        <div className={styles.thumbnailsPanel}>
          <h3>Slides</h3>
          <div className={styles.thumbnailsGrid}>
            {presentation.slideCollection.slides.map((slide, index) => (
              <div key={slide.id} className={styles.thumbnailItem}>
                <SlideThumbnail
                  slide={slide}
                  isSelected={presentation.state.selectedSlides.includes(slide.id)}
                  isCurrent={presentation.state.currentSlide === slide.id}
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

        <div className={styles.presentationContainer}>
          <SlideView
            className={styles.demoPresentation}
            presentation={presentation}
            onElementClick={handleSlideElementClick}
          />
        </div>
      </div>
    </div>
  );
};