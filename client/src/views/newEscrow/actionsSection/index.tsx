/* eslint-disable no-nested-ternary */
import React from 'react';

import {
  ActionsContainer, SubmitButton, TextSection,
} from './styles';

type ActionsSectionProps = {
    isDeploying: boolean
    errorMessage: string | null
    onSubmit: () => Promise<void>
}

const ActionsSection = ({ isDeploying, errorMessage, onSubmit }: ActionsSectionProps) => {
  return (
    <ActionsContainer>
      <SubmitButton
        disabled={isDeploying}
        type="button"
        onClick={onSubmit}
      >
        Submit
      </SubmitButton>
      <TextSection>
        {isDeploying ? 'Deploying...' : errorMessage !== null ? `Error: ${errorMessage}` : null}
      </TextSection>
    </ActionsContainer>
  );
};

export default ActionsSection;
