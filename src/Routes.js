import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './components/signup/signup'
import Signin from './components/signin/signin'
import Dashboard from "./components/dashboard/dashboard";

const Routes = () => {
    return(
        <BrowserRouter>
                <Switch>
                    <Route path='/'      exact component={Signup} />
                    <Route path='/login'       exact component={Signin} />
                    <Route path='/dashboard'   exact component={Dashboard} />
                </Switch>
        </BrowserRouter>
    )
}

export default Routes