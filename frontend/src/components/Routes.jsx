import React from 'react';
import { Route, Switch } from "react-router-dom";
import RiderView from './views/RiderView/RiderView';
import LoginPage from './views/Login/LoginPage';

const Routes = () => {
    return(
        <div>
            <Switch>
                <Route exact path="/" component= { LoginPage } />
                <Route path="/rider" component= { RiderView } />
            </Switch>            
        </div>
    );    
}
export default Routes;