import { TitleView } from "../titleView/titleView";
import { WorkspaceView } from "../workspaceView/workspaceView";
import { ToolbarView } from "../toolbarView/toolbarView";

export class ViewManager {
    private titleView: TitleView;
    private workspaceView: WorkspaceView;
    private slidesListView: SlidesListView;
    private toolbarView: ToolbarView;
    
    constructor(private model: PresentationModel, private eventManager: EventManager) {
        this.initializeViews();
        this.setupModelListeners();
    }
    
    private initializeViews(): void {
        this.titleView = new TitleView(this.model);
        this.workspaceView = new WorkspaceView(this.model);
        this.slidesListView = new SlidesListView(this.model);
        this.toolbarView = new ToolbarView(this.model);
    }
    
    private setupModelListeners(): void {
        this.eventManager.subscribe(EventType.MODEL_UPDATE, () => {
            this.update();
        });
    }
    
    render(): void {
        this.titleView.render();
        this.workspaceView.render();
        this.slidesListView.render();
        this.toolbarView.render();
    }
    
    update(): void {
        this.titleView.update();
        this.workspaceView.update();
        this.slidesListView.update();
        this.toolbarView.update();
    }
}