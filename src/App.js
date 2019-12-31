import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shops/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils'; // get user state

import firebase from 'firebase/app';
import 'firebase/firestore';

const HatsPage = () => (
  <div>
    <h1> Hats </h1>
  </div>
);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // check when userRef changes and setState of local currentUser
        userRef.onSnapshot(snapShot => {
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            },
            () => {
              console.log('change', this.state);
            }
          );
        });
        console.log('await userref', userRef);
        // createUserProfileDocument(userAuth).then(x => {
        //   console.log('sss', x);
        // });
      }
      // set currentUser to null
      this.setState({ currentUser: userAuth });
      // createUserProfileDocument(user);
      // this.setState({ currentUser: user });
      console.log('after createUserProfileDocument');
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
