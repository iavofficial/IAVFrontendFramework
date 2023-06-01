import { useState } from 'react';
import { BLUE3, GREY2, WHITE } from 'disa-framework/constants';

interface Props {
  selected: boolean;
  title: string;
  identifier: string;
  onSelect: (identifier: string) => void;
}

/**
 * Element used for elements to enable selection in the content bar
 * @param props
 */
export const ContentSelectionElement = (props: Props) => {
  const [hovering, setHovering] = useState(false);

  const tabStyle = {
    cursor: props.selected ? 'default' : 'pointer',
    backgroundColor: props.selected || hovering ? BLUE3 : GREY2,
    color: WHITE,
    height: '40px',
    width: '280px',
    alignItems: 'center',
    borderRight: '1px solid ' + WHITE,
  };

  const title = props.title;

  return (
    <div
      className={'flex align-items-center justify-content-center'}
      style={tabStyle}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => {
        if (!props.selected) {
          props.onSelect(props.identifier);
        }
      }}
    >
      <i className="pi pi-bell" />
      <div className={'p-m-auto p-text-bold'}>{title}</div>
    </div>
  );
};
