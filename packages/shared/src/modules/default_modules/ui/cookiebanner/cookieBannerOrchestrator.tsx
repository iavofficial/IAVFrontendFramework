import React, {useContext, useState} from "react";
import {useCookies} from "react-cookie";
import {ACCEPTED_COOKIES_NAME, BLUE1} from "../../../../constants/constants";
import {MandatoryModuleNames} from "../../../../constants/moduleNames";
import {ColorSettingsContext} from "../../../../contexts/colorSettingsContext";
import {useModule} from "../../../../contexts/moduleContext";
import {
  CookieBannerModule,
  UICookieBannerProps,
} from "../../../../types/modules/ui/uiModuleInterfaces";
import {useModuleTranslation} from "../../../hooks/useModuleTranslation";
import {useCookiesAccepted} from "../../../../utils/cookieHooks";
import {setAcceptCookies} from "../../../../utils/setAcceptCookies";
import {UICookieBanner} from "../../cookie/uiCookieBanner";

type CookieBannerOrchestratorProps = {
  uiComponent?: React.ComponentType<UICookieBannerProps>;
};

export const CookieBannerOrchestrator: React.FC<
  CookieBannerOrchestratorProps
> = ({uiComponent: CustomUI}) => {
  const colorContext = useContext(ColorSettingsContext);
  const t = useModuleTranslation();

  const [visible, setVisible] = useState(!useCookiesAccepted());

  const [, setCookie] = useCookies([ACCEPTED_COOKIES_NAME]);

  const acceptCookies = () => {
    setAcceptCookies(setCookie);
    setVisible(false);
  };

  const UI = CustomUI || UICookieBanner;

  // Supply all required UI props
  const uiProps: UICookieBannerProps = {
    header: t({key: "allow_cookies_header"}),
    message: t({key: "allow_cookies_disclaimer"}),
    acceptButtonLabel: t({key: "allow_cookies_button"}),
    visible,
    onAccept: acceptCookies,
    styles: {backgroundColor: colorContext?.darkmode ? "#222" : BLUE1},
    darkMode: colorContext.darkmode,
  };

  return <UI {...uiProps} />;
};
