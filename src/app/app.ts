import { PresentationModel } from "./presentationModel/presentationModel";
import { ViewManager } from "./viewManager/viewManager/viewManager";
import { EventManager } from "./eventManager/eventManager";
import { EventType } from "./types/eventTypes";

export class App {
    private model: PresentationModel;
    private viewManager: ViewManager;
    private eventManager: EventManager;
    
    constructor() {
        this.model = new PresentationModel(maximalTestData);
        this.viewManager = new ViewManager(this.model);
        this.eventManager = new EventManager(this.model, this.viewManager);
        this.init();
    }
    
    private init(): void {
        this.viewManager.render();
        this.eventManager.bindEvents();
        this.setupEventListeners();
    }
    
    private setupEventListeners(): void {
        // Подписка на события от EventManager
        this.eventManager.subscribe(EventType.TITLE_CHANGE, (event: AppEvent) => {
            console.log(`Новое название: ${event.data}`);
        });
        
        this.eventManager.subscribe(EventType.SLIDE_CLICK, (event: AppEvent) => {
            console.log(`Slide ID: ${event.data.slideId}, Slide Index: ${event.data.slideIndex}`);
        });
        
        this.eventManager.subscribe(EventType.ELEMENT_CLICK, (event: AppEvent) => {
            console.log(`Element ID: ${event.data.elementId}, Background Color: ${event.data.backgroundColor}`);
        });
        
        this.eventManager.subscribe(EventType.TOOLBAR_ACTION, (event: AppEvent) => {
            console.log(`Action: ${event.data.action}`);
        });
    }
}