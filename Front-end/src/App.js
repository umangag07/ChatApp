import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Join from './Components/Join/Join'
import Chat from './Components/Chat/Chat'
import Error from './Components/Error/Error'

function App() {
    return (
        <>
            <Router>
                <Switch>
                <Route exact path="/" component={Join}/>
                <Route exact path="/chat" component={Chat}/>
                <Route path="" component={Error}/>
                </Switch>
            </Router>
        </>
    )
}

export default App
