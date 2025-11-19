import { EventType } from "../types/eventTypes";
import { PresentationModel } from '../presentationModel/presentationModel';
import { ViewManager } from "../viewManager/viewManager/viewManager";

export class EventManager {
    private subscribers: Map<EventType, Function[]> = new Map();
    
    constructor(
        private model: PresentationModel,
        private viewManager: ViewManager
    ) {}
    
    subscribe(eventType: EventType, callback: Function): void {
        if (!this.subscribers.has(eventType)) {
            this.subscribers.set(eventType, []);
        }
        this.subscribers.get(eventType)!.push(callback);
    }
    
    dispatch(event: AppEvent): void {
        const callbacks = this.subscribers.get(event.type) || [];
        callbacks.forEach(callback => callback(event));
    }
    
    bindEvents(): void {
        this.bindTitleEvents();
        this.bindWorkspaceEvents();
        this.bindSlidesListEvents();
        this.bindToolbarEvents();
    }
    
    private bindTitleEvents(): void {
        const titleInput = document.querySelector('.title-input') as HTMLInputElement;
        titleInput?.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            this.model.setTitle(target.value);
        });
    }
    
    private bindWorkspaceEvents(): void {
        const workspace = document.querySelector('.workspace');
        workspace?.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const elementId = target.dataset.elementId;
            
            if (elementId) {
                const element = this.findElementById(elementId);
                if (element) {
                    const backgroundColor = element.type === ElementType.TEXT ? 
                        (element as TextType).color : 'none';
                    
                    this.dispatch({
                        type: EventType.ELEMENT_CLICK,
                        data: {
                            elementId,
                            backgroundColor
                        }
                    });
                }
            }
        });
    }
    
    private bindSlidesListEvents(): void {
        const slidesList = document.querySelector('.slides-list');
        slidesList?.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const slideThumbnail = target.closest('.slide-thumbnail') as HTMLElement;
            
            if (slideThumbnail) {
                const slideId = slideThumbnail.dataset.slideId;
                const slideIndex = parseInt(slideThumbnail.dataset.slideIndex || '0');
                
                if (slideId) {
                    this.model.setCurrentSlide(slideId);
                    
                    this.dispatch({
                        type: EventType.SLIDE_CLICK,
                        data: {
                            slideId,
                            slideIndex
                        }
                    });
                }
            }
        });
    }
    
    private bindToolbarEvents(): void {
        const toolbar = document.querySelector('.toolbar');
        toolbar?.addEventListener('click', (e) => {
            const target = e.target as HTMLButtonElement;
            const action = target.dataset.action as ActionType;
            
            if (action && Object.values(ActionType).includes(action)) {
                this.model.executeAction(action);
            }
        });
    }
    
    private findElementById(elementId: string): SlideElement | null {
        const currentSlide = this.model.getCurrentSlide();
        return currentSlide?.slideElements.find(element => element.id === elementId) || null;
    }
}