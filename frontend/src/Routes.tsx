
import Footer from "Components/Footer";
import Navbar from "Components/Navbar";
import Admin from "pages/Admin";
import Auth from "pages/Auth";
import Home from "pages/Home";
import Tasks from "pages/Tasks";

import { Redirect, Route, Router, Switch } from "react-router-dom";
import { isAuthenticated } from "util/auth";
import history from "util/history";

const Routes = () => {

    return(
        <Router history={history}> 
            <div className="flex-direction-row">
                <Navbar/>

                <Switch>
                    {isAuthenticated() ? (
                        <Redirect from='/' to='/feed' exact />
                    ) : (
                        <Redirect from='/' to='/home' exact />
                    )}
                    
                    <Route path="/home" exact>
                        <Home/>
                    </Route>

                    <Redirect from='/auth' to='/auth/login' exact />
                    <Route path="/auth">
                        <Auth/>
                    </Route>

                    <Redirect from="/admin" to="/admin/users" exact />
                    <Route path="/admin">
                        <Admin/>
                    </Route>

                    {isAuthenticated() && (
                        <Route path="/tasks" exact>
                            <Tasks/>
                        </Route>
                    )}

                </Switch>
                
            </div>
            <Footer/>
        </Router>
    );
}

export default Routes;