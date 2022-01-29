import React from 'react';
import SearchBar from './searchBar';

import {
  SearchContainer, SearchTitleContainer, SearchBarContainer,
} from './styles';

type SearchProps = {
    contractAddress: string | null
    setContractAddress: (searchIdentifier: string | null) => void
    onExecute: () => void
  }
const Search = ({ contractAddress, setContractAddress, onExecute }: SearchProps) => {
  return (
    <SearchContainer>
      <SearchTitleContainer>
        Search
      </SearchTitleContainer>
      <SearchBarContainer>
        <SearchBar
          value={contractAddress}
          setValue={setContractAddress}
          onExecute={onExecute}
        />
      </SearchBarContainer>
    </SearchContainer>
  );
};

export default Search;
