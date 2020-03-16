import React from 'react';
import { Route, Switch } from "react-router-dom";
import RiderView from './views/RiderView/RiderView';
import Login from './views/Login/Login';

const Routes = () => {
    return(
        <div>
            <Switch>
                <Route exact path="/" component= { Login } />
                <Route path="/rider" component= { RiderView } />
            </Switch>            
        </div>
    );    
}
export default Routes;