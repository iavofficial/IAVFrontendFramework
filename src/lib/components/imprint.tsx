import React, { useContext } from "react";
import { LanguageContext } from "../contexts/language";

export const Imprint = () => {
    const langContext = useContext(LanguageContext);
    return (
        <div className="p-d-flex" style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
                <h5>Impressum</h5>
                <span>IAV GmbH Ingenieurgesellschaft Auto und Verkehr</span><br />
                <span>Carnotstraße 1</span><br />
                <span>10587 Berlin</span> <br />
                <span>{langContext?.useCustomTranslation("Germany")}</span> <br /><br />
                <span>Tel.: +49 30 3997-80</span> <br />
                <span>Fax: +49 30 3997-89926</span> <br />
                <span lang="EN-GB">E-Mail: impressum[at]iav.com</span> <br />

                <span>{langContext?.useCustomTranslation("Internet")}: <a
                    href="http://www.iav.com">www.iav.com</a></span> <br /> <br />

                <span>{langContext?.useCustomTranslation("Headquarter")}: Berlin</span> <br />
                <span>{langContext?.useCustomTranslation("Register_court")}: Amtsgericht Charlottenburg</span> <br />
                <span>{langContext?.useCustomTranslation("Registration_number")}: HRB 21 280</span> <br />
                <span>{langContext?.useCustomTranslation("USt_Ident_Number")}: DE 136647090</span> <br /> <br />

                <span>{langContext?.useCustomTranslation("Managing_directors")}</span> <br />
                <span>Matthias Kratzsch ({langContext?.useCustomTranslation("Chairman")})</span> <br />
                <span>Katja Ziegler</span> <br />
                <span>Dr. Uwe Horn</span> <br /> <br />
                <span>{langContext?.useCustomTranslation("Chairman_supervisory_board")}</span> <br />
                <span>Dr. Nikolai Ardey</span> <br />
            </div>
        </div>
    );
};