import { PresentationModel } from "../../presentationModel/presentationModel";
import { ActionType } from "../../types/actionTypes";

export class ToolbarView {
    private container: HTMLElement;
    
    constructor(private model: PresentationModel) {
        this.container = document.createElement('div');
        this.container.className = 'toolbar';
    }
    
    render(): void {
        const actions = [
            { 
                action: ActionType.ADD_SLIDE, 
                label: 'Добавить слайд',
                icon: '➕'
            },
            { 
                action: ActionType.DELETE_SLIDE, 
                label: 'Удалить слайд',
                icon: '❌'
            },
            { 
                action: ActionType.ADD_TEXT_ELEMENT, 
                label: 'Добавить текст',
                icon: '📝'
            },
            { 
                action: ActionType.ADD_IMAGE_ELEMENT, 
                label: 'Добавить изображение',
                icon: '🖼️'
            },
            { 
                action: ActionType.CHANGE_FONT_SIZE, 
                label: 'Изменить размер шрифта',
                icon: '🔡'
            },
            { 
                action: ActionType.CHANGE_FONT_FAMILY, 
                label: 'Изменить шрифт',
                icon: '✒️'
            },
            { 
                action: ActionType.CHANGE_BACKGROUND, 
                label: 'Изменить фон',
                icon: '🎨'
            }
        ];
        
        this.container.innerHTML = '';
        
        actions.forEach(({ action, label, icon }) => {
            const button = this.createToolbarButton(action, label, icon);
            this.container.appendChild(button);
        });
        
        document.body.appendChild(this.container);
    }
    
    private createToolbarButton(action: ActionType, label: string, icon: string): HTMLButtonElement {
        const button = document.createElement('button');
        button.innerHTML = `${icon} ${label}`;
        button.dataset.action = action;
        button.title = label;
        
        return button;
    }
    
    update(): void {
        // Обновление состояния кнопок в зависимости от текущего состояния модели
        const currentSlide = this.model.getCurrentSlide();
        const deleteButton = this.container.querySelector(`[data-action="${ActionType.DELETE_SLIDE}"]`) as HTMLButtonElement;
        
        if (deleteButton) {
            deleteButton.disabled = !currentSlide;
        }
    }
}