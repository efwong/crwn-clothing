import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CollectionsOverview from './../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { updateCollections } from './../../redux/shop/shop.actions';
import {
  firestore,
  convertCollectionsSnapshotToMap
} from './../../firebase/firebase.utils';

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');
    // when collectionRef updates or when this code is ran, firestore will send collection snapshot containing data
    collectionRef.onSnapshot(async (snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      console.log('collectionsMap', collectionsMap);
      updateCollections(collectionsMap);
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (item) => dispatch(updateCollections(item))
});

export default connect(null, mapDispatchToProps)(ShopPage);
