import React, { Component } from 'react'
// import { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from '../../components/Counter'
import * as CounterActions from '../../actions'

const mapStateToProps = (state) => ({
  counter: state.counter
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(CounterActions, dispatch)
}


import { BlockMath, InlineMath } from 'react-katex';

console.log("heey");

@connect(
  mapStateToProps,
  { ...CounterActions }
)
export default
class Hi extends Component {

  render () {
    console.log("what......");
      return (
        <div>
          This is an in-line expression <InlineMath math={String.raw`\frac{1-\left(\frac{1}{2}\right)^n}{2}`} />{' '}
          passed as <code>math prop</code>. This is an in-line{' '}
          <InlineMath math={'\\int_0^\\infty x^2 dx'} /> expression passed as{' '}
          <code>children prop</code>.
      </div>
      )
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Counter)
