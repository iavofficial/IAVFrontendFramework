import React, { useState } from 'react';

export const useSelectedId = () => {
  const [selectedId, setSelectedId] = useState('');

  return {
    selectedId,
    setSelectedId,
  };
};
