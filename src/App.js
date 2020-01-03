import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shops/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils'; // get user state
import { setCurrentUser } from './redux/user/user.actions';

import firebase from 'firebase/app';
import 'firebase/firestore';

const HatsPage = () => (
  <div>
    <h1> Hats </h1>
  </div>
);

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    console.log('my props', this.props);
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
        console.log('await userref', userRef);
      }
      // set currentUser to null
      setCurrentUser(userAuth);
    });
    console.log('after onAuthStateChanged');
    const firestore = firebase.firestore();

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
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(App);
