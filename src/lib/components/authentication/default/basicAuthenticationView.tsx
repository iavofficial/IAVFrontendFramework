import React, { ReactElement } from "react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { BLUE0 } from "../../../constants";
import AppLogo from "../../../assets/images/app_logo.png";
import { AuthContext } from "../../../contexts/auth";
import { LoginButtonWithSpinner } from "../loginButtonWithSpinner";
import { useContext } from "react";
import { useTranslator } from "../../internationalization/translators";
import { AuthenticationViewProps } from "../aws/authenticationView";

interface Props {
    headerOptions?: {
        reactElementRight?: ReactElement;
        reactElementLeft?: ReactElement;
        letteringElementLeft?: string;
        hideLeft?: boolean;
        hideRight?: boolean;
    }
}

export const BasicAuthenticationView = (props: AuthenticationViewProps, propsHeaderOptions: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const authContext = useContext(AuthContext);
    const t = useTranslator();

    // These two functions life on the class instance not on the prototype thanks to @babel/plugin-proposal-class-properties.
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        authContext?.login({ email: email, password: password });
    }

    return (
        <div className="p-d-flex" style={{ height: "100%" }}>
            <div className="p-d-flex p-flex-column p-shadow-10" style={{ width: "500px", margin: "auto" }}>
                <div className={"p-d-flex"} style={{ backgroundColor: BLUE0, color: "white", alignItems: "center", height: "75px"}}>
                    <div style={{ display: (propsHeaderOptions.headerOptions?.hideLeft ? "none" : "flex"), alignItems: "center", height: "75px", width: "271px"}}>
                        <img id="iav-logo" src={AppLogo} alt="DISA Logo" style={{ height: "40px", width: "125px", marginLeft: "16px", marginRight: "8px", backgroundColor: BLUE0 }} /> 
                        <h5 style={{ color: "white", fontSize: "15px"}}>
                            {propsHeaderOptions.headerOptions?.letteringElementLeft ? propsHeaderOptions.headerOptions.letteringElementLeft : "Remote Service Monitor"}
                        </h5> 
                    </div>
                    <span style={{ fontSize: "30px", marginLeft: "auto", marginRight: "20px" }}>LOGIN</span>
                </div>
                <div className="p-d-flex" style={{ justifyContent: "center", marginBottom: "30px" }}>
                    <form style={{ width: "85%", height: "100%" }} className="p-mr-4 p-mt-4" onSubmit={submit}>
                        <div className={"p-d-flex p-flex-column"}>
                            <label className="inputLabel">{t("Email_address")}</label>
                            <input value={email.valueOf()} onChange={(ev) => setEmail(ev.target.value)} name="email" type="email"
                                className={"p-inputtext"} placeholder={t("Email_address")} required autoFocus style={{ marginBottom: "1rem" }} />
                            <label className="inputLabel">{t("Password")}</label>
                            <input value={password.valueOf()} onChange={(ev) => setPassword(ev.target.value)} name="password" type="password"
                                className={"p-inputtext"} placeholder={t("Password")} required style={{ marginBottom: "1rem" }} />
                            <div>
                                <LoginButtonWithSpinner isLoading={authContext?.isLoading} />
                            </div>
                        </div>
                    </form>
                </div>
                <Link style={{ alignSelf: "center", fontWeight: "bolder", color: "black" }} to="/documents" target="_blank">
                    {
                        t(props.documentsLabelKey ? props.documentsLabelKey : "Imprint")
                    }
                </Link>
                <span style={{ padding: "10px", alignSelf: "center" }}>&copy; IAV GmbH 2021</span>
            </div>
        </div >
    );
};