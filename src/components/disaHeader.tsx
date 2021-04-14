import React from "react";
import AppLogo from "../assets/app_logo.png";
import CompanyLogo from "../assets/company_logo.png";
import { BLUE4, BLUE5 } from "./constants";

const DisaHeader = () => (
    <div className={"p-d-flex p-jc-between p-align-center"} style={{ backgroundColor: BLUE5 }}>
        <img className={"p-lg-2"} src={AppLogo} alt="DISA Logo" style={{ padding: "0px", backgroundColor: BLUE4 }} />
        <img src={CompanyLogo} alt="Company Logo" style={{ width: "104px", height: "75px" }} />
    </div>
);

export default DisaHeader;