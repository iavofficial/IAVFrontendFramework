import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useCookies } from "react-cookie";
import { BLUE1 } from "../../constants";
import { ACCEPTED_COOKIES_NAME } from "../../constants";
import { useCookiesAccepted } from "./cookieHooks";
import { useTranslator } from "../internationalization/translators";
import { setAcceptCookies } from "../../utils/setAcceptCookies";

export const CookieBanner = () => {
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
      header={t("allow_cookies_header")}
      position={"bottom"}
      visible={visible}
      modal
      dismissableMask={false}
      closable={false}
      onHide={() => ""}
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            icon="pi pi-check"
            label={t("allow_cookies_button")}
            onClick={acceptCookies}
            style={{ backgroundColor: BLUE1, border: "none" }}
          />
        </div>
      }
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          className={"pi pi-info-circle"}
          style={{ marginRight: "10px", fontSize: "xx-large", color: "black" }}
        />
        <span>{t("allow_cookies_disclaimer")}</span>
      </div>
    </Dialog>
  );
};
