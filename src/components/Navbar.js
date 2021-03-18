import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = (props) => {
    let location = useLocation();
    return (
        <div className="p-d-flex p-dir-col p-lg-2" style={{ "padding": "0px" }}>
            {React.Children.map(props.children, (child) =>
                React.cloneElement(child, { active: location.pathname === child.props.to })
            )}
        </div>
    );
};

export default Navbar;