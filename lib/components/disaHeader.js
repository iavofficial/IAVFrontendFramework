import AppLogo from '../assets/app_logo.png';
import CompanyLogo from '../assets/company_logo.png';
import { BLUE1, BLUE2 } from './constants.js';

const DisaHeader = () => /*#__PURE__*/React.createElement("div", {
  className: "p-d-flex p-jc-between p-align-center",
  style: {
    backgroundColor: BLUE2
  }
}, /*#__PURE__*/React.createElement("img", {
  className: "p-lg-2",
  src: AppLogo,
  alt: "DISA Logo",
  style: {
    padding: "0px",
    backgroundColor: BLUE1
  }
}), /*#__PURE__*/React.createElement("img", {
  src: CompanyLogo,
  alt: "Company Logo",
  style: {
    width: "104px",
    height: "75px"
  }
}));

export default DisaHeader;