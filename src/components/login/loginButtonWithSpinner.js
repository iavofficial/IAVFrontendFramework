import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { BLUE1 } from "../constants";
// props.isLoading
const LoginButtonWithSpinner = props => (
    <>
        {
            (() => {
                let test = props.isLoading && <ProgressSpinner style={{ height: "40px", width: "40px", float: "left" }} />;
                console.log(test);
            })()
        }
        {props.isLoading && <ProgressSpinner style={{ height: "40px", width: "40px", float: "left" }} />}
        <Button label="Login" style={{ width: "150px", float: "right", border: "none", backgroundColor: BLUE1 }} />
    </>
)

export default LoginButtonWithSpinner;