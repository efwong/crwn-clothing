import React from 'react';
import './collection.styles.scss';
import { selectCollection } from '../../redux/shop/shop.selectors';
import { connect } from 'react-redux';

const CollectionPage = ({ collection }) => {
  console.log('collection', collection);
  return (
    <div className='category'>
      <h2>CATEGORY PAGE</h2>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
