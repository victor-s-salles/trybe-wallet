import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <div>
          <h3 data-testid="total-field">0</h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </div>
        <h3
          data-testid="email-field"
        >
          {email}
        </h3>

      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,

};

export default connect(mapStateToProps)(Header);
