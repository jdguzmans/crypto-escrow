import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyDivision from '../../components/emptyDivision';
import Search from './search';

import Button from '../../components/button';

import {
  MainContainer, HeaderContainer,
} from './styles';

const HomeView = () => {
  const navigate = useNavigate();

  const [contractAddress, setContractAddress] = useState<string | null>(null);

  const onExecute = () => {
    navigate(`/escrows/${contractAddress}`);
  };

  return (
    <MainContainer>
      <HeaderContainer>
        <EmptyDivision />
        Escrows
        <Button
          type="button"
          onClick={() => navigate('/new-escrow')}
        >
          <i
            className="fa fa-plus"
            style={{
              color: 'black',
            }}
          />
        </Button>
      </HeaderContainer>
      <Search
        contractAddress={contractAddress}
        setContractAddress={setContractAddress}
        onExecute={onExecute}
      />
    </MainContainer>
  );
};

export default HomeView;
