import React from 'react'
import PropTypes from 'prop-types'
import Counter from '../../components/Counter'
import { BlockMath, InlineMath } from 'react-katex';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CounterActions from '../../actions'

import { Button } from 'react-bootstrap'

const mapStateToProps = (state) => ({
  counter: state.counter
})
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(CounterActions, dispatch)
}

@connect(
  mapStateToProps,
  { ...CounterActions }
)
class Home extends React.Component {
  render () {
    return (
      <div>
        <Button>Hi</Button>
        This is an in-line expression <InlineMath math={String.raw`\frac{1-\left(\frac{1}{2}\right)^n}{2}`} />{' '}
        passed as <code>math prop</code>. This is an in-line{' '}
        <InlineMath math={'\\int_0^\\infty x^2 dx'} /> expression passed as{' '}
        <code>children prop</code>.
      </div>
    )
  }
}

export default Home;

// export default connect(mapStateToProps, mapDispatchToProps)(Counter)
