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

import React, {useContext} from "react";
import {ColorSettingsContext} from "../../contexts/colorsettings";
import {useTranslator} from "../internationalization/translators";
import "../css/globalColors.css";

export const ImprintText = () => {
  const t = useTranslator();
  const colorSettingsContext = useContext(ColorSettingsContext);

  return (
    <div
      className={
        colorSettingsContext?.darkmode
          ? "bg-grey-6 color-white"
          : "bg-white-1 color-black"
      }
    >
      <p className={"font-bold"}>{t("Imprint")}</p>
      <span>IAV GmbH Ingenieurgesellschaft Auto und Verkehr</span>
      <br />
      <span>Carnotstraße 1</span>
      <br />
      <span>10587 Berlin</span> <br />
      <span>{t("Germany")}</span> <br />
      <br />
      <span>Tel.: +49 30 3997-80</span> <br />
      <span>Fax: +49 30 3997-89926</span> <br />
      <span lang="EN-GB">E-Mail: impressum[at]iav.com</span> <br />
      <span>
        {t("Internet")}:{" "}
        <a
          href="http://www.iav.com"
          className={colorSettingsContext?.darkmode ? "color-blue-3" : ""}
        >
          www.iav.com
        </a>
      </span>{" "}
      <br /> <br />
      <span>{t("Headquarter")}: Berlin</span> <br />
      <span>{t("Register_court")}: Amtsgericht Charlottenburg</span> <br />
      <span>{t("Registration_number")}: HRB 21 280 B</span> <br />
      <span>{t("USt_Ident_Number")}: DE 136647090</span> <br /> <br />
      <span>{t("Managing_directors")}</span> <br />
      <span>Jörg Astalosch ({t("Chairman")})</span> <br />
      <span>Martin Mahlke</span> <br />
      <span>Jens Pfitzinger</span> <br />
      <span>{t("Chairman_supervisory_board")}</span> <br />
      <span>Dr. Nikolai Ardey</span> <br />
    </div>
  );
};
