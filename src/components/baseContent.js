import PropTypes from 'prop-types';
import { DISATABHEIGHT, GRAY1 } from './constants.js'

const BaseContent = (props) => (
    <div className="p-d-flex p-flex-column" style={{ height: "100%" }}>
        <div className="p-d-flex" style={{ minHeight: DISATABHEIGHT }}>
            {props.tabs}
        </div>
        <div style={{ height: "100%", borderStyle: "solid", borderWidth: "15px 0px 0px 15px", borderColor: GRAY1 }}>
            {props.children}
        </div>
    </div>
);

BaseContent.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.object),
    children: PropTypes.arrayOf(PropTypes.object)
}

export default BaseContent;