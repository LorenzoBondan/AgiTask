
import Footer from "Components/Footer";
import Navbar from "Components/Navbar";
import TopNavbar from "Components/TopNavbar";
import Admin from "pages/Admin";
import Auth from "pages/Auth";
import CreateGroup from "pages/CreateGroup";
import CreateTask from "pages/CreateTask";
import Home from "pages/Home";
import Profile from "pages/Profile";
import TaskDetails from "pages/TaskDetails";
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
                        <Redirect from='/' to='/tasks' exact />
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
                        <>
                        <div className="flex-direction-column margin-left-85">
                            <TopNavbar/>
                            <Switch>
                                <Route path="/tasks" exact>
                                    <Tasks/>
                                </Route>

                                <Route path="/tasks/:taskId" exact>
                                    <TaskDetails/>
                                </Route>

                                <Route path="/create" exact>
                                    <CreateTask/>
                                </Route>

                                <Route path="/profile" exact>
                                    <Profile/>
                                </Route>

                                <Route path="/createGroup" exact>
                                    <CreateGroup/>
                                </Route>
                            </Switch>
                        </div>
                        </>
                    )}

                </Switch>
                
            </div>
            <Footer/>
        </Router>
    );
}

export default Routes;