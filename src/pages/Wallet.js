import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import '../CSS/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="WalletPrincialDiv">

        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
