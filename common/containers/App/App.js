import React, { Component } from 'react'
// import { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from '../../components/Counter'
import * as CounterActions from '../../actions'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

import Hi from '../Hi/Hi'
import Home from '../Home/Home'
import Header from '../Header/Header'
import { routes } from '../../routes'

console.log("WHattttt, for server side???");

// import './App.css'

const RedirectWithStatus = ({ from, to, status }) => (
  <Route render={({ staticContext }) => {
    // there is no `staticContext` on the client, so
    // we need to guard against that here
    if (staticContext)
      staticContext.status = status
    return <Redirect from={from} to={to}/>
  }}/>
)



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
export default
class App extends Component {

  render () {
    console.log("whaattttt");
    // const styles = require('./App.css');
    console.log(styles);
      return (
        <div className={styles.app}>
          <div>
            <Header />
            <main>
              <Switch>
                {routes.map(route => (
                  <Route {...route}/>
                ))}

                {
                  // <Route exact path="/" component={Home} />
                  // {
                  //   <Route path='/hi' component={Hi}/>
                  // }
                  // <Route component={NotFound}/>
                }

              </Switch>
              {/* some other routes */}
              {

              }

              {
              //   <RedirectWithStatus
              //   status={302}
              //   from="/hi"
              //   to="/haha"
              // />
              }
            </main>
          </div>

      </div>
      )
  }
}


// export default connect(mapStateToProps, mapDispatchToProps)(Counter)
// const App = () => (
//   <h1>Title</h1>
// )
//
// export default App;
