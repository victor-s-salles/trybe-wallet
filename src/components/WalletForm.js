import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchCurrencyn } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchCurrencyn());
  }

  render() {
    const { currencies } = this.props;

    return (
      <div>
        <form action="">
          <label htmlFor="expenses">
            Valor da despesa:
            <input
              id="expenses"
              name="expenses"
              type="text"
              data-testid="value-input"
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              name="description"
              type="text"
              data-testid="description-input"
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
            >
              {currencies.map((item) => (
                <option value={ item } key={ item }>{item}</option>))}
            </select>
          </label>

          <label htmlFor="method">
            Método:
            <select
              name="method"
              id="method"
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tipo:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>

            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
