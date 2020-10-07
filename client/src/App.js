import React, { useEffect, lazy, Suspense } from 'react';
import { GlobalStyle } from './global.styles';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/header/header.component';
import { connect } from 'react-redux';
import { checkUserSession } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import Spinner from './components/spinner/spinner.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const TestPage = lazy(() => import('./pages/test/test-page.component'));
const SignInandSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')
);
// main app
const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  // use switch: as long as one route is rendered, it won't render the rest
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/test' component={TestPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              currentUser ? <Redirect to='/' /> : <SignInandSignUpPage />
            }
          />
        </Suspense>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
