import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <caption>Tabela de gastos:</caption>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
          {expenses.map((ele, index) => (
            <tr key={ index }>
              <td>{ele.description}</td>
              <td>{ele.tag}</td>
              <td>{ele.method}</td>
              <td>{ele.value}</td>
              <td>{ele.currency}</td>
              {Number(ele.exchangeRates[ele.currency].ask).toFixed(2)}
              <td>
                {(Number(ele.exchangeRates[ele.currency]
                  .ask) * ele.value).toFixed(2)}

              </td>
              <td>BRL</td>
              <td><button type="button">X</button></td>
            </tr>
          ))}

        </table>

      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,

};

export default connect(mapStateToProps)(Table);
