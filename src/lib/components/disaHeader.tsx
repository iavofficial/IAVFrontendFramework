import React, { ReactElement } from "react";
import "./css/disaHeader.css";
import AppLogo from "../assets/images/app_logo.png";
import CompanyLogo from "../assets/images/company_logo.png";
import { BLUE0 } from "../constants";

interface Props {
    headerOptions?: {
        reactElementRight?: ReactElement;
        reactElementLeft?: ReactElement;
        letteringElementLeft?: string;
        hideLeft?: boolean;
        hideRight?: boolean;
    }
}

const companyLogoDefault = (props: Props) => (
    <img src={ CompanyLogo } alt="Company Logo" style={{ display: (props.headerOptions?.hideRight ? "none" : "flex" ), height: "25px", marginRight: "16px" }}/>
);

const appLogoDefault = (props: Props)=> (
    <div style={{ display: (props.headerOptions?.hideLeft ? "none" : "flex"), alignItems: "center", height: "75px"}}>
          <img id="iav-logo" src={AppLogo} alt="DISA Logo" style={{ height: "40px", width: "125px", marginLeft: "16px", marginRight: "8px", backgroundColor: BLUE0 }} /> 
          <h5 style={{ color: "white", fontSize: "15px"}}>
              {props.headerOptions?.letteringElementLeft ? props.headerOptions.letteringElementLeft : "Remote Service Monitor"}
          </h5> 
    </div>
);

export const DisaHeader = (props: Props) => (
    <div id="disa-header" className={"p-d-flex p-jc-between p-align-center"} style={{ backgroundColor: BLUE0}}>
        <div id="left-element" className={"p-d-flex p-align-center"}>
            {props.headerOptions?.reactElementLeft ? props.headerOptions?.reactElementLeft : appLogoDefault(props)}
        </div>
        <div id="right-element" className="p-d-flex p-jc-end p-align-center">
            { props.headerOptions?.reactElementRight ? props.headerOptions?.reactElementRight : companyLogoDefault(props)}
        </div>
    </div>
);