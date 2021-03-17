import AppLogo from '../assets/app_logo.png'
import CompanyLogo from '../assets/company_logo.png'
import { BLUE1, BLUE2 } from './Constants.js';

const DisaHeader = () => (
    <div className={"p-d-flex p-jc-between"} style={{ "backgroundColor": BLUE2}}>
        <img src={AppLogo} alt="DISA Logo" style={{ "backgroundColor": BLUE1 }} />
        <img src={CompanyLogo} alt="Company Logo" />
    </div>
);

export default DisaHeader;