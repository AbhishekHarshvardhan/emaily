import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href='http://localhost:5000/auth/google'>Login With Google</a>
          </li>
        );

      default:
        return [
          <li key='1'>
            <Payments />
          </li>,
          <li key='3' style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key='2'>
            <a href='http://localhost:5000/api/logout'>Log Out</a>
          </li>
        ];
    }
  }

  render() {
    console.log(this.props);
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link to={this.props.auth ? '/surveys' : '/'} className='left brand-logo'>
            Maily
          </Link>
          <ul className='right'>{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

const mapStatetoProps = ({ auth }) => ({ auth });

export default connect(mapStatetoProps)(Header);
