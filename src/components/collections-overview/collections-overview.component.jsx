import React from 'react';

import './collections-overview.styles.scss';
import CollectionPreview from './../collection-preview/collection-preview.component';
import { selectCollections } from './../../redux/shop/shop.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

const CollectionsOverview = ({ collections }) => {
  return (
    <div className='collections-overview'>
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollections
});
export default connect(mapStateToProps)(CollectionsOverview);
