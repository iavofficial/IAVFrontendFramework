/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr,
 * All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useContext, useEffect, useMemo, useState} from "react";
import {useCookies} from "react-cookie";
import {ACCEPTED_COOKIES_NAME, BLUE1} from "../../../../constants/constants";
import {ColorSettingsContext} from "../../../../contexts/colorSettingsContext";
import {useModuleTranslation} from "../../../hooks/useModuleTranslation";
import {setAcceptCookies} from "../../../../utils/setAcceptCookies";
import {UICookieBannerProps} from "../../../../types/modules/ui/cookieBanner/cookieBannerModuleInterfaces";
import {UICookieBanner} from "./uiCookieBanner";

type CookieBannerOrchestratorProps = {
  uiComponent?: React.ComponentType<UICookieBannerProps>;
};

export const CookieBannerOrchestrator: React.FC<
  CookieBannerOrchestratorProps
> = ({uiComponent: CustomUI}) => {
  const colorContext = useContext(ColorSettingsContext);
  const t = useModuleTranslation();

  // Keine externen Hooks mehr wie useCookiesAccepted() -> vermeidet "Invalid hook call".
  const [cookies, setCookie] = useCookies([ACCEPTED_COOKIES_NAME]);

  // Sichtbarkeit leitet sich direkt aus dem Cookie ab
  const isAccepted = useMemo(
    () => Boolean(cookies[ACCEPTED_COOKIES_NAME]),
    [cookies],
  );
  const [visible, setVisible] = useState<boolean>(() => !isAccepted);

  // Reagiere auf externe Cookie-Änderungen
  useEffect(() => {
    setVisible(!isAccepted);
  }, [isAccepted]);

  const onAccept = () => {
    setAcceptCookies(setCookie);
    setVisible(false);
  };

  const UI = CustomUI || UICookieBanner;

  const uiProps: UICookieBannerProps = {
    header: t({key: "allow_cookies_header"}),
    message: t({key: "allow_cookies_disclaimer"}),
    acceptButtonLabel: t({key: "allow_cookies_button"}),
    visible,
    onAccept,
    styles: {backgroundColor: colorContext?.darkmode ? "#222" : BLUE1},
    darkMode: colorContext?.darkmode,
  };

  return <UI {...uiProps} />;
};
