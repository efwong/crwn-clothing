import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from './../cart-icon/cart-icon.component';
import CartDropdown from './../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import './header.styles.scss';

const Header = ({ currentUser, cartStatus }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {!cartStatus ? <CartDropdown /> : null}
  </div>
);

/**  With Reselect and using vanilla redux to manage mapStateToProps */
// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
//   currentUser,
//   cartStatus: hidden
// });

/**  With Reselect and using selectors*/
// const mapStateToProps = (state) => ({
//   currentUser: selectCurrentUser(state),
//   cartStatus:  selectCartHidden(state)
// });

/** With Reselect and using createStructuredSelector to minimize redundant calls for state.
 *  createStructuredSelector auto passes top level state */
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartStatus: selectCartHidden
});

export default connect(mapStateToProps)(Header);
