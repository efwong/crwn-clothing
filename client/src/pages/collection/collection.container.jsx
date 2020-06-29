import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { selectIsCollectionsLoaded } from './../../redux/shop/shop.selectors';
import WithSpinner from './../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

/**
 * Different here: Pass function with state as input instead of using selectIsCollectionsLoaded directly
 */
const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionsLoaded(state)
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;
