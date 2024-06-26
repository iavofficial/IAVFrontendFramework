import React, { useContext } from "react";
import { ColorSettingsContext } from "../../contexts/colorsettings";
import { useTranslator } from "../internationalization/translators";
import "../css/globalColors.css";

export const ImprintText = () => {
  const t = useTranslator();
  const colorSettingsContext = useContext(ColorSettingsContext);

  return (
    <div
      className={
        colorSettingsContext?.darkmode
          ? "bg-grey-5 color-white"
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
      <span>Dr. Uwe Horn</span> <br />
      <span>{t("Chairman_supervisory_board")}</span> <br />
      <span>Dr. Nikolai Ardey</span> <br />
    </div>
  );
};
