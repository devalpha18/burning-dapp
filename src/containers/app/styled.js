import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  min-height: 100vh;
  padding: 50px 0px;
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
`;

export const DepositForm = styled.div`
  display: flex;
  flex-direction: row;
  grid-gap: 20px;
  justify-content: flex-start;
  align-items: center;
`;
