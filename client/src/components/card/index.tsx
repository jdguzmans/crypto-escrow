/* eslint-disable react/require-default-props */
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import BackToHome from '../backToHome';

type CardProps = {
    title: string
    bodySection: ReactNode
    actionsSection?: ReactNode
}
const Card = (props: CardProps) => {
  return (
    <MainContainer>
      <BackToHome />
      <CardContainer>
        <CardTitle>{props.title}</CardTitle>
        {props.bodySection}
        {props.actionsSection !== undefined
      && (
      <ActionsContainer>
        {props.actionsSection}
      </ActionsContainer>
      )}
      </CardContainer>
    </MainContainer>
  );
};

const ActionsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
`;

const CardContainer = styled.div`
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.02);
`;

const CardTitle = styled.div`
    font-size: 25px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
`;

const MainContainer = styled.div`
    margin: auto;
    width: 800px;
    max-width: 70%;
    padding: 20px;
`;

export default Card;
