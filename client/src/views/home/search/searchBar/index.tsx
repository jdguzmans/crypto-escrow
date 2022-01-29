import React from 'react';
import { Container, StyledButton, StyledInput } from './styles';

type SearchBarProps = {
  value: string | null
  setValue: (searchIdentifier: string | null) => void
  onExecute: () => void
}
const SearchBar = ({ value, setValue, onExecute }: SearchBarProps) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onClear = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setValue(null);
  };

  const onExecuteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onExecute();
  };

  const stringValue = value || '';

  return (
    <Container>
      <StyledInput
        type="search"
        placeholder="Escrow index"
        value={stringValue}
        onChange={onChange}
      />
      { stringValue !== '' && (
        <>
          <StyledButton
            type="button"
            onClick={onExecuteClick}
          >
            <i
              className="fa fa-search"
              style={{
                color: 'black',
              }}
            />
          </StyledButton>
          <StyledButton
            type="button"
            onClick={onClear}
          >
            <i
              className="fa fa-times"
            />
          </StyledButton>
        </>
      ) }
    </Container>
  );
};

export default SearchBar;
