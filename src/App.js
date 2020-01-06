import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shops/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils'; // get user state
import { setCurrentUser } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // console.log('my props', this.props);
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // check when userRef changes and setState of local currentUser
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
        // console.log('await userref', userRef);
      }
      // set currentUser to null
      setCurrentUser(userAuth);
    });
    console.log('after onAuthStateChanged');
    // const firestore = firebase.firestore();

    // const test = firestore
    // .collection('users')
    // .doc('LZtYdFQVSOLwsF0oHgoY')
    // .collection('cartItems')
    // .doc('NBP2FHZmuc4bldil9eIh')
    // const test = firestore
    //   .doc('/users/LZtYdFQVSOLwsF0oHgoY/cartItems/NBP2FHZmuc4bldil9eIh')
    //   .get()
    //   .then(x => {
    //     if (x.exists) {
    //       console.log('value', x.data());
    //     }
    //   });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    // In /signin, the render allows you to conditionally render components
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

/**
 * mapDispatchToProps gives the immediate component access to curated dispatch functions
 * You can then use props.setCurrentUser directly.
 * If you instead do not provide mapDispatchToProps, you'll need to run this.props.dispatch(setCurrentUser(user)),
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
