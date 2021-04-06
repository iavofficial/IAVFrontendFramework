import { Link } from 'react-router-dom';

import { BLUE1, BLUE3 } from '../constants.js';
import AppLogo from '../../assets/app_logo.png';
import Bus from "../../assets/bus.png"
import { Button } from 'primereact/button';

const BasicLoginView = () => (
    <div className="p-d-flex" style={{ height: "100%" }}>
        <div className="p-d-flex p-flex-column p-shadow-10" style={{ width: "750px", margin: "auto" }}>
            <div className={"p-d-flex"} style={{ backgroundColor: BLUE1, color: "white", alignItems: "center" }}>
                <img src={AppLogo} alt={""} />
                <span style={{ fontSize: "xx-large", marginLeft: "auto", marginRight: "20px" }}>LOGIN</span>
            </div>
            <div className="p-d-flex">
                <img src={Bus} style={{ width: "55%", height: "90%" }} alt=""></img>
                <form style={{ width: "45%", height: "100%" }} className="p-mr-4 p-mt-4" onSubmit={() => console.log("")}>
                    <div className={"p-d-flex p-flex-column"}>
                        <input name="email" type="email" className={"p-inputtext"} placeholder="Email address" required autoFocus style={{ marginBottom: "1rem" }} />
                        <input name="password" type="password" className={"p-inputtext"} placeholder="Password" required style={{ marginBottom: "1rem" }} />
                        <div>
                            <Button label="Login" style={{ width: "150px", float: "right", border: "none", backgroundColor: BLUE3 }} />
                        </div>
                    </div>
                </form>
            </div>
            <Link style={{ alignSelf: "center", fontWeight: "bolder", textDecoration: "none", color: "black" }} to="/imprint">Imprint</Link>
            <span style={{ alignSelf: "center" }}>&copy; IAV GmbH 2020</span>
        </div>
    </div>
);

export default BasicLoginView;