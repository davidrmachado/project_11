import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeEntry } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, removalDispatch } = this.props;
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
          && expenses.map((element) => (
            <tr key={ element.id }>
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
              <td>
                <button
                  data-testid="delete-btn"
                  id={ element.id }
                  onClick={ () => removalDispatch(element.id) }
                  type="button"
                >
                  Excluir
                </button>
              </td>
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

const mapDispatchToProps = (dispatch) => ({
  removalDispatch: (expense) => dispatch(removeEntry(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
