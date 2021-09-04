import React from 'react' 
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Reset_password from './pages/Reset_password'
import Forgot_password from './pages/Forgot_password'
import Create_payment from './pages/Create_payment' 

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                
                <Route path="/" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/reset_password" exact component={Reset_password} />
                <Route path="/forgot_password" exact component={Forgot_password} />
                <Route path="/create_payment" exact component={Create_payment} />
                <Route path="/profile" exact component={Profile} />
                
               
            </Switch>
        </BrowserRouter>
    )
}