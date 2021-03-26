import PropTypes from 'prop-types';
import Radium from 'radium';
import { Link } from 'react-router-dom';

import { BLUE3, GRAY2, DISATABHEIGHT } from './constants.js';

const NavbarTab = (props) => {
    const tabStyle = {
        height: DISATABHEIGHT,
        cursor: props.active || props.disabled ? "default" : "pointer",
        backgroundColor: props.active && !props.disabled ? BLUE3 : "white",
        color: props.active && !props.disabled ? "white" : "black",
        opacity: props.disabled ? 0.5 : 1,
        ':hover': {
            backgroundColor: props.disabled ? "white" : BLUE3
        }
    }
    const tab = (
        <div style={{ borderStyle: "solid", borderWidth: "0px 0px 1px 0px", borderColor: GRAY2 }}>
            <div className="p-d-flex p-align-center" style={tabStyle}>
                <img src={props.active && !props.disabled ? props.selectedIcon : props.deselectedIcon} style={{ marginLeft: "5%" }} alt="" />
                <span style={{ fontWeight: "bold" }}>{props.name}</span>
            </div>
        </div>
    );
    return (
        props.disabled ? tab :
            <Link style={{ textDecoration: "none" }} to={props.to}>
                {tab}
            </Link>
    );
}

NavbarTab.propTypes = {
    name: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    selectedIcon: PropTypes.string.isRequired,
    deselectedIcon: PropTypes.string.isRequired
}

export default Radium(NavbarTab);