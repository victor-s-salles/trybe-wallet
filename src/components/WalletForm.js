import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchCurrencyn, saveExpenses,
  modifyExpenses, editModeOFF } from '../redux/actions';
import getCurrencyList from '../services/currencyAPI';
import '../CSS/WalletForm.css';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchCurrencyn());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      () => ({
        [name]: value,
      }),
      this.validadeGeneral,
    );
  };

  saveExpensesBtn = async () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag, id } = this.state;

    const exchangeRates = await getCurrencyList();

    const objExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatch(saveExpenses(objExpense));
    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    }));
  };

  editExpensesBtn = () => {
    const { dispatch, idToEdit, expenses } = this.props;
    // const mapId = expenses.map((ele) => (ele.id));
    // const index = mapId.indexOf(idToEdit);
    const expense = expenses.find((ele) => (ele.id === idToEdit));

    const { value, description, currency, method, tag } = this.state;
    const objExpense = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: expense.exchangeRates,
    };
    dispatch(modifyExpenses(objExpense));
    dispatch(editModeOFF());
    this.setState(() => ({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      description: '',
    }));
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <div className="WalletFormPrincipalDiv">
        <div className="WalletFormSecondDiv">
          <form action="">
            <div className="WalletFormLine">
              <label htmlFor="description" className="WalletFormDescription">
                Descrição da despesa:
                <input
                  id="description"
                  name="description"
                  type="text"
                  data-testid="description-input"
                  onChange={ this.handleChange }
                  value={ description }
                />
              </label>
              <label htmlFor="tag" className="WalletFormCategory">
                Categoria da despesa:
                <select
                  name="tag"
                  id="tag"
                  data-testid="tag-input"
                  onChange={ this.handleChange }
                  value={ tag }
                >
                  <option value="Alimentação">Alimentação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Saúde">Saúde</option>
                </select>
              </label>
            </div>
            <div className="WalletFormLine">
              <label htmlFor="value" className="WalletFormValue">
                Valor:
                <input
                  id="value"
                  name="value"
                  type="number"
                  data-testid="value-input"
                  onChange={ this.handleChange }
                  value={ value }
                />
              </label>
              <label htmlFor="method" className="WalletFormPayment">
                Método de pagamento:
                <select
                  name="method"
                  id="method"
                  data-testid="method-input"
                  onChange={ this.handleChange }
                  value={ method }
                >
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                </select>
              </label>
              <label htmlFor="currency" className="WalletFormCurrency">
                Moeda:
                <select
                  name="currency"
                  id="currency"
                  data-testid="currency-input"
                  onChange={ this.handleChange }
                  value={ currency }
                >
                  {currencies.map((item) => (
                    <option value={ item } key={ item }>
                      {item}
                    </option>
                  ))}
                </select>

              </label>
            </div>
            <div className="WalletFormButtonsDiv">
              {!editor && (
                <button type="button" onClick={ this.saveExpensesBtn }>
                  Adicionar despesa
                </button>
              )}
              {editor && (
                <button type="button" onClick={ this.editExpensesBtn }>
                  Editar despesa
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  editor: globalState.wallet.editor,
  idToEdit: globalState.wallet.idToEdit,
  expenses: globalState.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
