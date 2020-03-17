import React from 'react';
import { Route, Switch } from "react-router-dom";
import CustomerView from './views/CustomerView/CustomerView';
import StaffView from './views/StaffView/StaffView';
import RiderView from './views/RiderView/RiderView';
import LoginPage from './views/Login/LoginPage';

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route path="/customer" component={CustomerView} />
                <Route path="/staff" component={StaffView} />
                <Route path="/rider" component={RiderView} />
            </Switch>
        </div>
    );
}
export default Routes;