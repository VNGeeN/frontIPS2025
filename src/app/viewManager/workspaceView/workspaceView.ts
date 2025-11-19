import { PresentationModel } from "../../presentationModel/presentationModel";
import { Slide, SlideBackground, SlideElement, TextType, ImageType } from "../../../presentation/types/type";

export class WorkspaceView {
    private container: HTMLElement;
    private slideContainer: HTMLElement;

    constructor(private model: PresentationModel) {
        this.container = document.createElement('div');
        this.container.className = 'workspace';
        this.slideContainer = document.createElement('div');
        this.slideContainer.className = 'slide-container';
    }

    render(): void {
        this.container.innerHTML = '';
        this.slideContainer.innerHTML = '';

        const currentSlide = this.model.getCurrentSlide();
        if (currentSlide) {
            this.renderSlide(currentSlide);
        }

        this.container.appendChild(this.slideContainer);
        document.body.appendChild(this.container);
    }

    private renderSlide(slide: Slide): void {
        // Установка размера слайда
        this.slideContainer.style.width = `${this.model.getPresentation().size.width}px`;
        this.slideContainer.style.height = `${this.model.getPresentation().size.height}px`;

        // Рендер фона
        this.renderBackground(slide.background);

        // Рендер элементов
        slide.slideElements.forEach(element => {
            const elementDiv = this.createElementDiv(element);
            this.slideContainer.appendChild(elementDiv);
        });
    }

    private renderBackground(background: SlideBackground): void {
        if (background.type === BackgroundType.COLOR) {
            this.slideContainer.style.backgroundColor = background.color;
        } else if (background.type === BackgroundType.IMAGE) {
            this.slideContainer.style.backgroundImage = `url(${background.src})`;
            this.slideContainer.style.backgroundSize = 'cover';
        }
    }

    private createElementDiv(element: SlideElement): HTMLElement {
        const div = document.createElement('div');
        div.dataset.elementId = element.id;
        div.className = 'slide-element';

        // Базовые стили для всех элементов
        div.style.position = 'absolute';
        div.style.left = `${element.x}px`;
        div.style.top = `${element.y}px`;
        div.style.width = `${element.width}px`;
        div.style.height = `${element.height}px`;
        div.style.border = '1px dashed #ccc';
        div.style.cursor = 'pointer';

        // Стилизация в зависимости от типа элемента
        if (element.type === ElementType.TEXT) {
            this.styleTextElement(div, element as TextType);
        } else if (element.type === ElementType.IMAGE) {
            this.styleImageElement(div, element as ImageType);
        }

        return div;
    }

    private styleTextElement(div: HTMLElement, textElement: TextType): void {
        div.textContent = textElement.value;
        div.style.fontFamily = textElement.fontFamily;
        div.style.fontSize = textElement.fontSize;
        div.style.fontWeight = textElement.fontWeight;
        div.style.color = textElement.color;
        div.style.backgroundColor = 'transparent';
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        div.style.overflow = 'hidden';
    }

    private styleImageElement(div: HTMLElement, imageElement: ImageType): void {
        div.style.backgroundImage = `url(${imageElement.src})`;
        div.style.backgroundSize = 'cover';
        div.style.backgroundPosition = 'center';
    }

    update(): void {
        this.render();
    }
}