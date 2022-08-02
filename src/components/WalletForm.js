import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrency } from '../redux/actions';

class WalletForm extends React.Component {
  componentDidMount() {
    const { dispatchCurrencies } = this.props;
    dispatchCurrencies();
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input data-testid="value-input" id="valor" type="number" />
        </label>
        <label htmlFor="description">
          Descrição:
          <input data-testid="description-input" id="description" type="text" />
        </label>
        <label htmlFor="currency">
          <select data-testid="currency-input" id="currency">
            {currencies.map((currency) => (
              <option key={ currency }>
                { currency }
              </option>
            )) }
          </select>
        </label>
        <label htmlFor="metodo">
          Método de pagamento:
          <select data-testid="method-input" id="metodo">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Adicione uma tag:
          <select data-testid="tag-input" id="tag">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf,
  dispatchCurrencies: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: () => dispatch(getCurrency()),
}
);

const mapStateToProps = (state) => ({ currencies: state.wallet.currencies });

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
