import PropTypes from 'prop-types';
import Radium from 'radium';
import { BLUE3 } from './Constants.js';
import { Link } from 'react-router-dom';

const Disatab = (props) => {
    const tabStyle = {
        minHeight: "70px",
        cursor: props.active || props.disabled ? "default" : "pointer",
        backgroundColor: props.active && !props.disabled ? BLUE3 : "white",
        color: props.active && !props.disabled ? "white" : "black",
        opacity: props.disabled ? 0.5 : 1,
        marginBottom: "1px",
        ':hover': {
            backgroundColor: props.disabled? "white" : BLUE3
        }
    }
    const tab = (
        <div className="p-d-flex p-align-center" style={tabStyle}>
            <span className="p-d-flex p-align-center" style={{ "marginLeft": "5%" }}>
                <img src={props.active && !props.disabled ? props.selectedIcon : props.deselectedIcon}></img>
                <span style={{ "fontWeight": "bold" }}>{props.name}</span>
            </span>
        </div>
    );
    return (
        props.disabled ? tab :
            <Link style={{ "textDecoration": "none" }} to={props.to}>
                {tab}
            </Link>
    );
}

Disatab.propTypes = {
    props: PropTypes.object
}

export default Radium(Disatab);