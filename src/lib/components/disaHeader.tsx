import React from "react";

import "./css/disaHeader.css";
import AppLogo from "../assets/images/app_logo.png";
import CompanyLogo from "../assets/images/company_logo.png";
import { BLUE0NEW } from "../constants";


interface Props {
    headerOptions?: {
        leftSrc?: string;
        rightSrc?: string;
        hideLeft?: boolean;
        hideRight?: boolean;
    }
 
}


export const DisaHeader = (props: Props) => {

    return(
    <div className={"p-d-flex p-jc-between p-align-center"} style={{ backgroundColor: BLUE0NEW }}>
        <img id="iav-logo" src={AppLogo} alt="DISA Logo" style={{ padding: "0px", backgroundColor: BLUE0NEW }} />
        <img src={ props.headerOptions?.rightSrc ? props.headerOptions.rightSrc : CompanyLogo  } alt="Company Logo" style={{ display: (props.headerOptions?.hideRight ? "none" : "flex" ) ,width: "104px", height: "75px", marginRight: "16px" }} />
    </div>)
};