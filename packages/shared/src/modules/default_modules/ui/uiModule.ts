import {HeaderOrchestrator} from "./header/headerOrchestrator";
import {ContentWithBarOrchestrator} from "./contentWithBar/contentWithBarOrchestrator";
import {CookieBannerOrchestrator} from "./cookieBanner/cookieBannerOrchestrator";
import {UIModule} from "../../../types/modules/ui/uiModuleInterfaces";
import {NavbarOrchestrator} from "./navbar/navbarOrchestrator";

export class DefaultUIModule implements UIModule {
  public UiLayerHeader;
  public UiLayerContentWithBar;
  public UiLayerCookieBanner;
  public UiNavbar;

  constructor() {
    this.UiLayerHeader = HeaderOrchestrator;
    this.UiLayerContentWithBar = ContentWithBarOrchestrator;
    this.UiLayerCookieBanner = CookieBannerOrchestrator;
    this.UiNavbar = NavbarOrchestrator;
  }
}
