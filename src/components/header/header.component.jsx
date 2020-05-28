import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from './../cart-icon/cart-icon.component';
import CartDropdown from './../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

// import './header.styles.scss';
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './header.styles';

const Header = ({ currentUser, cartStatus }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>SHOP</OptionLink>
      <OptionLink to='/shop'>CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink as='div' onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to='/signin'>SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {!cartStatus ? <CartDropdown /> : null}
  </HeaderContainer>
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
