import React from 'react';
import { TestIncrement, TestDecrement } from './redux/test.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTestValue } from './redux/test.selectors';

const TestPage = (props) => {
  const { increment, decrement, value } = props;
  return (
    <div>
      <h3>TestPage</h3>
      <div className='Card'>
        <div>{value}</div>
        <button onClick={increment}>Add 1</button>
        <button onClick={decrement}>Minus 1</button>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  value: selectTestValue
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(TestIncrement()),
  decrement: () => dispatch(TestDecrement())
});

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
