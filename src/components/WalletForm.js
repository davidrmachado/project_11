import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrencyList, addEntry } from '../redux/actions';
import getCurrencies from '../services/currencyAPI';

class WalletForm extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { dispatchCurrencies } = this.props;
    dispatchCurrencies();
  }

  getCurrencyObject = async () => {
    const currencyObject = await getCurrencies();
    this.setState({
      exchangeRates: currencyObject,
    });
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleClick = async (event) => {
    event.preventDefault();
    await this.getCurrencyObject();
    let { id } = this.state;
    const { dispatchEntry } = this.props;
    dispatchEntry(this.state);
    this.setState({
      id: id += 1,
      value: '',
      description: '',
    });
  }

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            id="value"
            name="value"
            onChange={ this.handleChange }
            placeholder="Despesa"
            type="number"
            value={ value }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            id="description"
            name="description"
            onChange={ this.handleChange }
            placeholder="Descrição"
            type="text"
            value={ description }
          />
        </label>
        <label htmlFor="currency">
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
            onChange={ this.handleChange }
          >
            {currencies.map((currency) => (
              <option key={ currency }>
                { currency }
              </option>
            )) }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="method"
            name="method"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Adicione uma tag:
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          onClick={ this.handleClick }
          type="button"
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf,
  dispatchCurrencies: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: () => dispatch(getCurrencyList()),
  dispatchEntry: (entry) => dispatch(addEntry(entry)),
}
);

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
