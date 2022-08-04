import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  totalValue = () => {
    const { expenses } = this.props;
    const totalValue = expenses.reduce((acc, curr) => acc
     + parseFloat(curr.value) * parseFloat(curr.exchangeRates[curr.currency].ask), 0)
      .toFixed(2);
    return totalValue;
  }

  render() {
    const { expenses, email } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          Usuário:
          { email }
        </p>
        <p data-testid="total-field">
          { expenses.length === 0 ? '0.00' : this.totalValue() }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
