import { BLUE1, BLUE3 } from '../constants.js';
import AppLogo from '../../assets/app_logo.png';
import Bus from "../../assets/bus.png"
import './login.css';
import { Button } from 'primereact/button';

const StandardLoginView = () => (
    <div className="p-d-flex" style={{ height: "100%" }}>
        <div className="p-d-flex p-flex-column p-shadow-10" style={{ width: "750px", margin: "auto" }}>
            <div className={"p-d-flex"} style={{ backgroundColor: BLUE1, color: "white", alignItems: "center" }}>
                <img src={AppLogo} alt={""} />
                <span style={{ fontSize: "xx-large", marginLeft: "auto", marginRight: "20px" }}>LOGIN</span>
            </div>
            <div className="p-d-flex">
                <img src={Bus} style={{ width: "55%", height: "90%" }} alt=""></img>
                <form style={{ width: "45%", height: "100%" }} className="p-mr-4 p-mt-4" onSubmit={() => console.log("")}>
                    <Button label="Login" style={{ border: "none", backgroundColor: BLUE3}} />
                </form>
            </div>
        </div>
    </div>
);

export default StandardLoginView;