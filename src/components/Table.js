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
          <tbody>
            {expenses.map((ele) => (
              <tr key={ ele.id }>
                <td>{ele.description}</td>
                <td>{ele.tag}</td>
                <td>{ele.method}</td>
                <td>{ele.value}</td>
                <td>{ele.exchangeRates[ele.currency].name}</td>
                {Number(ele.exchangeRates[ele.currency].ask).toFixed(2)}
                <td>
                  {(Number(ele.exchangeRates[ele.currency]
                    .ask) * ele.value).toFixed(2)}

                </td>
                <td>BRL</td>
                <td><button type="button">X</button></td>
              </tr>
            ))}
          </tbody>
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
