import React from 'react';

import { PropertyRow, PropertyLabel, PropertyValue } from '../styles';

type AmountSectionProps = {
    address: string
    title: string
  }
const AddressSection = ({ address, title }: AmountSectionProps) => {
  return (
    <PropertyRow>
      <PropertyLabel>
        {title}
      </PropertyLabel>
      <PropertyValue>
        {address}
      </PropertyValue>
    </PropertyRow>
  );
};

export default AddressSection;
