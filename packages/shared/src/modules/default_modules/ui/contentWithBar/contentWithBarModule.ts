import { ContentWithBarModule } from "../../../../types/modules/ui/contentWithBar/contentWIthBarModuleInterfaces";
import { ContentWithBarOrchestrator } from "./contentWithBarOrchestrator";



export class DefaultContentWithBarModule implements ContentWithBarModule {
  UiLayerContentWithBar = ContentWithBarOrchestrator;
}