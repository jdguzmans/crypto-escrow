import React from 'react';

import { PropertyRow, PropertyLabel, PropertyValue } from '../styles';

type StateSectionProps = {
    stage: number | null
  }
const StageSection = ({ stage } : StateSectionProps) => {
  const getRenderedValue = (): string => {
    switch (stage) {
      case null: return 'Error';
      case 0: return 'Awaiting Escrow';
      case 1: return 'Awaiting Payment';
      case 2: return 'Awaiting Payment Reception';
      case 3: return 'Complete';
      default: return `Stage not recognized ${stage}`;
    }
  };

  return (
    <PropertyRow>
      <PropertyLabel>
        Stage
      </PropertyLabel>
      <PropertyValue>
        {getRenderedValue()}
      </PropertyValue>
    </PropertyRow>
  );
};

export default StageSection;
