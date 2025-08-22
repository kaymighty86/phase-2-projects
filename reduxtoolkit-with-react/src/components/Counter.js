import { Component } from 'react';
import classes from './Counter.module.css';
import { useSelector, useDispatch, connect } from 'react-redux';
import { counterActions } from '../store/reduxStore';

const Counter = () => {
  // const count = useSelector(state => state.count);
  // const counterActive = useSelector(state => state.counterActive);
  const count = 0;
  const counterActive = true;
  const dispatch = useDispatch();
  
  function increment(){
    dispatch(counterActions.increment());
  }

  function increase(){
    dispatch(counterActions.increase(5));
  }

  function decrement(){
    dispatch(counterActions.decrement());
  }

  function toggleCounterHandler(){
    dispatch(counterActions.toggleCounter(!counterActive));
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={`${classes.value} ${!counterActive? classes.invisible : ""}`}>{count}</div>
      <div>
        <button onClick={increment}>Increment</button>
        <button onClick={increase}>Increase by 5</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={toggleCounterHandler}>Toggle Counter</button>
      </div>
    </main>
  );
};

export default Counter;

//----------------------------------------------------
//TESTING WORKING WITH REDUX AND CLASS-BASED COMPONENTS
// class Counter extends Component{
//   increment(){
//     this.props.dispatch({type: "increment"});
//   }

//   increase(){
//     this.props.dispatch({type: "increase", value: 5});
//   }

//   decrement(){
//     this.props.dispatch({type: "decrement"});
//   }

//   toggleCounterHandler(){
//     this.props.dispatch({type: "toggleCounter", value: !this.props.counterActive})
//   }

//   render() {
//     return (
//     <main className={classes.counter}>
//       <h1>Redux Counter</h1>
//       <div className={`${classes.value} ${!this.props.counterActive? classes.invisible : ""}`}>{this.props.count}</div>
//       <div>
//         <button onClick={this.increment.bind(this)}>Increment</button>
//         <button onClick={this.increase.bind(this)}>Increase by 5</button>
//         <button onClick={this.decrement.bind(this)}>Decrement</button>
//         <button onClick={this.toggleCounterHandler.bind(this)}>Toggle Counter</button>
//       </div>
//     </main>
//     );
//   }
// }

// function mapState2Props(state){
//   return {
//     count: state.count,
//     counterActive: state.counterActive
//   }
// }

// function mapDispatch2Props(dispatch){
//   return {
//     dispatch
//   }
// }

// export default connect(mapState2Props, mapDispatch2Props)(Counter);