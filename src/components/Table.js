import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenses, editModeON } from '../redux/actions';
import '../CSS/Table.css';

class Table extends Component {
  remeveBTN = (id) => {
    const { dispatch } = this.props;
    dispatch(removeExpenses(id));
  };

  editBTN = (id) => {
    const { dispatch } = this.props;
    dispatch(editModeON(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="TableRetangleDiv">
        <div className="TablePrincipalDiv">
          <div className="TableSecondDiv">
            <table>
              {/* <caption>Tabela de gastos:</caption> */}
              <tr className="TableTitles">
                <th>Descrição</th>
                <th>Tag</th>
                <th>Método de pagamento</th>
                <th>Valor</th>
                <th>Moeda</th>
                <th>Câmbio utilizado</th>
                <th>Valor convertido</th>
                <th>Moeda de conversão</th>
                <th>Editar/Excluir</th>
              </tr>
              <tbody className="TableTdbody">
                {expenses.map((ele) => (
                  <tr key={ ele.id } className="TableItens">
                    <td>{ele.description}</td>
                    <td>{ele.tag}</td>
                    <td>{ele.method}</td>
                    <td>{Number(ele.value).toFixed(2)}</td>
                    <td>{ele.exchangeRates[ele.currency].name}</td>
                    <td>{Number(ele.exchangeRates[ele.currency].ask).toFixed(2)}</td>
                    <td>
                      {(Number(ele.exchangeRates[ele.currency]
                        .ask) * ele.value).toFixed(2)}

                    </td>
                    <td>BRL</td>
                    <td>
                      <button
                        type="button"
                        onClick={ () => { this.editBTN(ele.id); } }
                        data-testid="edit-btn"
                      >
                        Editar

                      </button>
                      <button
                        type="button"
                        onClick={ () => { this.remeveBTN(ele.id); } }
                        data-testid="delete-btn"
                      >
                        X
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,

};

export default connect(mapStateToProps)(Table);
