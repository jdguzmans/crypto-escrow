import React from 'react';
import { BigNumber, ethers } from 'ethers';

import { PropertyRow, PropertyLabel, PropertyValue } from '../styles';

type AmountSectionProps = {
    amount: BigNumber | null
  }
const AmountSection = ({ amount }: AmountSectionProps) => {
  if (amount === null) return null;
  return (
    <PropertyRow>
      <PropertyLabel>
        Amount (ETH)
      </PropertyLabel>
      <PropertyValue>
        {ethers.utils.formatEther(amount)}
      </PropertyValue>
    </PropertyRow>
  );
};

export default AmountSection;
