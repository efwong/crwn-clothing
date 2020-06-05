import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CollectionPageContainer from '../collection/collection.container';
import { fetchCollectionsStartAsync } from './../../redux/shop/shop.actions';
import CollectionsOverviewContainer from './../../components/collections-overview/collections-overview.container';

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  // componentDidMount() {
  // const { updateCollections } = this.props;
  // const collectionRef = firestore.collection('collections');
  // // when collectionRef updates or when this code is ran, firestore will send collection snapshot containing data
  // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
  //   async (snapshot) => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     updateCollections(collectionsMap);
  //     this.setState({ loading: false }, () => {
  //       console.log('state', this.state);
  //     });
  //   }
  // );
  // }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);
