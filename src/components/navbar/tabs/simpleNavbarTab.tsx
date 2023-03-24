import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BLUE3, GRAY2, TAB_HEIGHT } from '../../../constants';
import { useTranslator } from '../../internationalization/translators';
import { navbarTabProps } from './navbarTab';

export const SimpleNavbarTab = (props: navbarTabProps) => {
  const active = useLocation().pathname === props.to;

  const [hovering, setHovering] = useState(false);

  const t = useTranslator();

  const tabStyleDefault = {
    height: TAB_HEIGHT,
    cursor: active || props.disabled ? 'default' : 'pointer',
    backgroundColor: (active || hovering) && !props.disabled ? BLUE3 : 'white',
    color: (active || hovering) && !props.disabled ? 'white' : 'black',
    opacity: props.disabled ? 0.5 : 1,
  };

  const tabStyleCustomized = {
    height: TAB_HEIGHT,
    cursor: active || props.disabled ? 'default' : 'pointer',
    backgroundColor:
      (active || hovering) && !props.disabled
        ? props.colorOptions?.tabHoverBackground
        : props.colorOptions?.tabBackground,
    color:
      (active || hovering) && !props.disabled
        ? props.colorOptions?.tabTextHoverColor
        : props.colorOptions?.tabTextColor,
    opacity: props.disabled ? 0.5 : 1,
  };

  const tab = (
    <div className={'navbar-tab-wrapper ' + (active ? 'active' : '')}>
      <div
        className="navbar-tab"
        style={{ borderColor: GRAY2 }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div
          className="flex align-items-center"
          style={props.colorOptions ? tabStyleCustomized : tabStyleDefault}
        >
          <img
            src={
              (active || hovering) && !props.disabled
                ? props.selectedIcon.valueOf()
                : props.deselectedIcon.valueOf()
            }
            alt=""
          />
          <span id="navbar-tab-name">
            {props.name instanceof Function ? props.name(t) : props.name}
          </span>
        </div>
      </div>
    </div>
  );

  return props.disabled ? (
    tab
  ) : (
    <Link style={{ textDecoration: 'none' }} to={props.to.valueOf()}>
      {tab}
    </Link>
  );
};
