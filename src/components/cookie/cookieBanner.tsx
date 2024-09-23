/**
 * Copyright © 2024 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useContext, useState} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {useCookies} from "react-cookie";
import {
  ACCEPTED_COOKIES_NAME,
  BLACK,
  BLUE1,
  GREY1,
  GREY2,
  GREY5,
  GREY6,
  WHITE,
} from "../../constants";
import {useCookiesAccepted} from "./cookieHooks";
import {useTranslator} from "../internationalization/translators";
import {setAcceptCookies} from "../../utils/setAcceptCookies";
import {ColorSettingsContext} from "../../contexts/colorsettings";
import makeStyles from "../content/style_options/makeStyles";

const useStyles = makeStyles(({darkMode}: {darkMode: boolean}) => ({
  dialog: {
    borderRadius: "4px",
    border: `1px solid ${darkMode ? GREY5 : GREY2}`,
    "& .p-dialog-header": {
      backgroundColor: darkMode ? BLACK : GREY1,
      color: darkMode ? GREY1 : GREY5,
      borderBottom: `1px solid ${darkMode ? GREY5 : GREY2}`,
    },
    "& .p-dialog-content": {
      backgroundColor: darkMode ? GREY6 : WHITE,
      color: darkMode ? GREY1 : GREY5,
    },
    "& .p-dialog-footer": {
      backgroundColor: darkMode ? BLACK : GREY1,
      borderTop: `1px solid ${darkMode ? GREY5 : GREY2}`,
    },
  },
}));

export const CookieBanner = () => {
  const colorContext = useContext(ColorSettingsContext);

  const {classes} = useStyles({darkMode: colorContext.darkmode});

  const [visible, setVisible] = useState(!useCookiesAccepted());

  const t = useTranslator();
  const [, setCookie] = useCookies([ACCEPTED_COOKIES_NAME]);

  const acceptCookies = () => {
    setAcceptCookies(setCookie);
    setVisible(false);
  };

  // Dialog has to have the onHide property. Otherwise the typescript compiler will throw an error.
  return (
    <Dialog
      className={classes.dialog}
      header={t("allow_cookies_header")}
      position={"bottom"}
      visible={visible}
      modal
      dismissableMask={false}
      closable={false}
      onHide={() => ""}
      footer={
        <div style={{display: "flex", justifyContent: "flex-end"}}>
          <Button
            icon="pi pi-check"
            label={t("allow_cookies_button")}
            onClick={acceptCookies}
            style={{backgroundColor: BLUE1, border: "none"}}
          />
        </div>
      }
    >
      <div style={{display: "flex", alignItems: "center"}}>
        <span
          className={"pi pi-info-circle"}
          style={{marginRight: "10px", fontSize: "xx-large"}}
        />
        <span>{t("allow_cookies_disclaimer")}</span>
      </div>
    </Dialog>
  );
};
