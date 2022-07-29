import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addUser } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isEnterDisable: true,
    };
  }

  validadeBttn = () => {
    const { email, password } = this.state;
    const minChar = 5;
    if (password.length > minChar && email.includes('@') && email.includes('.com')) {
      this.setState({
        isEnterDisable: false,
      });
    } else {
      this.setState({
        isEnterDisable: true,
      });
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value },
      this.validadeBttn);
  }

  handleClick = () => {
    const { email } = this.state;
    const { addUserDispatch, history } = this.props;

    addUserDispatch(email);

    history.push('/carteira');
  }

  render() {
    const { email, password, isEnterDisable } = this.state;
    return (
      <div>
        <h1>Trybe Wallet</h1>
        <label htmlFor="email-input">
          Email:
          <input
            data-testid="email-input"
            id="email-input"
            name="email"
            onChange={ this.handleChange }
            placeholder="Digite seu email"
            value={ email }
            type="email"
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            data-testid="password-input"
            id="password-input"
            name="password"
            onChange={ this.handleChange }
            placeholder="Insira sua senha"
            value={ password }
            type="password"
          />
        </label>
        <button
          label="Entrar"
          onClick={ this.handleClick }
          type="button"
          disabled={ isEnterDisable }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUserDispatch: (email) => dispatch(addUser(email)),
});

Login.propTypes = {
  addUserDispatch: PropTypes.func,
  push: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
