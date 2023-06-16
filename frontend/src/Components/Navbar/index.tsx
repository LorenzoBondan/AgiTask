import { NavLink } from 'react-router-dom';
import { getTokenData, hasAnyRoles, isAuthenticated } from 'util/auth';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'AuthContext';
import { removeAuthData } from 'util/storage';
import history from 'util/history';

import logo from 'assets/images/AT-logo-with-title.png'
import taskIcon from 'assets/images/task.png';
import plusIcon from 'assets/images/plus.png';
import profileIcon from 'assets/images/profile.png';
import adminIcon from 'assets/images/admin.png';
import logoutIcon from 'assets/images/logout.png';
import loginIcon from 'assets/images/login.png';
import homeIcon from 'assets/images/home.png';
import notificationIcon from 'assets/images/notification.png';

import './styles.css';

const Navbar = () => {

    const { authContextData, setAuthContextData } = useContext(AuthContext);

    useEffect(() => {
        if(isAuthenticated()){
          setAuthContextData({
            authenticated: true,
            tokenData: getTokenData()
          })
        }
        else{
          setAuthContextData({
            authenticated: false,
          })
        }
      }, [setAuthContextData]);

      const handleLogoutClick = (event : React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); 
        
        removeAuthData(); 
    
        setAuthContextData({
          authenticated: false,
        })
    
        history.replace('/'); 
    }

    const [isExpanded, setExpendState] = useState(false);

    return(
        <nav className= {isExpanded ? 'admin-nav-container' : 'admin-nav-container-expanded'}>
            <div className={isExpanded ? 'navbar-title' : 'navbar-title-expanded'} >
                <img src={logo} alt="logo" />
            </div>

            <div className='hambuger-container'>
                <button	className="hamburger" onClick={() => setExpendState(!isExpanded)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <ul className='ul-container'>
                {isAuthenticated() ? (
                <>
                <li>
                    <NavLink to="/tasks" className={isExpanded ? "admin-nav-item" : "admin-nav-item-expanded"} >
                        <img src={taskIcon} alt="" />
                        { isExpanded && <p>Tasks</p>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/create" className={isExpanded ? "admin-nav-item" : "admin-nav-item-expanded"}>
                        <img src={plusIcon} alt="" />
                        {isExpanded && <p>New Task</p>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile" className={isExpanded ? "admin-nav-item" : "admin-nav-item-expanded"}>
                        <img src={profileIcon} alt="" />
                        {isExpanded && <p>Profile</p>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/notifications" className={isExpanded ? "admin-nav-item" : "admin-nav-item-expanded"}>
                        <img src={notificationIcon} alt="" />
                        {isExpanded && <p>Notifications</p>}
                    </NavLink>
                </li>

                { hasAnyRoles(['ROLE_ADMIN']) && ( 
                    <li>
                        <NavLink to="/admin" className={isExpanded ? "admin-nav-item" : "admin-nav-item-expanded"}>
                            <img src={adminIcon} alt="" />
                            {isExpanded && <p>Admin</p>}
                        </NavLink>
                    </li>   
                )}
                </>
                ) : (
                    <li>
                        <NavLink to="/home" exact className={isExpanded ? "admin-nav-item" : "admin-nav-item-expanded"}>
                            <img src={homeIcon} alt="" />
                            {isExpanded && <p>Home</p>}
                        </NavLink>
                    </li>   
                
                )}

                { authContextData.authenticated ? (
                    <li>
                        <NavLink to="/" className={isExpanded ? "login-nav-item" : "login-nav-item-expanded"} onClick={handleLogoutClick}>
                            <img src={logoutIcon} alt="" />
                                {isExpanded && <p>Logout</p>}
                        </NavLink>
                    </li>
                    ) : (
                        <li>
                            <NavLink to="/auth/login" className={isExpanded ? "login-nav-item" : "login-nav-item-expanded"}>
                                <img src={loginIcon} alt="" />
                                {isExpanded && <p>Login</p>}
                            </NavLink>
                        </li>
                    )
                }
            </ul>
        </nav>
    );
}

export default Navbar;