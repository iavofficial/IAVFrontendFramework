import React from 'react';
import { BLUE0, WHITE } from '../../../constants';

export interface Props {
  navbarCollabsed: boolean;
  firstLayerCollabsed: boolean;
  secondLayerCollabsed: boolean;
  lastElementFirstLayer?: boolean;
  lastElementSecondLayer?: boolean;
}

export const SpaceBetweenElement = (props: Props) => {
  let styleElementFirstLayer = {
    width: '2px',
    height: '100%',
    backgroundColor: props.firstLayerCollabsed ? BLUE0 : WHITE,
    marginRight: '3px',
  };

  let styleElementSecondLayer = {
    width: '2px',
    height: '100%',
    backgroundColor: props.secondLayerCollabsed ? BLUE0 : WHITE,
  };

  let returnElement = (
    <>
      {' '}
      <div style={styleElementFirstLayer} />
      <div style={styleElementSecondLayer} />
    </>
  );

  if (props.lastElementSecondLayer && props.lastElementSecondLayer) {
    returnElement = (
      <>
        {' '}
        <div style={styleElementFirstLayer} />
      </>
    );
  }
  if (props.lastElementFirstLayer && props.lastElementFirstLayer) {
    returnElement = <></>;
  }
  return (
    <div
      className="flex justify-content-start"
      style={{
        width: props.navbarCollabsed ? '40px' : '240px',
        height: '16px',
        paddingLeft: '2px',
      }}
    >
      {returnElement}
    </div>
  );
};
