import React from "react";

import "./css/disaHeader.css";
import AppLogo from "../assets/app_logo.png";
import CompanyLogo from "../assets/company_logo.png";
import { BLUE4, BLUE5 } from "../constants";

export const DisaHeader = () => (
    <div className={"p-d-flex p-jc-between p-align-center"} style={{ backgroundColor: BLUE5 }}>
        <img id="iav-logo" src={AppLogo} alt="DISA Logo" style={{ padding: "0px", backgroundColor: BLUE4 }} />
        <img src={CompanyLogo} alt="Company Logo" style={{ width: "104px", height: "75px" }} />
    </div>
);