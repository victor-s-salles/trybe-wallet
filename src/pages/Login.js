import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { login } from '../redux/actions';
import '../CSS/Login.css';
import logoLogin from '../imgs/logoTrybeWallet.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisable: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }), this.validadeGeneral);
  };

  validadeGeneral = () => {
    const { password, email } = this.state;
    const minPassword = 6;
    const regex = /\S+@\S+\.\S+/;

    if (password.length >= minPassword && regex.test(email)) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  };

  loginBTN = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(login(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisable } = this.state;
    return (
      <div className="Login-PrincipalDiv">
        <div className="Login-Second-Div">
          <img src={ logoLogin } alt="Logo TrybeWallet" />
          <div className="Login-InputDiv">
            <label htmlFor="email">
              {/* Email: */}
              <input
                data-testid="email-input"
                id="email"
                name="email"
                type="text"
                value={ email }
                onChange={ this.handleChange }
                placeholder="Email"
              />
            </label>
            <label htmlFor="password">
              {/* Senha: */}
              <input
                data-testid="password-input"
                id="password"
                name="password"
                type="text"
                value={ password }
                onChange={ this.handleChange }
                placeholder="Senha"
              />
            </label>

            <button
              type="button"
              disabled={ isDisable }
              onClick={ this.loginBTN }
            >
              Entrar

            </button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null)(Login);
