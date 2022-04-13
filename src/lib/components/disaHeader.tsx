import React from "react";

import "./css/disaHeader.css";
import AppLogo from "../assets/images/app_logo.png";
import CompanyLogo from "../assets/images/company_logo.png";
import { BLUE0NEW } from "../constants";

export const DisaHeader = () => (
    <div className={"p-d-flex p-jc-between p-align-center"} style={{ backgroundColor: BLUE0NEW }}>
        <img id="iav-logo" src={AppLogo} alt="DISA Logo" style={{ padding: "0px", backgroundColor: BLUE0NEW }} />
        <img src={CompanyLogo} alt="Company Logo" style={{ width: "104px", height: "75px" }} />
    </div>
);