import {
    Presentation,
    SlideCollection,
    Slide,
    SlideElement,
    TextType,
    ImageType,
    Size,
    Position,
    SelectionState,
    SlideBackground,
    BackgroundImage,
    BackgroundColor
} from '../../presentation/types/type';

import { EventManager } from '../eventManager/eventManager';
import { EventType } from "../types/eventTypes";
import { ActionType } from "../types/actionTypes";

export class PresentationModel {
    private presentation: Presentation;
    private eventManager: EventManager;

    constructor(initialData: Presentation, eventManager: EventManager) {
        this.presentation = initialData;
        this.eventManager = eventManager;
    }

    // Геттеры
    getTitle(): string {
        return this.presentation.title;
    }

    getSlides(): Slide[] {
        return this.presentation.slideCollection.slides;
    }

    getCurrentSlide(): Slide | null {
        const currentSlideId = this.presentation.state.currentSlide;
        return currentSlideId ? this.getSlideById(currentSlideId) : null;
    }

    getSlideById(slideId: string): Slide | null {
        return this.presentation.slideCollection.slides.find(slide => slide.id === slideId) || null;
    }

    // Сеттеры с событиями
    setTitle(title: string): void {
        this.presentation = {
            ...this.presentation,
            title
        };
        this.eventManager.dispatch({
            type: EventType.TITLE_CHANGE,
            data: title
        });
        this.notifyUpdate();
    }

    setCurrentSlide(slideId: string): void {
        this.presentation = {
            ...this.presentation,
            state: {
                ...this.presentation.state,
                currentSlide: slideId,
                selectedSlides: [slideId]
            }
        };
        this.notifyUpdate();
    }

    // Бизнес-методы с Enum
    executeAction(actionType: ActionType, data?: any): void {
        switch (actionType) {
            case ActionType.ADD_SLIDE:
                this.addSlide(data);
                break;
            case ActionType.DELETE_SLIDE:
                this.deleteSlide(data);
                break;
            case ActionType.MOVE_SLIDE:
                this.moveSlide(data);
                break;
            case ActionType.ADD_TEXT_ELEMENT:
                this.addTextElement(data);
                break;
            case ActionType.ADD_IMAGE_ELEMENT:
                this.addImageElement(data);
                break;
            case ActionType.DELETE_ELEMENT:
                this.deleteElement(data);
                break;
            // ... другие действия
        }

        this.eventManager.dispatch({
            type: EventType.TOOLBAR_ACTION,
            data: { action: ActionType[actionType] }
        });
    }

    private addSlide(slideData: Partial<Slide>): void {
        const newSlide: Slide = {
            id: `slide-${Date.now()}`,
            slideElements: [],
            background: { type: BackgroundType.COLOR, color: "#ffffff" },
            ...slideData
        };

        // Логика добавления слайда
        this.notifyUpdate();
    }

    private addTextElement(elementData: Omit<TextType, 'id'>): void {
        const newElement: TextType = {
            id: `text-${Date.now()}`,
            type: ElementType.TEXT,
            fontWeight: FontWeight.NORMAL,
            ...elementData
        };

        // Логика добавления текстового элемента
        this.notifyUpdate();
    }

    private notifyUpdate(): void {
        this.eventManager.dispatch({
            type: EventType.MODEL_UPDATE,
            data: this.presentation
        });
    }
}