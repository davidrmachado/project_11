import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
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
        </thead>
        <tbody>
          {expenses.length > 0
          && expenses.map((element, index) => (
            <tr key={ index }>
              <td>{ element.description }</td>
              <td>{ element.tag }</td>
              <td>{ element.method }</td>
              <td>{ parseFloat(element.value).toFixed(2) }</td>
              <td>{ element.exchangeRates[element.currency].name }</td>
              <td>
                {
                  parseFloat(element.exchangeRates[element.currency].ask).toFixed(2)
                }
              </td>
              <td>
                { (parseFloat(element.value) * parseFloat(element
                  .exchangeRates[element.currency].ask)).toFixed(2) }
              </td>
              <td>Real</td>
              <td>Editar/Excluir</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({}),
}.isRequired;

const mapStateToProps = (payload) => ({
  expenses: payload.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
