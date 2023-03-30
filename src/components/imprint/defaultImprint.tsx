import React from 'react';
import { ImprintText } from './imprintText';

export const DefaultImprint = () => {
  return (
    <div
      className="p-d-flex"
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ImprintText />
    </div>
  );
};
