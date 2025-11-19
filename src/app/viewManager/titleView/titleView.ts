import { PresentationModel } from "../../presentationModel/presentationModel";

export class TitleView {
    private container: HTMLElement;
    private input: HTMLInputElement;
    
    constructor(private model: PresentationModel) {
        this.container = document.createElement('div');
        this.input = document.createElement('input');
    }
    
    render(): void {
        this.input.value = this.model.getTitle();
        this.input.addEventListener('input', () => {
            this.model.setTitle(this.input.value);
            console.log(`Новое название: ${this.input.value}`);
        });
        
        this.container.appendChild(this.input);
        document.body.appendChild(this.container);
    }
    
    update(): void {
        this.input.value = this.model.getTitle();
    }
}