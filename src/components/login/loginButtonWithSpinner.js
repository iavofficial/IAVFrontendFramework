import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { BLUE1 } from "../constants";
// props.isLoading
const LoginButtonWithSpinner = props => (
    <>
        {props.isLoading && <ProgressSpinner style={{ height: "30px", width: "30px", float: "left" }} />}
        <Button label="Login" style={{ width: "150px", float: "right", border: "none", backgroundColor: BLUE1 }} />
    </>
)

export default LoginButtonWithSpinner;