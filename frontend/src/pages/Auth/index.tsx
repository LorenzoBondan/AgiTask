import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import RegisterForm from "./Register";
import './styles.css';

function Auth(){
    return(
        <div className="auth-container">
            
            <div className='auth-form-container'>
                <Switch>
                    <Route path="/auth/login">
                        <Login />
                    </Route>

                    <Route path="/auth/signup">
                        <RegisterForm />
                    </Route>

                </Switch>
            </div>
        </div>
    );
}

export default Auth;