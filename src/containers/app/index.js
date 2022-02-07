import React, { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';

import GlobalStyles from '../../styles/global';
import { AppContainer, TopSection, ContentSection, DepositForm } from './styled';
import { StyledCard } from '../../components/card';
import { StyledButton } from '../../components/button';
import { StyledInputQty, StyledInputToken } from '../../components/input';

import isEmpty from '../../validation/is-empty';

const App = () => {
  const [depositTblData, setDepositTblData] = useState({ columns: [], rows: [] });
  const [burnedTblData, setBurnedTblData] = useState({ columns: [], rows: [] });
  const [walletAddress, setWalletAddress] = useState('');
  const connector = new WalletConnect({
    bridge: 'https://bridge.walletconnect.org', // Required
    qrcodeModal: QRCodeModal,
  });

  const handleConnect = () => {
    if (isEmpty(walletAddress)) {
      if (window.ethereum) {
        try {
          window.ethereum.enable();
        } catch (e) {}
      } else if (window.web3) {
      } else {
        alert('You have to install MetaMask !');
      }
    }
  };

  const handleAccountsChanged = accounts => {
    if (isEmpty(accounts)) {
      setWalletAddress('');
      localStorage.removeItem('wallet_address');
    } else {
      setWalletAddress(window.ethereum.selectedAddress);
      localStorage.setItem('wallet_address', window.ethereum.selectedAddress);
    }
  };

  useEffect(() => {
    setDepositTblData({
      columns: [
        { label: 'Token', field: 'token', sort: 'asc', width: 200 },
        { label: 'Qty', field: 'qty', sort: 'asc', width: 100 },
        { label: 'Burn?', field: 'burn', sort: 'asc', width: 150 },
      ],
      rows: [
        {
          token: 'Token 1',
          qty: 0.01,
          burn: <StyledButton size="small">burn</StyledButton>,
        },
      ],
    });
    setBurnedTblData({
      columns: [
        { label: 'Token', field: 'token', sort: 'asc', width: 200 },
        { label: 'Qty', field: 'qty', sort: 'asc', width: 100 },
        { label: 'When', field: 'when', sort: 'asc', width: 150 },
      ],
      rows: [
        {
          token: 'Token 1',
          qty: 0.01,
          when: 'yyyy',
        },
      ],
    });

    if (window.ethereum) window.ethereum.on('accountsChanged', handleAccountsChanged);

    setWalletAddress(localStorage.getItem('wallet_address'));

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <StyledCard>
          <TopSection>
            <h1>Burning dApp</h1>
            <StyledButton onClick={handleConnect}>{isEmpty(walletAddress) ? 'Connect Wallet' : 'Connected'}</StyledButton>
          </TopSection>
          <ContentSection>
            <h3>Enter which token to burn..</h3>
            <DepositForm>
              <h4>Contract:</h4>
              <StyledInputToken />
              <h4>Qty:</h4>
              <StyledInputQty />
              <StyledButton>Deposit</StyledButton>
            </DepositForm>
          </ContentSection>
          <ContentSection>
            <h3>My deposit</h3>
            <MDBDataTable noBottomColumns searching={false} displayEntries={false} responsive hover small data={depositTblData} />
          </ContentSection>
          <ContentSection>
            <h3>My burned</h3>
            <MDBDataTable noBottomColumns searching={false} displayEntries={false} responsive hover small data={burnedTblData} />
          </ContentSection>
        </StyledCard>
      </AppContainer>
    </>
  );
};

export default App;
