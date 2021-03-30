import { GRAY1 } from './constants.js';

const ContentBorder = props => /*#__PURE__*/React.createElement("div", {
  className: "p-d-flex p-flex-column",
  style: {
    height: "100%"
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    height: "100%",
    borderStyle: "solid",
    borderWidth: "15px 0px 0px 15px",
    borderColor: GRAY1
  }
}, props.children));

export default ContentBorder;