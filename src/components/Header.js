import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../CSS/Header.css';
import logo from '../imgs/logoTrybeWallet.png';
import moneyVector from '../imgs/MoneyVector.png';
import userVector from '../imgs/UserVector.png';

class Header extends Component {
  calculateTotal = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, ele) => {
      const coin = ele.currency;
      const { ask } = ele.exchangeRates[coin];
      const { value } = ele;
      const sum = acc + (Number(value) * Number(ask));
      return sum;
    }, 0);

    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div className="HeaderPrincipalDiv">
        <div className="HeaderSecondlDiv">
          <div>
            <img src={ logo } alt="Logo Trybe Wallet" />
          </div>
          <div className="HeaderDivInfos">

            <img src={ moneyVector } alt="Icone Dinheiro" />
            <h3 className="HeaderTitleTotal"> Total de despesas:</h3>
            <h3 data-testid="total-field" className="HeaderH3Total">

              {' '}
              {this.calculateTotal()}
              {' '}
              BRL
            </h3>
            {/* <h3 data-testid="header-currency-field">BRL</h3> */}
          </div>
          <div className="HeaderDivInfos">
            <img src={ userVector } alt="Icone User" />
            <h3
              className="HeaderH3Email"
              data-testid="email-field"
            >
              {email}
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,

};

export default connect(mapStateToProps)(Header);
