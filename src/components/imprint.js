import React from "react";

const Imprint = () => (
    <div className="p-d-flex" style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
            <h5>Impressum</h5>
            <span>IAV GmbH Ingenieurgesellschaft Auto und Verkehr</span><br />
            <span>Carnotstraße 1</span><br />
            <span>10587 Berlin</span> <br />
            <span>Deutschland</span> <br /><br />
            <span>Tel.: +49 30 3997-80</span> <br />
            <span>Fax: +49 30 3997-89926</span> <br />
            <span lang="EN-GB">E-Mail: impressum[at]iav.com</span> <br />

            <span>Internet: <a
                href="http://www.iav.com">www.iav.com</a></span> <br /> <br />

            <span>Sitz: Berlin</span> <br />
            <span>Registergericht: Amtsgericht Charlottenburg</span> <br />
            <span>Registernummer: HRB 21 280</span> <br />
            <span>USt-Ident-Nummer: DE 136647090</span> <br /> <br />

            <span>Geschäftsführer</span> <br />
            <span>Matthias Kratzsch (Vorsitzender)</span> <br />
            <span>Katja Ziegler</span> <br />
            <span>Dr. Uwe Horn</span> <br /> <br />
            <span>Vorsitzender des Aufsichtsrates</span> <br />
            <span>Dr. Nikolai Ardey</span> <br />
        </div>
    </div>
);

export default Imprint;