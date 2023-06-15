
import Navbar from "Components/Navbar";
import Admin from "pages/Admin";
import Auth from "pages/Auth";
import EditProfile from "pages/EditProfile";
import Feed from "pages/Feed";
import Followers from "pages/Followers";
import Following from "pages/Following";
import Home from "pages/Home";
import NewPost from "pages/NewPost";
import Profile from "pages/Profile";
import UserDetails from "pages/UserDetails";
import Users from "pages/Users";
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

                    <Route path="/feed" exact>
                        <Feed/>
                    </Route>

                    <Route path="/create" exact>
                        <NewPost/>
                    </Route>

                    <Route path="/profile" exact>
                        <Profile/>
                    </Route>

                    <Route path="/editProfile" exact>
                        <EditProfile/>
                    </Route>

                    <Route path="/users" exact>
                        <Users/>
                    </Route>

                    <Route path="/user/:userId" exact>
                        <UserDetails/>
                    </Route>

                    <Route path="/user/:userId/followers">
                        <Followers/>
                    </Route>

                    <Route path="/user/:userId/following">
                        <Following/>
                    </Route>

                    <Redirect from='/auth' to='/auth/login' exact />
                    <Route path="/auth">
                        <Auth/>
                    </Route>

                    <Redirect from="/admin" to="/admin/users" exact />
                    <Route path="/admin">
                        <Admin/>
                    </Route>


                </Switch>
            </div>
            
        </Router>
    );
}

export default Routes;